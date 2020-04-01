import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductFormComponent } from "../product-form/product-form.component";
import { ProductsComponent } from "./products.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  entryComponents: [ProductFormComponent]
})
export class ProductsModule {}
