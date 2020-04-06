import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { SnackService } from "../services/snack.service";
import { User } from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  currentUser: User = null;
  constructor(afAuth: AngularFireAuth, private snack: SnackService) {
    afAuth.authState.subscribe((user) => (this.currentUser = user));
  }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = !!this.currentUser;
    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}
