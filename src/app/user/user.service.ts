import { Injectable } from "@angular/core";
import { UserRepository } from "./user.repository";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findOneUserById(id: string) {
    return this.userRepository.findOneUser(id);
  }
}
