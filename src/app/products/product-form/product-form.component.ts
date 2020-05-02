import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackService } from "src/app/services/snack.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private snackService: SnackService,
    private afAuth: AngularFireAuth
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
      sell: [product.sell, Validators.min(0)],
    });
  }

  ngOnInit() {
    if (this.data.id === "new") this.createNewProduct();
    else {
      this.productService.getProduct(this.data.id).subscribe((product) => {
        this.initProductForm(product);
      });
    }
  }

  createNewProduct() {
    this.initProductForm(new Product());
  }

  handleSubmit() {
    this.dialogRef.close();
    let product = new Product(this.productForm.value);
    if (product.isNew) this.productService.saveProduct(product);
    else {
      this.afAuth.authState.subscribe((user) => {
        if (!user) return this.snackService.authError();
        this.productService.updateProduct(product);
      });
    }
  }
}
