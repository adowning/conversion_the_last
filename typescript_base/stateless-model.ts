export class StatelessModel {
  protected attributes: Record<string, any> = {};
  protected original: Record<string, any> = {};

  constructor(attributes: Record<string, any> = {}) {
    this.fill(attributes);
  }

  public fill(attributes: Record<string, any>): this {
    for (const key in attributes) {
      this.setAttribute(key, attributes[key]);
    }
    this.original = { ...this.attributes };
    return this;
  }

  public setAttribute(key: string, value: any): void {
    this.attributes[key] = value;
  }

  public getAttribute(key: string): any {
    return this.attributes[key] ?? null;
  }

  // Emulate PHP's magic __get
  // Note: In strict TS, you should use getAttribute('key'), but for specific known keys
  // in subclasses, we will add explicit getters.
  public get(key: string): any {
    return this.getAttribute(key);
  }

  public set(key: string, value: any): void {
    this.setAttribute(key, value);
  }

  public save(): boolean {
    // No-op for stateless
    return true;
  }

  public update(attributes: Record<string, any> = []): boolean {
    this.fill(attributes);
    return true;
  }

  public increment(column: string, amount: number = 1): boolean {
    const current = Number(this.attributes[column] ?? 0);
    this.attributes[column] = current + amount;
    return true;
  }

  public decrement(column: string, amount: number = 1): boolean {
    const current = Number(this.attributes[column] ?? 0);
    this.attributes[column] = current - amount;
    return true;
  }

  public refresh(): this {
    return this;
  }

  public static lockForUpdate(): typeof StatelessModel {
    // Return class constructor to chain
    return this;
  }

  public static where(
    column: string,
    operator: any = null,
    value: any = null
  ): typeof StatelessModel {
    return this;
  }

  public first(): this {
    return this;
  }

  public get(): this[] {
    return [this];
  }

  public toArray(): Record<string, any> {
    return this.attributes;
  }

  public toJSON(): Record<string, any> {
    return this.toArray();
  }
}
