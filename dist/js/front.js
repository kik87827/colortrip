if (window.console == undefined) { console = { log: function () { } }; }

/** browser checker **/
var touchstart = "ontouchstart" in window;
var userAgent = navigator.userAgent.toLowerCase();

document.addEventListener("DOMContentLoaded", function () {
    commonInit();
});


function commonInit() {
    if (touchstart) {
        document.querySelector("html").classList.add("touchmode");
    } else {
        document.querySelector("html").classList.remove("touchmode");
    }

    if (userAgent.indexOf('samsung') > -1) {
        document.querySelector("html").classList.add("samsung");
    }
}


function DesignModal(option) {
    this.message = option.message;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.design_modal_wrap = null;
    this.btn_dmsmidentify = null;
    this.btn_dmsmcancel = null;
    this.duration = option.duration !== undefined ? option.duration : 400;

    this.initShow(option);
}

DesignModal.prototype.initShow = function (option) {
    var innerPublish = '';
    innerPublish += "<div class='design_modal_wrap'>";
    innerPublish += "  <div class='bg_design_modal'></div>";
    innerPublish += "  <div class='design_modal_tb'>";
    innerPublish += "      <div class='design_modal_td'>";
    innerPublish += "          <div class='design_modal'>";
    innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
    innerPublish += "              <div class='btn_dmsm_wrap'>";
    innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
    if (option.type === "confirm") {
        innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
    }
    innerPublish += "              </div>";
    innerPublish += "          </div>";
    innerPublish += "      </div>";
    innerPublish += "  </div>";
    innerPublish += "</div>";
    this.pagewrap.innerHTML = innerPublish;
    if (option.type === "confirm" || option.type === "alert") {
        this.design_modal_text = document.querySelector(".design_modal_text");
        this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
        this.design_modal_text.innerHTML = option.message;
    }
    if (option.type === "confirm") {
        this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
    }
    this.pagewrap.style.zIndex = 0;
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = window.pageYOffset;
    this.domHtml.classList.add("touchDis");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");
    this.bindEvent(option);
}
DesignModal.prototype.removeHide = function () {
    this.design_modal_wrap.remove();
    this.domHtml.classList.remove("touchDis");
    this.domBody.style.marginTop = 0;
    window.scrollTo(0, Number(this.domBody.getAttribute("data-scr")));
}
DesignModal.prototype.bindEvent = function (option) {
    var objThis = this;
    for (var i = 0; i < this.closetrigger.length; i++) {
        this.closetrigger[i].addEventListener("click", function () {
            objThis.removeHide();
        }, false);
    }
    if (this.btn_dmsmidentify !== null) {
        this.btn_dmsmidentify.addEventListener("click", function () {
            if (option.identify_callback !== undefined) {
                option.identify_callback();
            }
        }, false);
    }
    if (this.btn_dmsmcancel !== null) {
        this.btn_dmsmcancel.addEventListener("click", function () {
            if (option.cancel_callback !== undefined) {
                option.cancel_callback();
            }
        }, false);
    }
}


function DesignPopup(option) {
    this.selector = null;
    if (option.selector !== undefined) {
        this.selector = document.querySelector(option.selector);
    }
    this.design_popup_wrap = document.querySelectorAll(".design_popup_wrap");
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.btn_popupsubmit_wrap = null;
    this.btn_closeTrigger = null;
    this.btn_popupsubmit_wrap_height = 0;
    this.design_popup_content_wrap = null;
    this.popupShow(option.selector);
    this.bindEvent(option);
}

var dpprop = DesignPopup.prototype;
dpprop.popupShow = function (target) {
    if (target !== undefined) {
        for (var i = 0; i < this.design_popup_wrap.length; i++) {
            if (this.design_popup_wrap[i].classList.contains('active')) {
                this.popupHide(this.design_popup_wrap[i]);
            }
        }
        this.selector = document.querySelector(target);
        this.selector.classList.add("active");
        this.design_popup_content_wrap = this.selector.querySelector(".design_popup_content_wrap");
        this.btn_popupsubmit_wrap = this.selector.querySelector(".btn_popupsubmit_wrap");
        this.btn_popupsubmit_wrap_height = this.btn_popupsubmit_wrap !== null ? this.btn_popupsubmit_wrap.clientHeight : 0;
        this.design_popup_content_wrap.style.maxHeight = (window.innerHeight - this.btn_popupsubmit_wrap_height) + "px";
        this.pagewrap.append(this.selector);
    }
}
dpprop.popupHide = function (target) {
    var objThis = this;
    if (target !== undefined) {
        this.selector = target || document.querySelector(target);
        this.selector.classList.remove("active");
    }
    this.domHtml.classList.remove("touchDis");
    this.domBody.style.marginTop = 0;
    window.scrollTo(0, Number(this.domBody.getAttribute("data-scr")));
}
dpprop.bindEvent = function (option){
    var objThis = this;
    this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
    if (this.btn_closeTrigger.length){
        for (var i = 0; i < this.btn_closeTrigger.length; i++) {
            this.btn_closeTrigger[i].addEventListener("click", function () {
                objThis.popupHide(objThis.selector);
            }, false);
        }
    }
};