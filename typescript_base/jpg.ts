import { StatelessModel } from "./stateless-model";

export class JPG extends StatelessModel {
  public get_pay_sum(): number {
    return this.attributes["pay_sum"] ?? 0;
  }

  public get_start_balance(): number {
    return this.attributes["start_balance"] ?? 0;
  }

  public get_min(field: string): number {
    // Simplified
    return 0;
  }

  public add_jpg(type: string, sum: number): void {
    if (type == "add") {
      this.increment("balance", sum);
    } else {
      this.decrement("balance", sum);
    }
  }
}
