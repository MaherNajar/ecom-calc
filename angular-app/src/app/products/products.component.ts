import { Component, OnInit, ViewChild } from "@angular/core";
import {
  faSave,
  faTools,
  faSyncAlt,
  faTrashAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ProductService } from "../product.service";

import { Product } from "../product";
import { ParametersComponent } from "../parameters/parameters.component";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  faSyncAlt = faSyncAlt;
  faTools = faTools;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  displayedColumns = ["Product", "Cost", "Sell", "Profit", "Rate", "Delete"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.productService.subscribeToProducts(this.paginator);
  }

  handleInputChange(e, p: Product) {
    let products = [...this.productService.products.data];
    let index = products.indexOf(p);
    const name = e.target.id;
    const value = e.target.value;
    p[name] = value;
    products.splice(index, 1, p);
    this.productService.applyChanges(products);
  }

  openModal() {
    this.modalService.open(ParametersComponent, {
      size: "sm"
    });
  }
}
