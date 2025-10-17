import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "./task";
import { ACTIVE_CAMUNDA_TYPE } from "src/camunda-type";

@Injectable({
  providedIn: "root",
})
export class TaskRepository {
  constructor(private httpClient: HttpClient) {}

  findManyTask(params) {
    return this.httpClient.get<Task[]>(
      `/${ACTIVE_CAMUNDA_TYPE}/api/engine/engine/default/history/task`,
      { params }
    );
  }
}
