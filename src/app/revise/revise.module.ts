import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RevisePageRoutingModule } from "./revise-routing.module";
import { RevisePage } from "./revise.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RevisePageRoutingModule],
  declarations: [RevisePage],
})
export class RevisePageModule {}
