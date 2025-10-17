import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Detail } from "./detail";
import { ACTIVE_CAMUNDA_TYPE } from "src/camunda-type";

@Injectable({ providedIn: "root" })
export class DetailRepository {
  constructor(private httpClient: HttpClient) {}

  findManyProcessInstanceDetail(params) {
    return this.httpClient.get<Detail[]>(
      `/${ACTIVE_CAMUNDA_TYPE}/api/engine/engine/default/history/detail`,
      { params }
    );
  }
}
