import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./user/auth.guard";

const routes: Routes = [
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: "**",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        m => m.PageNotFoundModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
