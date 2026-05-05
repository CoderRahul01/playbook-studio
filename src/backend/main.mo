import List "mo:core/List";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Types "types/playbooks";
import PlaybooksMixin "mixins/playbooks-api";
import CommonTypes "types/common";

actor {
  let store = List.empty<Types.Playbook>();
  let counter : CommonTypes.Counter = { var value = 0 };

  include MixinObjectStorage();
  include PlaybooksMixin(store, counter);
};
