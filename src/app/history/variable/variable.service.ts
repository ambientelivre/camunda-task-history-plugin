import { Injectable } from "@angular/core";
import { from, reduce, switchMap } from "rxjs";
import { VariableRepository } from "./variable.repository";

@Injectable({
  providedIn: "root",
})
export class VariableService {
  constructor(private variableRepository: VariableRepository) {}

  #findManyVariable(params) {
    return this.variableRepository
      .findManyVariable({
        ...params,
        deserializeValues: false,
      })
      .pipe(
        switchMap((variable) => from(variable)),
        reduce(
          (p, c) => ({ ...p, [c.name]: c.value }),
          {} as Record<string, any>
        )
      );
  }

  findOneVariableByTaskId(taskIdIn: string) {
    return this.#findManyVariable({ taskIdIn, maxResults: 1 });
  }

  findManyVariableByTaskId(...taskIdIn: string[]) {
    return this.#findManyVariable({ taskIdIn });
  }
}
