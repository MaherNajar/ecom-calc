import { Component, OnInit } from "@angular/core";
import { Fees } from "../models/fees";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  fees = {
    ebay: 0,
    paypal: 0
  };
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fees = Fees.getFees();
  }

  resetDefault() {
    this.fees = Fees.defaultFees;
  }

  handleSubmit() {
    this.router.navigate([""]);
    Fees.setFees(this.fees.ebay, this.fees.paypal);
  }
}
