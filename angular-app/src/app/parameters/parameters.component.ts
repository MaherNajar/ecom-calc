import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Fees } from "../fees";

@Component({
  templateUrl: "./parameters.component.html",
  styleUrls: ["./parameters.component.scss"]
})
export class ParametersComponent implements OnInit {
  fees = {
    ebay: 0,
    paypal: 0
  };
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.fees = Fees.getFees();
  }

  resetDefault() {
    this.fees = Fees.defaultFees;
  }

  handleSubmit() {
    this.activeModal.close();
    Fees.setFees(this.fees.ebay, this.fees.paypal);
  }
}
