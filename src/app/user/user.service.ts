import { Injectable } from "@angular/core";
import { UserRepository } from "./user.repository";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findOneUserById(id: string) {
    return this.userRepository
      .findManyUser({ id, maxResults: 1 })
      .pipe(map(([user]) => user));
  }
}
