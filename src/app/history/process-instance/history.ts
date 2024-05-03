import { Detail } from "./detail/detail";
import { Variable } from "./variable/variable";

export class History {
  constructor(
    public key: string,
    public value,
    public type: string,
    public startTime: Date | string,
    public endTime: Date | string
  ) {}

  static fromDetail(detail: Detail) {
    return new History(
      detail?.variableName || detail.fieldId || "",
      detail.value || detail.fieldValue || "",
      detail.type,
      detail.time,
      detail.removalTime
    );
  }

  static fromVariable(variable: Variable) {
    return new History(
      variable.name,
      variable.value,
      variable.state,
      variable.createTime,
      variable.removalTime
    );
  }
}
