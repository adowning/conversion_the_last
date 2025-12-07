import { StatelessModel } from "./stateless-model";

export class Shop extends StatelessModel {
  public blocked(): boolean {
    return this.attributes["is_blocked"] ?? false;
  }

  // Explicit getters for common properties accessed in SlotSettings
  get percent() {
    return this.getAttribute("percent");
  }
  get max_win() {
    return this.getAttribute("max_win");
  }
  get currency() {
    return this.getAttribute("currency");
  }
  get is_blocked() {
    return this.getAttribute("is_blocked");
  }
}
