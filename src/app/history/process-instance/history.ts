import { Detail } from "./detail/detail";
import { Variable } from "./variable/variable";

export class History {
  startTime: Date;
  endTime: Date;

  constructor(
    public key: string,
    public value,
    public type: string,
    startTime: Date | string,
    endTime: Date | string,
    public id: string,
    public valueType: string
  ) {
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
  }

  static fromDetail(detail: Detail) {
    const isVariable = typeof detail.variableName === "string";

    return new History(
      isVariable ? detail.variableName : detail.fieldId,
      isVariable ? detail.value : detail.fieldValue,
      detail.type,
      detail.time,
      detail.removalTime,
      detail.variableInstanceId,
      detail.variableType
    );
  }

  static fromVariable(variable: Variable) {
    return new History(
      variable.name,
      variable.value,
      variable.state,
      new Date(variable.createTime),
      new Date(variable.removalTime),
      variable.id,
      variable.type
    );
  }

  static sortByStartTimeDesc(history: History[]) {
    return history.sort(
      ({ startTime: asc }, { startTime: desc }) =>
        desc.getTime() - asc.getTime()
    );
  }
}
