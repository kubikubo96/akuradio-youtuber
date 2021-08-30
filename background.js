//background chạy nền

var webAnother = [
  'https://vnexpress.net/',
  'https://laodong.vn/',
  'https://baomoi.com/',
  'https://vietnamnet.vn/'
]

//account
var accounts = [
  { sEmail: "kubikubo01@gmail.com", sPassWord: "Nghean01!", sEmailRecovery: "tien.nguyentat.1@gmail.com" },
  { sEmail: "kubikubo02@gmail.com", sPassWord: "Nghean01!", sEmailRecovery: "thangxthangno1@gmail.com" }
];

//data video
var videos = [
  { id: "AewnWKAqa9w", name: "Chàng Rể Vô Song - Tập 13 - (Chương 241 - 260) | Truyện Ngôn Tình Hay Nhất Của Akuradio" },
  { id: "AewnWKAqa9w", name: "Chàng Rể Vô Song - Tập 13 - (Chương 241 - 260) | Truyện Ngôn Tình Hay Nhất Của Akuradio" },
];
var videosNum = videos.length - 1;

var dataDefine = {
  'website': webAnother,
  'videos': videos,
  'accounts': accounts,
  'videosNum': videosNum,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ dataDefine });
});