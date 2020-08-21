import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  email = "";
  password = "";
  accessToken = "";

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private http: HttpClient
  ) {}

  async submit() {
    const url = "https://api.cocoing.info/v1/login";

    const body = {
      email: this.email,
      password: this.password,
    };

    try {
      const response = await this.http.post(url, body).toPromise();
      console.log(response);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response["data"]["token"]["access_token"])
      );
      this.accessToken = JSON.parse(localStorage.getItem("accessToken"));
      localStorage.setItem(
        "userId",
        JSON.stringify(response["data"]["user"]["id"])
      );

      //console.log(this.accessToken); 測試有沒有存到
      //alert('Hello,'+response["data"]["user"]["name"],);/////改好看的!!
      return this.navController.navigateForward("/tabs");
    } catch (error) {
      this.presentLoginFailedAlert();
    }
  }

  async presentLoginFailedAlert() {
    const alert = await this.alertController.create({
      header: "Wrong email or password",
      message: "please try again",
      buttons: ["OK"],
    });

    alert.present();
  }
}
