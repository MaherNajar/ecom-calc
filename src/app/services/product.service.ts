import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Product } from "../models/product";
import { of } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

  products: MatTableDataSource<Product> = null;
  saved = true;

  subscribeToProducts(paginator: MatPaginator, sort: MatSort) {
    if (!this.products) {
      this.loadProductsFromDB(paginator, sort);
    } else this.products.paginator = paginator;
  }

  loadProductsFromDB(paginator: MatPaginator, sort: MatSort) {
    this.db
      .collection("users")
      .doc(this.afAuth.auth.currentUser.uid)
      .collection("products")
      .valueChanges()
      .pipe(map(products => products.map(p => new Product(p))))
      .subscribe(products => {
        this.products = new MatTableDataSource(products);
        this.products.paginator = paginator;
        this.products.sort = sort;
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
      return of(cached);
    } else {
      return this.db
        .collection("users")
        .doc(this.afAuth.auth.currentUser.uid)
        .collection("products")
        .doc(id)
        .valueChanges()
        .pipe(map(x => new Product(x)));
    }
  }

  saveProduct(product: Product) {
    let id = this.db.createId();
    this.db
      .collection("users")
      .doc(this.afAuth.auth.currentUser.uid)
      .collection("products")
      .doc(id)
      .set({ ...product, id });
  }

  updateProduct(product: Product) {
    this.db
      .collection("users")
      .doc(this.afAuth.auth.currentUser.uid)
      .collection("products")
      .doc(product.id)
      .update({ ...product });
  }

  deleteProduct(product: Product) {
    this.db
      .collection("users")
      .doc(this.afAuth.auth.currentUser.uid)
      .collection("products")
      .doc(product.id)
      .delete();
    this.products.data = this.products.data.filter(p => p.id !== product.id);
  }
}