import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { NgHttpCachingModule } from "ng-http-caching";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { CamundaTranslateLoader } from "./camunda-translate-loader";
import { HistoryTableComponent } from "./components/history-table/history-table.component";
import { TableComponent } from "./components/table/table.component";
import { DurationFormatPipe } from "./duration-format.pipe";
import { ProcessTableComponent } from "./pages/process-table/process-table.component";
import { TaskTableComponent } from "./pages/task-table/task-table.component";
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  schemas: [],
  declarations: [
    TaskTableComponent,
    ProcessTableComponent,
    DurationFormatPipe,
    TableComponent,
    HistoryTableComponent,
    LoadingComponent,
  ],
  providers: [],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useClass: CamundaTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgHttpCachingModule.forRoot({ lifetime: 10_000 }),
  ],
  entryComponents: [TaskTableComponent, ProcessTableComponent],
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
    private injector: Injector
  ) {
    this.translateService.setDefaultLang(
      this.translateService.getBrowserCultureLang()
    );

    customElements.define(
      "task-table",
      createCustomElement(TaskTableComponent, {
        injector: this.injector,
      })
    );

    customElements.define(
      "process-table",
      createCustomElement(ProcessTableComponent, {
        injector: this.injector,
      })
    );
  }

  ngDoBootstrap() {}
}
