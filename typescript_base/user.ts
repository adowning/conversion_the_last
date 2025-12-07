import { StatelessModel } from "./stateless-model";

export class User extends StatelessModel {
  public static current: User | null = null;

  constructor(attributes: any = []) {
    super(attributes);
    User.current = this;
  }

  public updateCountBalance(sum: number, count_balance: number): number {
    // Mimic logic from User.php if needed, or just return updated value
    // For now, simple arithmetic
    return count_balance + sum;
  }

  public update_level(type: string, sum: number): void {
    // No-op
  }

  public static lockForUpdate(): typeof User {
    return User; // Return class for chaining find()
  }

  // In a real stateless scenario, we'd look up from the Context.
  // But here, we expect the instance to be already populated via Context.
  public find(id: any): this {
    return this;
  }

  public save(): boolean {
    // No-op for stateless, but allows method chaining
    return true;
  }

  // Explicit getters/setters for SlotSettings compatibility
  get balance() {
    return this.getAttribute("balance");
  }
  set balance(val) {
    this.setAttribute("balance", val);
  }

  get count_balance() {
    return this.getAttribute("count_balance");
  }
  set count_balance(val) {
    this.setAttribute("count_balance", val);
  }

  get address() {
    return this.getAttribute("address");
  }
  set address(val) {
    this.setAttribute("address", val);
  }

  get session() {
    return this.getAttribute("session");
  }
  set session(val) {
    this.setAttribute("session", val);
  }

  get id() {
    return this.getAttribute("id");
  }
  get shop_id() {
    return this.getAttribute("shop_id");
  }
  get status() {
    return this.getAttribute("status");
  }
  get is_blocked() {
    return this.getAttribute("is_blocked");
  }
}
