import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get isNew() {
    return this.productForm.get("id").value === "";
  }

  initProductForm(product: Product) {
    this.productForm = this.formBuilder.group({
      id: [product.id],
      name: [product.name, Validators.required],
      url: [product.url, [Validators.required]],
      cost: [product.cost, Validators.min(0)],
      sell: [product.sell, Validators.min(0)]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async param => {
      if (param.id === "new") this.initProductForm(new Product());
      else {
        this.productService.getProduct(param.id).subscribe(product => {
          this.initProductForm(product);
        });
      }
    });
  }

  handleSubmit() {
    let product = new Product(this.productForm.value);
    if (product.isNew) this.productService.saveProduct(product);
    else this.productService.updateProduct(product);
    this.router.navigate([""]);
  }
}
