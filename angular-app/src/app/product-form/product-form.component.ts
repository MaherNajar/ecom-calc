import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(params => this.productService.getProduct(params.id)))
      .subscribe(p => this.initialiseProduct(p));
  }

  initialiseProduct(product?: Product) {
    if (product) this.product = product;
    else this.product = new Product();
  }

  handleSubmit() {
    if (this.product.isNew) this.productService.saveProduct(this.product);
    else this.productService.updateProduct(this.product);
  }
}
