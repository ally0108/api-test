import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { Tab1Page } from "src/app/tab1/tab1.page";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage {
  title = "";
  description = "";

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private tab1Function: Tab1Page
  ) {}

  async submit() {
    const response = await this.creatNewNotificationFromApi(
      this.title,
      this.description
    );
  }

  async creatNewNotificationFromApi(title, description) {
    const url = "https://api.cocoing.info/admin/notifications";
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
    });
    const body = {
      title: title,
      description: description,
    };

    const response = await this.http
      .post<Response>(url, body, { headers: reqHeader })
      .subscribe(
        (data) => {
          this.presentAlert();
          this.navCtrl.navigateForward("/tabs/tab1");
        },
        (error) => {
          console.error(error);
          catchError(this.tab1Function.handleError);
          this.presentAddUnsuccess();
        }
      );
    return response;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: "Item added successfully!",
      buttons: ["OK"],
    });

    alert.present();
  }

  async presentAddUnsuccess() {
    const alert = await this.alertCtrl.create({
      header: "Add failed.",
      buttons: ["OK"],
    });

    alert.present();
  }
}
