import List "mo:core/List";
import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/playbooks";
import CommonTypes "../types/common";
import PlaybookLib "../lib/playbooks";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

mixin (
  store : List.List<Types.Playbook>,
  counter : CommonTypes.Counter
) {

  // Extract the "content" field value from an OpenAI API JSON response (naive text extraction)
  func extractContentFromResponse(json : Text) : Text {
    let marker = "\"content\":\"";
    let parts = json.split(#text marker);
    var found = false;
    var result = "Unknown";
    label outer for (part in parts) {
      if (found) {
        let chars = part.toArray();
        let buf = List.empty<Char>();
        var i = 0;
        var escaped = false;
        label inner while (i < chars.size()) {
          let c = chars[i];
          if (escaped) {
            if (c == 'n') { buf.add('\n') }
            else if (c == 't') { buf.add('\t') }
            else { buf.add(c) };
            escaped := false;
          } else if (c == '\\') {
            escaped := true;
          } else if (c == '\"') {
            break inner;
          } else {
            buf.add(c);
          };
          i += 1;
        };
        result := Text.fromArray(buf.toArray());
        break outer;
      };
      found := true;
    };
    // Trim whitespace from result
    result.trim(#predicate (func(c) { c == ' ' or c == '\n' or c == '\r' or c == '\t' }))
  };

  // Escape special characters for embedding in a JSON string
  func escapeJson(s : Text) : Text {
    var result = "";
    for (c in s.toIter()) {
      if (c == '\"') { result #= "\\\"" }
      else if (c == '\\') { result #= "\\\\" }
      else if (c == '\n') { result #= "\\n" }
      else if (c == '\r') { result #= "\\r" }
      else if (c == '\t') { result #= "\\t" }
      else { result #= Text.fromChar(c) };
    };
    result
  };

  // Parse a JSON field value from the raw text (naive, single-pass)
  func parseJsonField(json : Text, field : Text) : Text {
    let marker = "\"" # field # "\":\"";
    let parts = json.split(#text marker);
    var found = false;
    var result = "";
    label outer for (part in parts) {
      if (found) {
        let chars = part.toArray();
        let buf = List.empty<Char>();
        var i = 0;
        var escaped = false;
        label inner while (i < chars.size()) {
          let c = chars[i];
          if (escaped) {
            if (c == 'n') { buf.add('\n') }
            else if (c == 't') { buf.add('\t') }
            else { buf.add(c) };
            escaped := false;
          } else if (c == '\\') {
            escaped := true;
          } else if (c == '\"') {
            break inner;
          } else {
            buf.add(c);
          };
          i += 1;
        };
        result := Text.fromArray(buf.toArray());
        break outer;
      };
      found := true;
    };
    result
  };

  // Parse a JSON numeric field value from raw text
  func parseJsonNat(json : Text, field : Text) : Nat {
    let marker = if (field == "") ":" else "\"" # field # "\":";
    let parts = json.split(#text marker);
    var found = false;
    var result : Nat = 0;
    label outer for (part in parts) {
      if (found) {
        let chars = part.toArray();
        var numText = "";
        label inner for (c in chars.values()) {
          if (c >= '0' and c <= '9') { numText #= Text.fromChar(c) }
          else { break inner };
        };
        result := switch (Nat.fromText(numText)) {
          case (?n) n;
          case null 0;
        };
        break outer;
      };
      found := true;
    };
    result
  };

  // Parse the title from OpenAI JSON response
  func parseTitleFromJson(json : Text) : Text {
    let content = extractContentFromResponse(json);
    parseJsonField(content, "title")
  };

  // Parse steps array from OpenAI JSON response — returns up to 8 steps
  func parseStepsFromJson(json : Text) : [Types.Step] {
    let content = extractContentFromResponse(json);
    let stepParts = content.split(#text "\"stepNumber\"");
    let steps = List.empty<Types.Step>();
    var first = true;
    for (part in stepParts) {
      if (first) { first := false } else {
        let stepNumber = parseJsonNat(part, "");
        let icon = parseJsonField(part, "icon");
        let actionLabel = parseJsonField(part, "actionLabel");
        let description = parseJsonField(part, "description");
        let uiElementText = parseJsonField(part, "uiElement");
        let uiElement : ?Text = if (uiElementText == "") null else ?uiElementText;
        steps.add({
          stepNumber = if (stepNumber == 0) steps.size() + 1 else stepNumber;
          icon = if (icon == "") "mouse-pointer" else icon;
          actionLabel = if (actionLabel == "") "Step " # (steps.size() + 1).toText() else actionLabel;
          description;
          uiElement;
        });
      };
    };
    steps.toArray();
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared func createPlaybook(req : Types.CreatePlaybookRequest) : async CommonTypes.PlaybookId {
    let now = Time.now();
    let id = counter.value;
    counter.value += 1;
    let playbook = PlaybookLib.create(store, id, req, now);
    playbook.id;
  };

  public query func getPlaybook(id : CommonTypes.PlaybookId) : async ?Types.Playbook {
    PlaybookLib.get(store, id);
  };

  public query func listPlaybooks() : async [Types.Playbook] {
    PlaybookLib.list(store);
  };

  public shared func generatePlaybook(
    screenshot : Storage.ExternalBlob,
    taskGoal : Text,
    platformName : Text
  ) : async CommonTypes.PlaybookId {
    let screenshotUrl = switch (screenshot.decodeUtf8()) {
      case (?url) url;
      case null Runtime.trap("Invalid screenshot blob: cannot decode as UTF-8 URL");
    };
    let prompt = "You are a software walkthrough assistant. Given the following task goal and platform, generate a step-by-step walkthrough playbook in JSON format.\n\nPlatform: " # platformName # "\nTask Goal: " # taskGoal # "\nScreenshot URL: " # screenshotUrl # "\n\nRespond ONLY with a JSON object in this exact format:\n{\"title\": \"string\", \"steps\": [{\"stepNumber\": 1, \"icon\": \"lucide-icon-name\", \"actionLabel\": \"short action\", \"description\": \"detailed description of what to click or do\", \"uiElement\": \"optional UI element name\"}]}\n\nGenerate 5 to 8 steps. Use valid Lucide icon names (e.g. mouse-pointer, click, upload, download, search, settings, plus, edit, trash, check, arrow-right, link, folder, file, star, user, log-in, log-out, git-branch, git-commit, share, copy, eye, save, send, refresh-cw). Focus on concrete UI actions the user must perform.";
    let body = "{\"model\": \"gpt-4o\", \"messages\": [{\"role\": \"user\", \"content\": \"" # escapeJson(prompt) # "\"}], \"max_tokens\": 1500, \"temperature\": 0.3}";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer OPENAI_API_KEY" }
    ];
    let responseText = await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      headers,
      body,
      transform
    );
    let now = Time.now();
    let id = counter.value;
    counter.value += 1;
    let steps : [Types.Step] = parseStepsFromJson(responseText);
    let title = parseTitleFromJson(responseText);
    let req : Types.CreatePlaybookRequest = {
      title = if (title == "") taskGoal else title;
      platformName;
      taskGoal;
      screenshot;
      steps;
    };
    let playbook = PlaybookLib.create(store, id, req, now);
    playbook.id;
  };

  public shared func detectPlatform(screenshot : Storage.ExternalBlob) : async Text {
    let screenshotUrl = switch (screenshot.decodeUtf8()) {
      case (?url) url;
      case null Runtime.trap("Invalid screenshot blob: cannot decode as UTF-8 URL");
    };
    let prompt = "You are a software platform detection assistant. Look at the following screenshot URL and identify which web application or platform it shows.\n\nScreenshot URL: " # screenshotUrl # "\n\nRespond with ONLY the platform name (e.g. GitHub, Lovable, Figma, Notion, Jira, Slack, Google Drive, Vercel, Linear, Trello, Asana, Airtable, etc.). Do not include any explanation or punctuation — just the platform name.";
    let body = "{\"model\": \"gpt-4o\", \"messages\": [{\"role\": \"user\", \"content\": \"" # escapeJson(prompt) # "\"}], \"max_tokens\": 50, \"temperature\": 0.1}";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer OPENAI_API_KEY" }
    ];
    let responseText = await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      headers,
      body,
      transform
    );
    extractContentFromResponse(responseText);
  };
};
