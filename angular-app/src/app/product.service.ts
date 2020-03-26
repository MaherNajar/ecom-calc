import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Product } from "./product";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  products = null;
  subscription;

  subscribeToProducts() {
    if (!this.products) {
      this.db
        .collection("products")
        .valueChanges({ idField: "id" })
        .pipe(map((p: any) => new Product({ ...p })))
        .subscribe(products => (this.products = products));
    }
  }

  getProduct(id: string) {
    if (this.products) {
      const cached = this.products.find(p => p.id === id);
      return of(cached);
    } else {
      return this.db
        .collection("products")
        .doc(id)
        .valueChanges()
        .pipe(map((x: any) => new Product({ ...x })));
    }
  }

  saveProduct(product: Product) {
    let id = this.db.createId();
    this.db
      .collection("products")
      .doc(id)
      .set({ ...product, id });
  }

  updateProduct(product: Product) {
    this.db
      .collection("products")
      .doc(product.id)
      .update({ ...product });
  }

  deleteProduct(product: Product) {
    this.db
      .collection("products")
      .doc(product.id)
      .delete();
  }
}
