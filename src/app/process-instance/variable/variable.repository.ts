import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Variable } from "./variable";
import { ACTIVE_CAMUNDA_TYPE } from "src/camunda-type";

@Injectable({ providedIn: "root" })
export class VariableRepository {
  constructor(private httpClient: HttpClient) {}

  findManyVariable(params) {
    return this.httpClient.get<Variable[]>(
      `/${ACTIVE_CAMUNDA_TYPE}/api/engine/engine/default/history/variable-instance`,
      { params }
    );
  }

  findOneVariable(id: string) {
    return this.httpClient.get<Variable>(
      `/${ACTIVE_CAMUNDA_TYPE}/api/engine/engine/default/history/variable-instance/${id}`
    );
  }
}
