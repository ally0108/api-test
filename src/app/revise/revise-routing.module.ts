import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RevisePage } from "./revise.page";

const routes: Routes = [
  {
    path: "",
    component: RevisePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisePageRoutingModule {}
