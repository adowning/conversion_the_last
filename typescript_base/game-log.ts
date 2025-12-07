export class GameLog {
  public static logs: any[] = [];
  public str: string | null = null;

  constructor(data: any = []) {
    if (data["str"]) {
      this.str = data["str"];
    }
  }

  public static create(data: any): GameLog {
    // PHP: date('Y-m-d H:i:s')
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    data["time"] = now;

    GameLog.logs.push(data);
    return new GameLog(data);
  }

  public static whereRaw(query: string, bindings: any[] = []): typeof GameLog {
    return GameLog;
  }

  public get(): GameLog[] {
    // PHP: collect(self::$logs)->map(...)->reverse()
    return GameLog.logs.map((log) => new GameLog(log)).reverse();
  }

  public static setLogs(logs: any[]): void {
    GameLog.logs = logs;
  }

  public static getLogs(): any[] {
    return GameLog.logs;
  }
}
