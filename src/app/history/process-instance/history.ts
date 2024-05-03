export class History {
  constructor(
    public key: string,
    public value,
    public type: string,
    public startTime: Date | string,
    public endTime: Date | string
  ) {}
}
