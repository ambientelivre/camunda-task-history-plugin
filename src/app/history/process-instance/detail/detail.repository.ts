import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Detail } from "./detail";

@Injectable({ providedIn: "root" })
export class DetailRepository {
  constructor(private httpClient: HttpClient) {}

  findManyProcessInstanceDetail(params) {
    return this.httpClient.get<Detail>(
      "/camunda/api/engine/engine/default/history/detail",
      { params }
    );
  }
}
