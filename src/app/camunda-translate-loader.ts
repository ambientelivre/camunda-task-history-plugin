import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";

@Injectable({ providedIn: "root" })
export class CamundaTranslateLoader implements TranslateLoader {
  constructor(private httpClient: HttpClient) {}

  getTranslation(lang: string) {
    return this.httpClient.get(`/camunda/app/tasklist/locales/${lang}.json`);
  }
}
