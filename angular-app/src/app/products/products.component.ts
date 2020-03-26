import { Component, OnInit } from "@angular/core";
import { faSave, faTools } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ProductService } from "../product.service";

import { Product } from "../product";
import { ParametersComponent } from "../parameters/parameters.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: Product[];
  faSave = faSave;
  faTools = faTools;
  saved = true;

  constructor(
    public productService: ProductService,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    await this.productService.subscribeToProducts();
    setInterval(() => {
      this.products = this.productService.products;
    }, 3000);
  }

  handleInputChange(e, p: Product) {
    let products = [...this.products];
    let index = products.indexOf(p);
    const name = e.target.id;
    const value = e.target.value;
    p[name] = value;
    products.splice(index, 1, p);
    this.products = products;
    this.saved = false;
  }

  handleSaveChanges() {
    this.products.forEach(product =>
      this.productService.updateProduct(product)
    );
    this.saved = true;
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product);
    this.products = this.products.filter(p => p.id !== product.id);
  }

  openModal() {
    this.modalService.open(ParametersComponent, {
      size: "sm"
    });
  }
}
