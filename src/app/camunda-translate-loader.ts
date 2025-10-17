import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import { ACTIVE_CAMUNDA_TYPE } from "src/camunda-type";

@Injectable({ providedIn: "root" })
export class CamundaTranslateLoader implements TranslateLoader {
  constructor(private httpClient: HttpClient) {}

  getTranslation(lang: string) {
    return this.httpClient.get(
      `/${ACTIVE_CAMUNDA_TYPE}/app/tasklist/locales/${lang}.json`
    );
  }
}
