import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, FormsModule]
})
export class SettingsModule {}
