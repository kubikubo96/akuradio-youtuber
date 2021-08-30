//background chạy nền

//account
var accounts = [
  { sEmail: "kubikubo01@gmail.com", sPassWord: "Nghean01!", sEmailRecovery: "thangxthangno1@gmail.com" },
  { sEmail: "kubikubo02@gmail.com", sPassWord: "Nghean01!", sEmailRecovery: "thangxthangno1@gmail.com" }
];

//data video
var videos = [
  { id: "AewnWKAqa9w", name: "Chàng Rể Vô Song - Tập 13 - (Chương 241 - 260) | Truyện Ngôn Tình Hay Nhất Của Akuradio" },
  { id: "AewnWKAqa9w", name: "Chàng Rể Vô Song - Tập 13 - (Chương 241 - 260) | Truyện Ngôn Tình Hay Nhất Của Akuradio" },
];

var dataDefine = {
  'videos': videos,
  'accounts': accounts,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ dataDefine });
});