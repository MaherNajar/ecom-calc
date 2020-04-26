import { Component, OnInit, ViewChild } from "@angular/core";
import {
  faSave,
  faTools,
  faSyncAlt,
  faTrashAlt,
  faPlusCircle,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

import { ProductService } from "../services/product.service";
import { Product } from "../models/product";
import { MatDialog } from "@angular/material/dialog";

import { MatPaginator } from "@angular/material/paginator";
import { ProductFormComponent } from "./product-form/product-form.component";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  faSyncAlt = faSyncAlt;
  faTools = faTools;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faExternalLinkAlt = faExternalLinkAlt;

  displayedColumns = [
    "Product",
    "Cost",
    "Sell",
    "Fees",
    "Profit",
    "Rate",
    "Delete",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productService.subscribeToProducts(this.paginator, this.sort);
  }

  applyFilter({ target }) {
    const filterValue: string = target.value;
    this.productService.products.filter = filterValue.trim().toLowerCase();
  }

  handleInputChange(e, p: Product) {
    let products = [...this.productService.products.data];
    let index = products.indexOf(p);
    const { name, value } = e.target;
    p[name] = value;
    products.splice(index, 1, p);
    this.productService.applyChanges(products);
  }

  openProductFormDialog(id: string) {
    this.dialog.open(ProductFormComponent, {
      width: "400px",
      data: { id },
    });
  }
}
