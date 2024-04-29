import { Injectable } from "@angular/core";
import { TaskRepository } from "./task.repository";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  #findManyTask(params) {
    return this.taskRepository.findManyTask(params);
  }

  findOneTaskById(taskId: string) {
    return this.#findManyTask({ taskId }).pipe(map(([task]) => task));
  }

  findManyTaskByProcessIntanceId(processInstanceId: string) {
    return this.#findManyTask({ processInstanceId });
  }

  findManyTaskByProcessIntanceIdSortByStartDesc(processInstanceId: string) {
    return this.#findManyTask({
      processInstanceId,
      sortBy: "startTime",
      sortOrder: "desc",
    });
  }
}
