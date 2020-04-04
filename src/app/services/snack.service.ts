import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SnackService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  authError() {
    this.snackBar.open("please log in !", "OK", {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(tap(_ => this.router.navigate(["/login"])))
      .subscribe();
  }
}
