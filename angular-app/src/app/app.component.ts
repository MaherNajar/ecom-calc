import { NavService } from "./nav.service";
import { Component } from "@angular/core";
import { faCog } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  faCog = faCog;
  constructor(public navService: NavService) {}
}
