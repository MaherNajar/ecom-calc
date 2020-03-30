import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Product } from "./product";
import { of } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  products: MatTableDataSource<Product> = null;
  saved = true;

  subscribeToProducts(paginator: MatPaginator) {
    if (!this.products) {
      console.log("pas de cache");
      this.loadProductsFromDB(paginator);
    } else this.products.paginator = paginator;
  }

  loadProductsFromDB(paginator: MatPaginator) {
    this.db
      .collection("products")
      .valueChanges()
      .pipe(map(products => products.map(p => new Product(p))))
      .subscribe(products => {
        this.products = new MatTableDataSource(products);
        this.products.paginator = paginator;
        this.saved = true;
      });
  }

  applyChanges(products: Product[]) {
    this.products.data = products;
    this.saved = false;
  }

  saveChanges() {
    this.products.data.forEach(product => this.updateProduct(product));
    this.saved = true;
  }

  getProduct(id: string) {
    if (this.products) {
      const cached = this.products.data.find(product => product.id === id);
      console.log("product from cache");
      return of(cached);
    } else {
      return this.db
        .collection("products")
        .doc(id)
        .valueChanges()
        .pipe(map(x => new Product(x)));
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
    this.products.data = this.products.data.filter(p => p.id !== product.id);
  }
}
