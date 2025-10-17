import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user";
import { ACTIVE_CAMUNDA_TYPE } from "src/camunda-type";

@Injectable({ providedIn: "root" })
export class UserRepository {
  constructor(private httpClient: HttpClient) {}

  findManyUser(params) {
    return this.httpClient.get<User[]>(
      `/${ACTIVE_CAMUNDA_TYPE}/api/engine/engine/default/user`,
      { params }
    );
  }

  findOneUser(id: string) {
    return this.httpClient.get<User>(
      `/${ACTIVE_CAMUNDA_TYPE}/api/engine/engine/default/user/${id}/profile`
    );
  }
}
