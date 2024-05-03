import { Injectable } from "@angular/core";
import { DetailRepository } from "./detail.repository";

@Injectable({
  providedIn: "root",
})
export class DetailService {
  constructor(private detailRepository: DetailRepository) {}

  #findManyProcessInstanceDetail(params) {
    return this.detailRepository.findManyProcessInstanceDetail({
      ...params,
      deserializeValues: true,
      formFields: false,
      variableUpdates: false,
      initial: false,
    });
  }

  findManyProcessInstanceDetail(params) {
    return this.#findManyProcessInstanceDetail(params);
  }
}
