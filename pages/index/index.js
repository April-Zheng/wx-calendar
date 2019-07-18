//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },


    select(e) {
        console.log("select", e)
    },
    jumpToToday(e) {
        console.log("today", e)
    },
    jumpToNow(e) {
        console.log("now", e)
    },
    selectTime(e) {
        console.log("selectTime", e)
    },

    onLoad: function() {

    },

})