import { Injectable } from "@angular/core";
import { TaskRepository } from "./task.repository";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  findOneTaskById(taskId: string) {
    return this.taskRepository
      .findManyTask({ taskId, maxResults: 1 })
      .pipe(map(([task]) => task));
  }

  findManyTask(params) {
    return this.taskRepository.findManyTask(params);
  }
}
