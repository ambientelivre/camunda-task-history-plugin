import { Injectable } from "@angular/core";
import { from, reduce, switchMap } from "rxjs";
import { VariableRepository } from "./variable.repository";
import { Variable } from "./variable";

@Injectable({
  providedIn: "root",
})
export class VariableService {
  constructor(private variableRepository: VariableRepository) {}

  #findManyVariable(params) {
    return this.variableRepository.findManyVariable({
      ...params,
      deserializeValues: false,
      includeDeleted: true,
    });
  }

  findManyVariableByTaskId(params, ...taskId: string[]) {
    return this.#findManyVariable({ ...params, taskId });
  }
}
