import { Injectable } from "@angular/core";
import { UserRepository } from "./user.repository";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findOneUserById(id: string) {
    return this.userRepository.findManyUser({ id }).pipe(map(([user]) => user));
  }
}
