import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { GoogleSigninDirective } from "./google-signin.directive";
import { EmailLoginComponent } from "./email-login/email-login.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { UserRoutingModule } from "./user-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GoogleSigninDirective,
    EmailLoginComponent,
    LoginPageComponent
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule, ReactiveFormsModule],
  exports: [GoogleSigninDirective]
})
export class UserModule {}
