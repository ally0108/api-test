Ionic HTTP Demo
===

ionic http 範例

Setup
---

* 將專案透過 git clone 下載、或是直接下載 zip 壓縮檔
* 在專案根目錄中執行 `npm install` 將所需要的套件安裝起來
* 接著透過 `ionic serve` 即可觀看執行結果

step by step
---

透過 Angular HTTP，來呼叫後端的 api

P.S. 可以透過 git graph (https://gitlab.com/cocoing.info/ionic-http-demo/-/network/master) 來查看更詳細的內容

1. 在 AppModule 裡面，引入 HttpClientModule
2. 在 constructor 裡面注入 HttpClient
3. 撰寫呼叫 api 的程式碼
4. 過程中如果發生錯誤，需要另外進行的錯誤處
5. 將資料顯示到畫面上

查看正式機 (cocoing.info) api 文件的方法
---

1. 先到 https://cocoing.info 註冊一個帳號
2. 接著到後台登入頁面 https://api.cocoing.info/d/login 輸入剛剛註冊的帳號密碼
3. 成功登入後台後，就可以到 api 文件頁面 https://api.cocoing.info/doc 查看文件

> 如果在步驟 3 開啟 api 文件頁面 https://api.cocoing.info/doc 看到的是 404 not found
> 可能是因為步驟 2 沒有登入成功

作業說明
---

實做一個可以管理 (檢視、新增、編輯、刪除) notification 的後台

* 主要頁面 (可以參考此專案的 **tab1 頁面**)
    * 在主要頁面初始化時，透過呼叫 `取得所有 notification 的列表` api (https://api.cocoing.info/doc#get-all-notification-items) 來載入資料
    * 如果後端回應取得列表成功，就將資料以清單的方式呈現 (資料的呈現方式可以參考 todo list)，而清單中每一個的項目就是一筆 notification 的資料
    * 如果後端回應取得列表失敗，則使用 ionic alert 顯示「發生錯誤」的提示訊息，並且在畫面上顯示一個「重新載入」的按鈕，點擊後可以再一次呼叫 `取得所有 notification 的列表` api
* 新增頁面
    * 在主要頁面的任何地方，寫一個「新增按鈕」，從主頁面點擊這個按鈕之後，便可以進入新增 notification 的頁面
    * 畫面上需要顯示兩個資料欄位供管理員填寫，分別是 title 與 description
        * title 可以用 `ion-input` 元件 (https://ionicframework.com/docs/api/input) 顯示在畫面上；title 在新增的頁面上是必填欄位，不可留空
        * description 可以用 `ion-textarea` 元件 (https://ionicframework.com/docs/api/textarea) 顯示在畫面上；description 在新增的頁面上是必填欄位，不可留空
    * 新增頁面上要有一個「送出按鈕」，按下該按鈕後：
        * 透過呼叫 `新增 notification` 的 api (https://api.cocoing.info/doc#create-new-notification-item) ，將資料新增到後端資料庫
        * 如果後端回應新增成功，則使用 ionic alert 顯示「新增成功」的提示訊息，再 **跳轉回到主要頁面上，而在回到主要頁面後，要能顯示出剛剛新增的那筆 notification 資料**
        * 如果後端回應新增失敗，則使用 ionic alert 顯示「新增失敗」的提示訊息，並且 **頁面保持停留在新增頁面**、不要跳轉回主要頁面
* 編輯頁面
    * 可以透過點擊主要頁面中清單上的項目，進入編輯該 notification 的頁面
    * 跟新增頁面相同，畫面上需要顯示 title 跟 description 這兩個資料欄位供管理員填寫
        * title 可以用 `ion-input` 元件 (https://ionicframework.com/docs/api/input) 顯示在畫面上；title 在編輯的頁面上是非必填欄位，可以留空不填
        * description 可以用 `ion-textarea` 元件 (https://ionicframework.com/docs/api/textarea) 顯示在畫面上；description 在編輯的頁面上是非必填欄位，可以留空不填
    * 編輯頁面上要有一個「送出按鈕」，按下該按鈕後：
        * 呼叫 `根據 id 更新對應 notification 中的資料` 的 api (https://api.cocoing.info/doc#update-notification)
        * 如果後端回應更新成功，則使用 ionic alert 顯示「更新成功」的提示訊息，再 **跳轉回到主要頁面上，而在回到主要頁面後，清單上該項目的資料要顯示成更新後的 title 跟 description**
        * 如果後端回應更新失敗，則使用 ionic alert 顯示「更新失敗」的提示訊息，並且 **頁面保持停留在新增頁面**、不要跳轉回主要頁面
* 刪除按鈕
    * 在主要頁面上用來顯示所有通知訊息的清單中，每一個項目上都有一個自己的刪除按鈕
    * 當「刪除按鈕」被點擊後
        * 透過呼叫 `刪除對應 id 的 notification` 的 api (https://api.cocoing.info/doc#delete-notification-by-given-id)
        * 如果後端回應刪除成功，就使用 ionic alert 顯示「刪除成功」的提示訊息，並且該 notification 從主要畫面中的清單中移除
        * 如果後端回應刪除失敗，則使用 ionic alert 顯示「刪除失敗」的提示訊息，並且 **不要將該 notification 從主要畫面中的清單中移除**

* 送出通知訊息按鈕
    * 在主要頁面上用來顯示所有通知訊息的清單中，每一個項目上都有一個自己的送出通知訊息按鈕
        * **只有該訊息的建立者與登入的使用者相同時，才顯示送出通知訊息按鈕**
    * 當「送出通知訊息按鈕」被點擊後
        * 透過呼叫 `送出對應 id 的 notification` 的 api (https://api.cocoing.info/doc#send-notification-by-given-id)
        * 如果後端回應送出成功，就使用 ionic alert 顯示「送出成功」的提示訊息
            * 這個時候拿起自己的手機檢查是否有成功收到通知訊息
        * 如果後端回應送出失敗，則使用 ionic alert 顯示「送出失敗」的提示訊息

如果對於作業描述或是實做過程中有遇到任何問題，都歡迎直接在群組上面發問，預祝大家作業順利XD
