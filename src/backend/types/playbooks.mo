import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type Step = {
    stepNumber : Nat;
    icon : Text;
    actionLabel : Text;
    description : Text;
    uiElement : ?Text;
  };

  public type Playbook = {
    id : CommonTypes.PlaybookId;
    title : Text;
    platformName : Text;
    taskGoal : Text;
    steps : [Step];
    screenshot : Storage.ExternalBlob;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreatePlaybookRequest = {
    title : Text;
    platformName : Text;
    taskGoal : Text;
    screenshot : Storage.ExternalBlob;
    steps : [Step];
  };
};
