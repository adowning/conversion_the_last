import { StatelessModel } from "./stateless-model";

export class GameBank extends StatelessModel {
  public getFishAttribute(): number {
    return this.attributes["fish"] ?? 0;
  }

  public setFishAttribute(value: number): void {
    this.attributes["fish"] = value;
  }

  // Accessors for logic usage in Game.ts and SlotSettings.ts
  get slots() {
    return Number(this.attributes["slots"] ?? 0);
  }
  get bonus() {
    return Number(this.attributes["bonus"] ?? 0);
  }
  get fish() {
    return Number(this.attributes["fish"] ?? 0);
  }
  get table_bank() {
    return Number(this.attributes["table_bank"] ?? 0);
  }
  get little() {
    return Number(this.attributes["little"] ?? 0);
  }
}
