import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler, Injectable } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductsComponent } from "./products/products.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import * as Sentry from "@sentry/browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ParametersComponent } from "./parameters/parameters.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from "@angular/material/input";

Sentry.init({
  dsn: "https://9ab0255b2c7d425bbcb12d3b1d968b39@sentry.io/5167081"
});

const routes: Route[] = [
  { path: "", component: ProductsComponent },
  { path: "form/:id", component: ProductFormComponent }
];

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    ParametersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    FontAwesomeModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  // providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent],
  entryComponents: [ParametersComponent]
})
export class AppModule {}
