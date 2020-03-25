import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Product } from "./product";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private fs: AngularFirestore) {}
  selectedProduct: Product;

  getProducts(): Observable<Product[]> {
    return this.fs
      .collection("products")
      .get()
      .pipe(
        map(querySnapshot => {
          let products = [];
          querySnapshot.forEach(doc => {
            let product = new Product({ id: doc.id, ...doc.data() });
            products.push(product);
          });
          return products;
        })
      );
  }

  getProduct(id: string) {
    const docRef = this.fs.doc(`products/${id}`);
    return docRef.valueChanges().pipe(map((x: any) => new Product({ ...x })));
  }

  saveProduct(product: Product) {
    let id = this.fs.createId();
    const docRef = this.fs.doc(`products/${id}`);

    docRef.set({ ...product, id });
  }

  updateProduct(product: Product) {
    const docRef = this.fs.doc(`products/${product.id}`);
    docRef.update({ ...product });
  }

  deleteProduct(product: Product) {
    const docRef = this.fs.doc(`products/${product.id}`);
    docRef.delete();
  }
}
