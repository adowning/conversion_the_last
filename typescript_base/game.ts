import { StatelessModel } from "./stateless-model";
import { GameBank } from "./game-bank";

export class Game extends StatelessModel {
  // public static $values removed. Values should be passed in attributes.

  public random_keys: Record<string, number[]> = {
    "74_80": [74, 80],
    "82_88": [82, 88],
    "90_96": [90, 96],
    "98_105": [98, 105],
    "106_115": [106, 115],
    "116_125": [116, 125],
  };

  // Helper to store the injected GameBank instance
  public gamebank_instance: GameBank | null = null;

  constructor(attributes: any = []) {
    super(attributes);
    // If gamebank_instance was passed in attributes, hoist it to the property
    if (attributes["gamebank_instance"]) {
      this.gamebank_instance = attributes["gamebank_instance"];
    }
  }

  public get_line_value(
    data: any,
    index1: string,
    index2: string,
    return_empty: boolean = false
  ): any {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = {};
      }
    }

    if (data && data[index1] && data[index1][index2] !== undefined) {
      return data[index1][index2];
    }
    if (return_empty) {
      return "";
    }
    return 1;
  }

  public get_lines_percent_config(type: string): any {
    let result: any = {};
    const random_keys = this.random_keys;

    if (!random_keys) {
      return [];
    }

    if (type == "spin") {
      let spinConfig = this.getAttribute("lines_percent_config_spin");
      if (typeof spinConfig === "string") {
        try {
          spinConfig = JSON.parse(spinConfig);
        } catch (e) {}
      }

      let bonusConfig = this.getAttribute("lines_percent_config_spin_bonus");
      if (typeof bonusConfig === "string") {
        try {
          bonusConfig = JSON.parse(bonusConfig);
        } catch (e) {}
      }

      const lines = [1, 3, 5, 7, 9, 10];
      for (let line of lines) {
        // Initialize sub-objects
        if (!result["line" + line]) result["line" + line] = {};
        if (!result["line" + line + "_bonus"])
          result["line" + line + "_bonus"] = {};

        for (let key in random_keys) {
          let val = 1;
          if (
            spinConfig &&
            spinConfig["line" + line] &&
            spinConfig["line" + line][key] !== undefined
          ) {
            val = spinConfig["line" + line][key];
          }
          result["line" + line][key] = val;
        }
      }

      for (let line of lines) {
        for (let key in random_keys) {
          let val = 1;
          if (
            bonusConfig &&
            bonusConfig["line" + line + "_bonus"] &&
            bonusConfig["line" + line + "_bonus"][key] !== undefined
          ) {
            val = bonusConfig["line" + line + "_bonus"][key];
          }
          result["line" + line + "_bonus"][key] = val;
        }
      }
    }

    if (type == "bonus") {
      const lines = [1, 3, 5, 7, 9, 10];
      const configBonus = this.getAttribute("lines_percent_config_bonus");
      const configBonusBonus = this.getAttribute(
        "lines_percent_config_bonus_bonus"
      );

      for (let line of lines) {
        if (!result["line" + line]) result["line" + line] = {};
        for (let key in random_keys) {
          result["line" + line][key] = this.get_line_value(
            configBonus,
            "line" + line,
            key
          );
        }
      }
      for (let line of lines) {
        if (!result["line" + line + "_bonus"])
          result["line" + line + "_bonus"] = {};
        for (let key in random_keys) {
          result["line" + line + "_bonus"][key] = this.get_line_value(
            configBonusBonus,
            "line" + line + "_bonus",
            key
          );
        }
      }
    }
    return result;
  }

  public get_gamebank(slotState: string = "", bankType: string = ""): number {
    // Access the injected instance
    const bank =
      this.gamebank_instance || this.getAttribute("gamebank_instance");

    if (bank) {
      if (bankType && bank[bankType] !== undefined) {
        // Accessing dynamic property on GameBank class
        return Number((bank as any)[bankType]);
      }
      if (
        bankType &&
        bank.getAttribute &&
        bank.getAttribute(bankType) !== null
      ) {
        return Number(bank.getAttribute(bankType));
      }

      // Sum of all banks
      // Assuming bank is an instance of GameBank class which has these getters
      const b = bank as GameBank;
      return b.slots + b.bonus + b.fish + b.table_bank + b.little;
    }

    return 0;
  }

  public set_gamebank(sum: number, type: string, slotState: string = ""): void {
    const bank =
      this.gamebank_instance || this.getAttribute("gamebank_instance");

    if (bank) {
      let field = "slots";
      if (slotState == "bonus") field = "bonus";

      if (type == "inc") {
        bank.increment(field, sum);
      } else {
        bank.decrement(field, sum);
      }
    }
  }

  public tournament_stat(
    slotState: string,
    userId: number,
    bet: number,
    win: number
  ): void {
    // No-op
  }

}
