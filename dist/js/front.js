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

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        // iPad or iPhone
        document.querySelector("html").classList.add("ios");
    }

    window.onload = function(){
        headsiblingsLayer();
    }
}

function resizeLayout(){
    var d_minsc = document.querySelector(".d_minsc");
    var bottom_app_layer = document.querySelector(".bottom_app_layer");

    action();
    window.addEventListener("resize", function () {
        action();
    }, false);

    function action(){
        var bottom_app_layer_height = bottom_app_layer !== null ? bottom_app_layer.clientHeight : 0;
        d_minsc.removeAttribute("style");
        if (!document.querySelector('html').classList.contains('ios')){
            d_minsc.style.paddingBottom = bottom_app_layer_height+"px";
        }else{
            d_minsc.style.paddingBottom = "calc(env(safe-area-inset-bottom) + "+bottom_app_layer_height+"px)";
        }
    }
}


function TabFunc(option){
    this.tabtarget = document.querySelectorAll(option.tab);
    if (this.tabtarget.length) {
        for (var i = 0; i < this.tabtarget.length; i++) {
            var togis = false;
            this.tabtarget[i].addEventListener("click", function (e) {
                e.preventDefault();
                var t_t = this;
                var t_n = siblings(t_t);
                var cont_target = document.querySelector(t_t.getAttribute("href"));
                var cont_target_not = siblings(cont_target);
                for (var i = 0; i < t_n.length; i++){
                    t_n[i].classList.remove("active");
                }
                t_t.classList.toggle("active");
                for (var i = 0; i < cont_target_not.length; i++){
                    cont_target_not[i].classList.remove("active");
                }
                cont_target.classList.toggle("active");
            }, false);
        }
    }

}

function headsiblingsLayer(){
    var subheaderlayer = document.querySelector(".sub_header");
    var subheaderlayer_height = subheaderlayer !== null ? subheaderlayer.clientHeight : 0;
    var hsibilngs_fixed = document.querySelector(".hsibilngs_fixed");
    var hsibilngs_fixed_height = hsibilngs_fixed !== null ? hsibilngs_fixed.clientHeight : 0;
    var sub_content = document.querySelector(".sub_content");

    window.addEventListener("resize",function(){
        action();
    },false);
    action();

    function action(){
        sub_content.removeAttribute("style");
        sub_content.style.paddingTop = subheaderlayer_height + hsibilngs_fixed_height + "px";
    }
}

function siblings(t) {
    var children = t.parentElement.children;
    var tempArr = [];
    for (var i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
    }
    return tempArr.filter(function (e) {
        return e != t;
    });
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
    this.modalparent = document.createElement('div');
    this.pagewrap.appendChild(this.modalparent);
    this.modalparent.classList.add("design_modal_insert_wrap");
    this.modalparent.innerHTML = innerPublish;
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
    this.domBody.style.marginTop = -window.pageYOffset+"px";
    this.domHtml.classList.add("touchDis");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");
    this.bindEvent(option);
}
DesignModal.prototype.removeHide = function () {
    document.querySelector(".design_modal_insert_wrap").remove();
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
    this.btn_popupsubmit_td = null;
    this.btn_popupsubmit_td_height = 0;
    this.btn_closeTrigger = null;
    this.bg_design_popup = null;
    this.btn_popupsubmit_wrap_height = 0;
    this.design_popup_content_wrap = null;
    this.design_popup_td = null;
    this.scrollValue = 0;
    this.design_popup_content = null;
    this.dbot_titlow = null;
    this.dbot_titlow_height = 0;
    this.dbot_contlow = null;
    this.design_popup_content_top = 0;
    this.btn_dbotclose = null;
    this.popupShow(option.selector);
}

DesignPopup.prototype.popupShow = function (target) {
    if (target !== undefined) {
        this.domBody.setAttribute("data-scr", window.pageYOffset);
        this.domBody.style.marginTop = -window.pageYOffset+"px";
        this.scrollValue = window.pageYOffset;
        this.domHtml.classList.add("touchDis");

        this.selector = document.querySelector(target);
        this.selector.classList.add("active");
        this.design_popup_content_wrap = this.selector.querySelector(".design_popup_content_wrap");
        this.design_popup_content = this.selector.querySelector(".design_popup_content");
        this.btn_popupsubmit_wrap = this.selector.querySelector(".btn_popupsubmit_wrap");
        this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
        this.design_popup_td = this.selector.querySelector(".design_popup_td");
        this.btn_dbotclose = this.selector.querySelector(".btn_dbotclose");
        this.dbot_titlow = this.selector.querySelector(".dbot_titlow");
        this.dbot_contlow = this.selector.querySelector(".dbot_contlow");
        this.dbot_titlow_height = this.dbot_titlow !== null ? parseInt(getComputedStyle(this.dbot_titlow).height) : 0;
        this.design_popup_content_top = this.design_popup_content !== null ? parseInt(getComputedStyle(this.design_popup_td).paddingTop) : 0;
        this.btn_popupsubmit_wrap_height = this.btn_popupsubmit_wrap !== null ? this.btn_popupsubmit_wrap.getBoundingClientRect().height : 0;
        if (this.dbot_contlow !== null){
            //this.dbot_contlow.style.maxHeight = "calc(90vh - " + this.dbot_titlow_height + "px)";
            this.dbot_contlow.style.maxHeight = (window.innerHeight * 0.9 - this.dbot_titlow_height)+"px";
        }
        if (this.design_popup_content_wrap !== null){
            this.design_popup_content_wrap.style.maxHeight = (window.innerHeight - this.btn_popupsubmit_wrap_height - (this.design_popup_content_top * 2)) + "px";
        }
        this.bg_design_popup = this.selector.querySelector(".bg_design_popup");
        this.pagewrap.append(this.selector);
        this.bindEvent(this.selector);
    }
}
DesignPopup.prototype.popupHide = function (target) {
    var objThis = this;
    if (target !== undefined) {
        if (typeof target =="object"){
            this.selector = target;
        }else{
            this.selector = document.querySelector(target);
        }
        this.selector.classList.remove("active");
    }
    this.design_popup_wrap_active = document.querySelectorAll(".design_popup_wrap.active");
    if (this.design_popup_wrap_active.length==0){
        this.domHtml.classList.remove("touchDis");
        this.domBody.style.marginTop = 0;
        window.scrollTo(0, parseInt(this.domBody.getAttribute("data-scr")));
    }
}

DesignPopup.prototype.bindEvent = function () {
    var objThis = this;

    if (this.btn_closeTrigger.length) {
        for (var i = 0; i < this.btn_closeTrigger.length; i++) {
            this.btn_closeTrigger[i].addEventListener("click", function () {
                objThis.popupHide(objThis.selector);
            }, false);
        }
    }

    if (this.bg_design_popup !== null){
        this.bg_design_popup.addEventListener("click", function () {
            objThis.popupHide(objThis.selector);
        }, false);
    }

    if (this.btn_dbotclose !== null){
        this.btn_dbotclose.addEventListener("click", function () {
            objThis.popupHide(objThis.selector);
        }, false);
    }

    window.addEventListener("resize", function () {
        objThis.dbot_titlow_height = objThis.dbot_titlow !== null ? parseInt(getComputedStyle(objThis.dbot_titlow).height) : 0;
        if (objThis.dbot_contlow !== null) {
            objThis.dbot_contlow.style.maxHeight = (window.innerHeight * 0.9 - objThis.dbot_titlow_height) + "px";
        }
        if (objThis.design_popup_content_wrap !== null) {
            objThis.design_popup_content_wrap.style.maxHeight = (window.innerHeight - objThis.btn_popupsubmit_wrap_height - (objThis.design_popup_content_top * 2)) + "px";
        }
    }, false);
};