import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  userId = JSON.parse(localStorage.getItem("userId"));
  url = "https://api.cocoing.info/admin/notifications";
  reqHeader = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
  });
  /**
   * 將 data$ 的初始值設成 null Observable (Observable 裡面的資料是 null)
   */
  data$ = of(null);
  accessToken = "";
  isLoad = false;

  // Step 2. 在 constructor 裡面注入 HttpClient
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((val) => this.initialize());
  }

  // Step 3. 撰寫呼叫 api 的程式碼
  ngOnInit() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    if (!accessToken) {
      console.error("你還沒有登入= =");

      this.navCtrl.navigateBack("/login");

      return;
    }
    this.accessToken = accessToken;
    this.initialize();
  }

  initialize() {
    try {
      this.data$ = this.getNotificationByObservable();
    } catch (error) {
      // Step 4. 過程中如果發生錯誤，需要另外進行的錯誤處理
      console.error(error);
      this.presentErrorAlert();
    }
  }

  /**
   * 使用 Observable 的寫法來發送 api
   */
  getNotificationByObservable() {
    const url = "https://api.cocoing.info/admin/notifications";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };

    return this.http.get<any>(url, httpOptions).pipe(
      // 延遲兩秒，讓等待畫面顯示久一點（Ｘ
      //delay(2000),

      // 透過 tap 來查看，轉換前的樣子
      tap((response) => console.log("before map():", response)),

      // 透過 map 運算，把 response 都轉換成 response.data
      // (換句話說就是只保留 response 中的 data)
      map((response) => response.data),

      // 透過 tap 來查看，轉換後的結果
      tap((response) => console.log("after map():", response))
    );
  }

  /**
   * 顯示取得資料失敗的錯誤訊息
   */
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: "Error",
      message: "Sorry, please try again.",
      buttons: [
        {
          text: "Reload",
          handler: (data) => {
            this.ngOnInit();
          },
        },
      ],
    });

    alert.present();
  }

  async send(index) {
    const response = await this.sendNotificationFromApi(index.id);
  }
  async sendNotificationFromApi(id) {
    const url = "https://api.cocoing.info/admin/notifications/send";
    const body = { id: id };
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    });

    const response = await this.http
      .post<Response>(url, body, { headers: reqHeader })
      .subscribe(
        (data) => {
          this.presentSuccessSent();
        },
        (error) => {
          console.error(error);
          catchError(this.handleError);
          this.presentUnsuccessSent();
        }
      );
    return response;
  }

  async delete(index) {
    try {
      const response = await this.deleteNotificationFromApi(index.id);
      this.initialize();
    } catch (error) {
      console.error(error);
      catchError(this.handleError);
    }
  }

  async deleteNotificationFromApi(id) {
    const url = "https://api.cocoing.info/admin/notifications";
    const body = { id: id };
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
      "X-HTTP-Method-Override": "delete",
    });

    const response = await this.http
      .post<Response>(url, body, { headers: reqHeader })
      .toPromise();
    return response;
  }

  logOut() {
    this.navCtrl.navigateForward("/login");
    localStorage.clear();
  }

  async presentSuccessSent() {
    const alert = await this.alertController.create({
      header: "Message sent successfully!",
      buttons: ["OK"],
    });

    alert.present();
  }

  async presentUnsuccessSent() {
    const alert = await this.alertController.create({
      header: "Send failed",
      buttons: ["OK"],
    });

    alert.present();
  }

  navigateToAdd() {
    this.navCtrl.navigateForward("/add");
  }

  navigateToRevise(index) {
    this.navCtrl.navigateForward(`/revise/${index.id}`);
  }
  /**
   * 從後端 api 取得所有 notification 的資料
   *
   * 並且將後端回應的原始資料直接顯示在畫面上
   */
  async getAllNotificationsFromApi() {
    const url = "https://api.cocoing.info/admin/notifications";
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
    });

    // 這邊只是因為偷懶用了 any，還是要養成好習慣不要隨便用 any XDrz
    // 將後端拿到的資料儲存在 local 變數中
    const response = await this.http
      .get<any>(url, { headers: reqHeader })
      .toPromise();

    return response;
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // "前端本身" or "沒連上網路" 而產生的錯誤
      console.error("An error occurred:", error.error.message);
    } else {
      // 後端回傳的錯誤訊息，error.error 之中會有為何失敗的原因
      console.error(`HTTP status code ${error.status}, reason:`, error.error);
    }
    // 最後的回傳值的型別應為 observable
    return throwError("Something bad happened; please try again later.");
  };
}
