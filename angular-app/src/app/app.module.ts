import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductsComponent } from "./products/products.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ServiceWorkerModule } from "@angular/service-worker";
import { ParametersComponent } from "./parameters/parameters.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ShellComponent } from "./shell/shell.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { EmailLoginComponent } from "./user/email-login/email-login.component";
import { LoginPageComponent } from "./user/login-page/login-page.component";

const routes: Route[] = [
  { path: "", component: ProductsComponent },
  { path: "form/:id", component: ProductFormComponent },
  { path: "login", component: LoginPageComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    ParametersComponent,
    PageNotFoundComponent,
    ShellComponent,
    EmailLoginComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    FontAwesomeModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ParametersComponent]
})
export class AppModule {}
