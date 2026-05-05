import List "mo:core/List";
import Types "../types/playbooks";
import CommonTypes "../types/common";
import Int "mo:core/Int";

module {
  public func create(
    store : List.List<Types.Playbook>,
    nextId : Nat,
    req : Types.CreatePlaybookRequest,
    now : CommonTypes.Timestamp
  ) : Types.Playbook {
    let playbook : Types.Playbook = {
      id = nextId;
      title = req.title;
      platformName = req.platformName;
      taskGoal = req.taskGoal;
      steps = req.steps;
      screenshot = req.screenshot;
      createdAt = now;
    };
    store.add(playbook);
    playbook;
  };

  public func get(
    store : List.List<Types.Playbook>,
    id : CommonTypes.PlaybookId
  ) : ?Types.Playbook {
    store.find(func(p) { p.id == id });
  };

  public func list(
    store : List.List<Types.Playbook>
  ) : [Types.Playbook] {
    let arr = store.toArray();
    arr.sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };
};
