import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Variable } from "./variable";

@Injectable({ providedIn: "root" })
export class VariableRepository {
  constructor(private httpClient: HttpClient) {}

  findManyVariable(params) {
    return this.httpClient.get<Variable[]>(
      "/camunda/api/engine/engine/default/history/variable-instance",
      { params }
    );
  }
}
