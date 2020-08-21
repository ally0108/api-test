import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { Tab1Page } from "src/app/tab1/tab1.page";

@Component({
  selector: "app-revise",
  templateUrl: "./revise.page.html",
  styleUrls: ["./revise.page.scss"],
})
export class RevisePage implements OnInit {
  id = "";
  title = "";
  description = "";
  creator = "";
  createTime = "";
  lastEditor = null;
  lastEditTime = null;
  data = null;
  detail = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private tab1Function: Tab1Page
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.initialize();
  }

  async initialize() {
    try {
      const response = await this.tab1Function.getAllNotificationsFromApi();
      this.data = response["data"];
      this.data.forEach((item) => {
        if (item["id"] === Number(this.id)) {
          this.data = item;
        }
      });

      this.title = this.data.title;
      this.description = this.data.description;
      this.creator = this.data.creator.name;
      this.createTime = this.data.created_at;
      if (this.data.updated_at !== this.data.created_at) {
        this.lastEditor = this.data.last_edited_by_user.name;
        this.lastEditTime = this.data.updated_at;
      }
      console.log(this.data);
    } catch (error) {
      console.error(error);
    }
  }

  async submit() {
    const response = await this.reviseNotificationFromApi(
      this.id,
      this.title,
      this.description
    );
  }

  async reviseNotificationFromApi(id, title, description) {
    const url = "https://api.cocoing.info/admin/notifications";
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
    });
    const body = {
      id: id,
      title: title,
      description: description,
    };

    const response = await this.http
      .patch<Response>(url, body, { headers: reqHeader })
      .subscribe(
        (data) => {
          this.presentAlert();
          this.navCtrl.navigateForward("/tabs/tab1");
        },
        (error) => {
          console.error(error);
          catchError(this.tab1Function.handleError);
          this.presentReviseUnsuccess();
        }
      );
    return response;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: "Modify completed!",
      buttons: ["OK"],
    });

    alert.present();
  }

  async presentReviseUnsuccess() {
    const alert = await this.alertCtrl.create({
      header: "Modify failed.",
      buttons: ["OK"],
    });

    alert.present();
  }
}
