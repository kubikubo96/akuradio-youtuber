

var sYB = 'www.youtube.com';
var sAc = 'accounts.google.com';
var sLinkLogin = 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dvi%26next%3D%252F&amp%3Bhl=vi&amp%3Bpassive=false&amp%3Bservice=youtube&amp%3Builel=0&flowName=GlifWebSignIn&flowEntry=AddSession';

// Do something clever here once data has been removed.
chrome.storage.sync.get("dataDefine", ({ dataDefine }) => {

  //chờ page load xong
  jQuery(document).ready(function ($) {

    setTimeout(function () {
      //lấy data từ background
      var accountUse = dataDefine.accounts[Math.floor(Math.random() * dataDefine.accounts.length)];
      var videoUse = dataDefine.videos[Math.floor(Math.random() * dataDefine.videos.length)];
      console.log(dataDefine);
      console.log(videoUse);
      console.log(accountUse);

      jQuery(document).ready(function ($) {
        //đăng nhập google
        auToLoginAccount(accountUse.sEmail, accountUse.sPassWord, accountUse.sEmailRecovery);

        //tìm video theo name
        jQuery(document).ready(function ($) {
          setTimeout(function () {
            var checkSearch = getUrlParameter('search_query');
            var defaultSearch = $('input#search').val();
            if (!checkSearch && !defaultSearch.trim()) {
              autoSearchData(videoUse.name);
            }
          }, 3000);
        });

        //tìm video theo id
        jQuery(document).ready(function ($) {
          setTimeout(function () {
            var checkSearch = getUrlParameter('search_query');
            var defaultSearch = $('input#search').val();
            console.log("checkSearch:" + checkSearch);
            console.log("defaultSearch:" + defaultSearch);
            if (checkSearch && defaultSearch.trim()) {
              autoFindVideo(videoUse.id);
            }
          }, 3000);
        });
      });
    }, 3000);
  });
});


//search data
function autoSearchData(sTtitle) {
  $('p.extension-show-info').remove();
  var sHtml = '<p class="extension-show-info">Đang lấy video để xem...</p>';
  $(sHtml).appendTo('body');

  $('#search-form input#search').val('');

  $('p.extension-show-info').remove();
  var sHtml = '<p class="extension-show-info">Từ khóa tìm kiếm: ' + sTtitle + '</p>';
  $(sHtml).appendTo('body');

  if ($('#search-form input#search').length) {
    $('#search-form input#search').bind('autotyped', function () {
      setTimeout(function () {
        $("#search-icon-legacy").click();
      }, randomIntFromRange(800, 2200));
    }).autotype(sTtitle, { delay: randomIntFromRange(80, 200) });
  }

  setTimeout(function () {

  }, 65000);
}


//find videos
function autoFindVideo(sVideoID = '') {
  var checkSearch = getUrlParameter('search_query');
  if (checkSearch) {
    var sTitle = $('#search-form input#search').val();
    console.log(checkSearch);
    console.log(sTitle);
    console.log($("#contents a.ytd-thumbnail").length);
    if ($("#contents a.ytd-thumbnail").length && sTitle != '') {
      var nDuration = 300;

      if (sVideoID) {
        $('p.extension-show-info').remove();
        var sHtml = '<p class="extension-show-info">Đang tìm Video có ID: ' + sVideoID + '</p>';
        $(sHtml).appendTo('body');

        autoScrollBrowser();

        setTimeout(function () {
          var check = false;
          $("#contents a.ytd-thumbnail").each(function (i, obj) {
            if ($(this).attr('href') != undefined) {
              var idVideoGet = youtube_parser($(this).attr('href'));
              if (idVideoGet != false && idVideoGet == sVideoID) {
                check = true;

                $(this).find('.no-transition').click();

                viewXem(parseInt(nDuration) + parseInt(randomIntFromRange(10, 50)));

                return false;
              }
            }
          });

          setTimeout(function () {
            if (check == false) {
              window.location.href = 'https://' + sYB;
            }
          }, 1500);
        }, randomIntFromRange(12000, 18000));
      } else {
        window.location.href = 'https://' + sYB;
      }
    } else {
      window.location.href = 'https://' + sYB;
    }
  }
}

//Login account
function auToLoginAccount(sEmail = '', sPassWord = '', sEmailRecovery = '') {
  var flagCheck = false;

  $('p.extension-show-info').remove();
  var sHtml = '<p class="extension-show-info">' +
    '- Email: ' + sEmail + '<br>' +
    '- Mật Khẩu: ' + sPassWord + '<br>' +
    '- Email Khôi Phục: ' + sEmailRecovery +
    '</p>';
  $(sHtml).appendTo('body');

  var sUrlFull = window.location.href;

  var checkLinkCurrent = sUrlFull.split('?continue=');
  if (checkLinkCurrent.length == 2) {
    checkLinkCurrent = checkLinkCurrent[0];
  } else {
    checkLinkCurrent = '';
  }

  setTimeout(function () {
    //Email Disabled
    var nCheck = sUrlFull.split("/disabled/").length;
    if (nCheck == 2) {
      flagCheck = true;
    }

    //UserName
    var checkLink = sUrlFull.split('/identifier');
    if (checkLink.length == 2) {
      flagCheck = true;

      $('p.extension-show-info').remove();
      var sHtml = '<p class="extension-show-info">- Email: ' + sEmail + '</p>';
      $(sHtml).appendTo('body');

      if ($("input[type=email]").length) {
        $("input[type=email]").click();
        $("input[type=email]").val(sEmail);
      } else {
        $(".CxRgyd > div > .d2CFce input.whsOnd").click();
        $(".CxRgyd > div > .d2CFce input.whsOnd").val(sEmail);
      }

      setTimeout(function () {
        $(".qhFLie .U26fgb").click(); //BTN Tiep theo
        $("button.VfPpkd-LgbsSe").click(); //BTN Tiep theo

        auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

        return false;
      }, randomIntFromRange(2000, 3000));
    }

    //Password
    var checkLink = sUrlFull.split('/challenge/pwd');
    if (checkLink.length == 2) {
      flagCheck = true;

      $('p.extension-show-info').remove();
      var sHtml = '<p class="extension-show-info">- Mật Khẩu: ' + sPassWord + '</p>';
      $(sHtml).appendTo('body');

      if ($("input[type=password]").length) {
        $("input[type=password]").click();
        $("input[type=password]").val(sPassWord);
      } else {
        $(".SdBahf input.whsOnd").click();
        $(".SdBahf input.whsOnd").val(sPassWord);
      }

      setTimeout(function () {
        $(".qhFLie .U26fgb").click(); //BTN Tiep theo
        $(".qhFLie button.VfPpkd-LgbsSe").click(); //BTN Tiep theo

        auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

        return false;
      }, randomIntFromRange(2000, 3000));
    }

    //Chon nut: xac nhan email khoi phuc cua bạn
    var checkLink = sUrlFull.split('/challenge/selection');
    if (checkLink.length == 2) {
      flagCheck = true;

      $(".OVnw0d .JDAKTe .lCoei").each(function (index) {
        if ($(this).attr('data-challengetype') == 12) {
          $(this).click();

          auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

          return false;
        }
      });
    }

    //Email khoi phuc
    var checkLink = sUrlFull.split('/challenge/kpe');
    if (checkLink.length == 2) {
      flagCheck = true;

      $('p.extension-show-info').remove();
      var sHtml = '<p class="extension-show-info">- Email khôi phục: ' + sEmailRecovery + '</p>';
      $(sHtml).appendTo('body');

      if ($("input[type=email]").length) {
        $("input[type=email]").click();
        $("input[type=email]").val(sEmailRecovery);
      } else {
        $(".Xb9hP .whsOnd").val(sEmailRecovery);
      }

      setTimeout(function () {
        $(".zQJV3 .qhFLie .U26fgb").click(); //BTN Tiep theo
        $(".qhFLie button.VfPpkd-LgbsSe").click(); //BTN Tiep theo

        auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

        return false;
      }, randomIntFromRange(2000, 3000));
    }

    if (flagCheck == false && !sUrlFull.includes("youtube")) {
      window.location.href = sLinkLogin;
    }
  }, randomIntFromRange(3000, 4500));
}

function auToLoginAccountChange(sEmail = '', sPassWord = '', sEmailRecovery = '', checkLinkCurrent = '') {
  var nTimeChangeAccount = 0;

  $('p.extension-show-info error').remove();
  var sHtml = '<p class="extension-show-info error">Đang đợi chuyển hướng trang đăng nhập: <span id="extension-clock">' + nTimeChangeAccount + '</span>s</p>';
  $(sHtml).appendTo('body');

  var sTimeChange = setInterval(function () {
    nTimeChangeAccount++;

    $("#extension-clock").html(nTimeChangeAccount);

    if (nTimeChangeAccount >= 20) {
      clearInterval(sTimeChange);

      window.location.href = sLinkLogin;
    } else {
      var sUrlFull = window.location.href;

      var checkLinkCurrentTemp = sUrlFull.split('?continue=');
      if (checkLinkCurrentTemp.length == 2) {
        checkLinkCurrentTemp = checkLinkCurrentTemp[0];
      } else {
        checkLinkCurrentTemp = '';
      }

      if (checkLinkCurrent != checkLinkCurrentTemp) {
        clearInterval(sTimeChange);

        $('p.extension-show-info.error').remove();

        auToLoginAccount(sEmail, sPassWord, sEmailRecovery);
      }
    }
  }, 1000);
}

//view videos
function viewXem(nDuration = ''){
  setTimeout(function(){
    chrome.storage.sync.get('config', function (result) {
        var initConfig = result.config;

        var nView = initConfig.views;

        if(nView < 4){ 
            var flag        = false;
            var aDataVideo  = '';
            var sVideoID    = youtube_parser(window.location.href);
            var nTimeSub    = 70;

            //Xem Video Lan 2 trở đi
            if(nDuration == ''){
                if(sVideoID != false && sVideoID != ''){
                    var date        = new Date();
                    var seconds     = Math.round(date.getTime() / 1000);
                    var sTimeData   = seconds.toString();
                    document.title  = sTimeData;

                    chrome.runtime.sendMessage({
                        task        : "getInfoVideoDetail",
                        time        : sTimeData,
                        videoID     : sVideoID
                    });

                    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                        if(message.task == "getInfoVideoDetailResult"){
                            if(message.status == 'success') {
                                aDataVideo = message.data;
                                flag = true;
                            }

                            if(message.status == 'error') {
                                window.location.href = sYB;
                            }
                        }
                    });
                }else{
                    window.location.href = sYB;
                }
            }else{
                //Xem Video Lan 1
                if(initConfig.account != ''){
                    if(initConfig.auto_like == 'yes'){
                        autoLike();
                    }

                    if(initConfig.auto_subscribe == 'yes'){
                        if(sVideoID != false && sVideoID != ''){
                            $.each(initConfig.data, function (key, val) {
                                if(val.videoID == sVideoID){
                                    nTimeSub = val.timeSub;
                                }
                            });
                        }

                        setTimeout(function(){
                            autoSubscribe(nTimeSub);
                        }, 2500);
                    }

                    setTimeout(function(){
                        getComment();
                    }, randomIntFromRange(60000,130000));
                }
            }

            //Play Video
            setTimeout(function(){
                var aLabel = ['Phát (k)', 'Play (k)'];
                var sLabel = $("button.ytp-play-button").attr("aria-label");

                $(aLabel).each(function(key, value) {
                    if(value == sLabel){
                        $("button.ytp-play-button").click();
                    }
                });
            }, randomIntFromRange(6000, 10500));

            setTimeout(function(){
                if(flag == true){
                    nDuration = 0;
                    if(typeof aDataVideo.time != 'undefined' || aDataVideo.time != undefined){
                        nDuration = aDataVideo.time;

                        if(initConfig.account != ''){
                            if(initConfig.auto_subscribe == 'yes'){
                                if(aDataVideo.time_sub > 0){
                                    nTimeSub = aDataVideo.time_sub;
                                }
                                autoSubscribe(nTimeSub);
                            }

                            if(initConfig.auto_like == 'yes'){
                                autoLike();
                            }

                            if(aDataVideo.comment != ''){
                                setTimeout(function(){
                                    autoComment(aDataVideo.comment);
                                }, randomIntFromRange(60000,130000));
                            }
                        }
                    }
                }

                autoScrollBrowser();

                if(nDuration > 0){
                }else{
                    window.location.href = sYB;
                }

                $('p.extension-show-info').remove();
                var sHtml = '<p class="extension-show-info viewvideo">Đang xem video lần thứ '+nView+': <span id="extension-clock">'+nDuration+'</span>s</p>';
                $(sHtml).appendTo('body');

                var sTime = setInterval(function() {
                    nDuration--;

                    if(nDuration >= 0) {
                        $("#extension-clock").html(nDuration);
                    }

                    if(nDuration == 20){
                        nDuration = 0;
                        clearInterval(sTime);

                        var iView = nView + 1;
                        if(iView >= 4){
                            initConfig.views = 1;
                            chrome.storage.sync.set({
                                config: initConfig
                            });

                            window.location.href = sYB;
                        }else{
                            initConfig.views = iView;
                            chrome.storage.sync.set({
                                config: initConfig
                            });

                            $('p.extension-show-info').remove();
                            var sHtml = '<p class="extension-show-info">Đang tìm video lần '+iView+'</p>';
                            $(sHtml).appendTo('body');

                            var aVideoID    = '';
                            var date        = new Date();
                            var seconds     = Math.round(date.getTime() / 1000);
                            var sTimeData   = seconds.toString();
                            document.title  = sTimeData;

                            chrome.runtime.sendMessage({
                                task        : "getInfoVideo",
                                time        : sTimeData,
                                videoID     : sVideoID
                            });

                            chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                                if(message.task == "getInfoVideoResult"){
                                    if(message.status == 'success') {
                                        aVideoID = message.data;
                                    }
                                }
                            });

                            setTimeout(function(){
                                if(aVideoID == ''){
                                    initConfig.views = 1;
                                    chrome.storage.sync.set({
                                        config: initConfig
                                    });

                                    window.location.href = sYB;
                                }else{
                                    var flagCheck = false;
                                    $("#related ytd-watch-next-secondary-results-renderer .ytd-watch-next-secondary-results-renderer #thumbnail").each(function() {
                                        var idVideo = youtube_parser($(this).attr('href'));
                                        if(idVideo != false && idVideo != sVideoID){
                                            if($.inArray(idVideo, aVideoID) !== -1){
                                                flagCheck = true;

                                                $(this)[0].click();

                                                viewXem();

                                                return false;
                                            }
                                        }
                                    });

                                    setTimeout(function(){
                                        if(flagCheck == false){
                                            initConfig.views = 1;
                                            chrome.storage.sync.set({
                                                config: initConfig
                                            });

                                            window.location.href = sYB;
                                        }
                                    }, 10000);
                                }
                            }, 3700);
                        }
                    }
                }, 1000);
            }, 5000);
        }else{
            initConfig.views = 1;
            chrome.storage.sync.set({
                config: initConfig
            });

            window.location.href = sYB;
        }
    });
}, 2500);
}


//auto subscrible
function autoSubscribe(timeSub = 70) {
  var timeSub = parseInt(timeSub) + randomIntFromRange(0,60);
  var attr = $("#meta-contents #subscribe-button #notification-preference-button").attr('hidden');
  if (typeof attr !== typeof undefined && attr !== false) {
      //Chua dang ky
      setTimeout(function(){
          $("#meta-contents #subscribe-button tp-yt-paper-button.style-scope").click();
          setTimeout(function(){
              $("#meta-contents #subscribe-button a.ytd-subscription-notification-toggle-button-renderer yt-icon-button#button").click();
              setTimeout(function(){
                  $("#items .ytd-menu-popup-renderer:nth-child(1)").click();
              }, randomIntFromRange(2000, 4000));
          }, randomIntFromRange(2000, 4000));
      }, timeSub);
  }else{
      //Da dang ky
  }
}

//Auto Comment
function getComment() {
  var sVideo = youtube_parser(window.location.href);
  if(sVideo != false){
      if($("#header #placeholder-area").length){
          $("#header #placeholder-area").click();
          setTimeout(function(){
              var date = new Date();
              var seconds = Math.round(date.getTime() / 1000);
              var sTime   = seconds.toString();
              document.title = sTime;

              chrome.runtime.sendMessage({
                  task        : "getDataCommentVideo",
                  time        : sTime,
                  video       : sVideo
              });

              chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                  if(message.task == "getDataVideoCommentResult"){
                      if(message.status == 'success'){
                          autoComment(message.data);
                      }
                  }
              });
          }, randomIntFromRange(1500,2500));
      }
  }
}

//Auto Comment
function autoComment(sComment){
  console.log("Start comment");
  if(sComment != ''){
      var sComment = sComment + random_item(['','.','..','...','!','!!','!!!']);

      $('p.extension-show-comment').remove();
      var sHtml = '<p class="extension-show-comment"><strong>Nội dung bình luận:</strong> '+sComment+'</p>';
      $(sHtml).appendTo('body');

      document.querySelector('#simplebox-placeholder').click();
      $("#comment-dialog #commentbox #contenteditable-root").html(sComment);

      $("#comment-dialog #commentbox .ytd-commentbox.style-primary").removeAttr('disabled');
      $("#comment-dialog #commentbox .ytd-commentbox.style-primary #button").attr('tabindex', 0);
      $("#comment-dialog #commentbox .ytd-commentbox.style-primary #button").attr('aria-disabled', false);
      $("#comment-dialog #commentbox .ytd-commentbox.style-primary #button").removeAttr('style');

      setTimeout(function(){
          $("#comment-dialog #commentbox #submit-button").click();
          $('p.extension-show-comment').remove();
      }, randomIntFromRange(800,2000));
  }
}

//auto Like
function autoLike() {
  if($("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer").length){
      setTimeout(function(){
          if($("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer.style-default-active").length){
              //Da like or Dislike
          }else{
              var check = random_item([1,2,1,1]);
              if(check == 1){
                  $("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer:nth-child(1) a")[0].click();
              }else{
                  $("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer:nth-child(2) a")[0].click();
              }
          }
      }, randomIntFromRange(18000,55000));
  }
}


//auto ScrollBrower
function autoScrollBrowser() {
  var nTimeScrollBottom = randomIntFromRange(7500,9000);
  var nTimeScrollTop    = randomIntFromRange(7500,9000);
  var nTimeTotal        = nTimeScrollBottom + nTimeScrollTop + randomIntFromRange(2000,6000);
  var iTemp = 0;
  var sTime = setInterval(function() {
      nTimeScrollBottom = randomIntFromRange(7500,9000);
      nTimeScrollTop    = randomIntFromRange(7500,9000);
      nTimeTotal        = nTimeScrollBottom + nTimeScrollTop + randomIntFromRange(2000,6000);

      var heightScroll = $(document).height() - randomIntFromRange(0,800);

      $('html, body').animate({scrollTop: heightScroll}, nTimeScrollBottom);

      if(iTemp == 0){
          $('html, body').animate({scrollTop:0}, nTimeScrollTop);
      }else{
          setTimeout(function(){
              $('html, body').animate({scrollTop:0}, nTimeScrollTop);
          }, nTimeScrollBottom);
      }

      if(iTemp >= 1){
          clearInterval(sTime)
      }

      iTemp++;

  }, nTimeTotal);
}

//Get Param url
function getUrlParameter(sParam, sUrl = '') {
  if(sUrl != ''){
      var sPageURL = sUrl;
  }else{
      var sPageURL = window.location.search.substring(1);
  }
  var sURLVariables = sPageURL.split('&');
  var sParameterName;
  var i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
};

//Get ID Video from url
function youtube_parser(url){
  if(url != '' && url != undefined){
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      if(match != undefined){
          return (match&&match[7].length==11)? match[7] : false;
      }
  }

  return false;
}

//Random Array
function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];
}

//Random range Minmax
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}