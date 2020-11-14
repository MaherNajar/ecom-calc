import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full",
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then((m) => m.ProductsModule),
  },
  {
    path: "login",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
