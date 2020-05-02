import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SnackService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  authError(text?) {
    let message = text || "you must be logged in to perform this action !";
    this.snackBar.open(message, "OK", {
      duration: 5000,
      verticalPosition: "top",
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(tap((_) => this.router.navigate(["/login"])))
      .subscribe();
  }
}
