import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // 讓網頁的預設會跳轉到 /login 登入頁面
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },

  // 登入頁面的路由
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },

  // tabs 頁面的路由
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "add",
    loadChildren: () => import("./add/add.module").then((m) => m.AddPageModule),
  },
  {
    path: "revise/:id",
    loadChildren: () =>
      import("./revise/revise.module").then((m) => m.RevisePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
