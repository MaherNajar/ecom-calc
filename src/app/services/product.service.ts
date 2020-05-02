import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Product } from "../models/product";
import { SnackService } from "./snack.service";

const testuser = "testuser";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackService: SnackService
  ) {}

  products: MatTableDataSource<Product> = null;
  saved = true;

  get total() {
    if (this.products?.data.length === 0) return 0;
    else return this.products?.data.map((x) => x.total).reduce((a, b) => a + b);
  }

  subscribeToProducts(paginator: MatPaginator, sort: MatSort) {
    if (!this.products) {
      this.loadProductsFromDB(paginator, sort);
    } else {
      this.products.paginator = paginator;
      this.products.sort = sort;
    }
  }

  loadProductsFromDB(paginator: MatPaginator, sort: MatSort) {
    this.afAuth.authState.subscribe((user) => {
      let userId = user ? user.uid : testuser;
      this.db
        .collection("users")
        .doc(userId)
        .collection("products")
        .valueChanges()
        .pipe(map((products) => products.map((p) => new Product(p))))
        .subscribe((products) => {
          this.products = new MatTableDataSource(products);
          this.products.paginator = paginator;
          this.products.sort = sort;
          this.saved = true;
        });
    });
  }

  applyChanges(products: Product[]) {
    this.products.data = products;
    this.saved = false;
  }

  saveChanges() {
    this.afAuth.authState.subscribe((user) => {
      if (!user) this.snackService.authError();
      else {
        this.products.data.forEach((product) => this.updateProduct(product));
        this.saved = true;
      }
    });
  }

  getProduct(id: string) {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (this.products) {
          const cached = this.products.data.find(
            (product) => product.id === id
          );
          return of(cached);
        } else {
          let userId = user ? user.uid : testuser;
          return this.db
            .collection("users")
            .doc(userId)
            .collection("products")
            .doc(id)
            .valueChanges()
            .pipe(map((x) => new Product(x)));
        }
      })
    );
  }

  saveProduct(product: Product) {
    this.afAuth.authState.subscribe((user) => {
      if (!user && this.products?.data.length === 3)
        return this.snackService.authError(
          "You must be logged in to create more products"
        );
      let userId = user ? user.uid : testuser;
      let id = this.db.createId();
      this.db
        .collection("users")
        .doc(userId)
        .collection("products")
        .doc(id)
        .set({ ...product, id });
    });
  }

  updateProduct(product: Product) {
    this.afAuth.authState.subscribe((user) => {
      let userId = user ? user.uid : testuser;
      this.db
        .collection("users")
        .doc(userId)
        .collection("products")
        .doc(product.id)
        .update({ ...product });
    });
  }

  deleteProduct(product: Product) {
    this.afAuth.authState.subscribe((user) => {
      let userId = user ? user.uid : testuser;

      this.products.data = this.products.data.filter(
        (p) => p.id !== product.id
      );
      this.db
        .collection("users")
        .doc(userId)
        .collection("products")
        .doc(product.id)
        .delete();
    });
  }
}
