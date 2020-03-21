import { NavService } from "./../nav.service";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    public navService: NavService
  ) {}

  ngOnInit(): void {
    let selectedProduct = this.productService.selectedProduct;
    this.initialiseProduct(selectedProduct);
  }

  initialiseProduct(product?: Product) {
    if (product) this.product = product;
    else this.product = this.productService.selectedProduct = new Product();
  }

  handleSubmit() {
    if (this.product.isNew) this.productService.saveProduct(this.product);
    else this.productService.updateProduct(this.product);
    this.navService.select(1);
  }
}
