// components/calender/index.js
let preDaysLen = 0
let currentDaysLen = 0
let emptyDaysLen = 0
let currentMonth = null
let currentYear = null
let currentDay = null
let selectedYear = null
let selectedMonth = null
let selectedDay = null
Component({
    //初始默认为当前日期
    properties: {
        /**
         * 是否显示头部操作栏
         */
        header: {
            type: Boolean,
            value: true
        },
        /**
         * 是否上个月按钮
         */
        preMonth: {
            type: Boolean,
            value: true
        },
        /**
         * 是否下个月按钮
         */
        nextMonth: {
            type: Boolean,
            value: true
        },
        /**
         * 是否上一年按钮
         */
        preYear: {
            type: Boolean,
            value: false
        },
        /**
         * 是否下一年按钮
         */
        nextYear: {
            type: Boolean,
            value: false
        },
        /**
         * 是否显示今天按钮
         */
        today: {
            type: Boolean,
            value: false,
        },
        /**
         * 是否显示周标题
         */
        weeks: {
            type: Boolean,
            value: true,
        },

        /**
         * 周标题类型
         */
        weeksType: {
            type: String,
            value: 'cn',
            observer: 'weeksTypeChange'
        },
        /**
         * 是否显示前后月份残余数据
         */
        showMoreDays: {
            type: Boolean,
            value: false,
        },
        /**
         * 是否显示前后月份残余数据
         */
        formatType: {
            type: String,
            value: '-',
        },
    },

    // 组件的初始数据
    data: {
        weekTitle: ['日', '一', '二', '三', '四', '五', '六'],
        days: [],
    },
    ready: function() {
        this.init()
    },

    methods: {
        /**
         * 周标题类型
         */
        weeksTypeChange: function(newVal, oldVal) {
            switch (newVal) {
                case 'en':
                    this.setData({
                        weeksType: 'en',
                        weekTitle: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    });
                    break;
                case 'cn':
                    this.setData({
                        weeksType: 'cn',
                        weekTitle: ['日', '一', '二', '三', '四', '五', '六']
                    });
                    break;
                case 'full-en':
                    this.setData({
                        weeksType: 'full-en',
                        weekTitle: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    });
                    break;
                default:
                    this.setData({
                        weeksType: 'en',
                        weekTitle: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    });
                    break;
            }
        },

        init() {
            this.jumpToToady()
        },

        // 获取某年某月总共多少天
        getDays(year, month) {
            return new Date(year, month, 0).getDate();
        },
        //获取当月天数数据
        getCurrentDays(year, month) {
            let currentDays = []
            this.currentDaysLen = this.getDays(year, month)
            if (currentDays <= 0) {
                for (let i = 1; i <= this.currentDaysLen; i++) {
                    currentDays.push({
                        type: 'current',
                        year,
                        month,
                        day: i,
                        class: ''
                    })
                }

            }
            return currentDays
        },

        // 获取上月残余天数
        getPreDays(year, month) {
            //上月残余天数
            let preMonth = month - 1
            this.emptyDaysLen = this.getfristDayWeek(new Date(year, month, 0))
                //上月天数
            this.preDaysLen = preMonth < 0 ?
                this.getDays(year, -1, 12) :
                this.getDays(year, preMonth);
            let preMonthDays = []
            for (let i = 1; i <= this.emptyDaysLen; i++) {
                //是否显示上月残余天数
                if (this.data.showMoreDays) {
                    preMonthDays.unshift({
                        type: 'pre',
                        year,
                        preMonth,
                        day: this.preDaysLen,
                        class: ''
                    })
                    this.preDaysLen--
                } else {
                    preMonthDays.unshift({
                        type: 'pre',
                        year,
                        preMonth,
                        day: -1,
                        class: ''
                    })
                }

            }
            return preMonthDays
        },

        // 获取下月残余天数
        getNextDays(year, month) {
            let nextMonth = month + 1
            let nextMonthDaysLen = (42 - this.emptyDaysLen - this.currentDaysLen - 7) >= 0 ?
                (42 - this.emptyDaysLen - this.currentDaysLen - 7) : (42 - this.emptyDaysLen - this.currentDaysLen) // 下月多余天数
            let nextMonthDays = []
            if (nextMonthDaysLen > 0) {
                for (let i = 1; i <= nextMonthDaysLen; i++) {
                    if (this.data.showMoreDays) {
                        nextMonthDays.push({
                            type: 'next',
                            year,
                            nextMonth,
                            day: i,
                            class: ''
                        })
                    } else {
                        nextMonthDays.push({
                            type: 'next',
                            year,
                            nextMonth,
                            day: -2,
                            class: ''
                        })
                    }
                }
            }
            return nextMonthDays
        },

        //当月显示数据 包括上月 下月残余数据
        getAllDays(year, month) {
            let preDays = this.getPreDays(year, month)
            let currentDays = this.getCurrentDays(year, month)
            let nextDays = this.getNextDays(year, month)
            let allDays = [...preDays, ...currentDays, ...nextDays]
            this.setData({
                days: allDays
            })
        },

        //上个月
        getLastMonthDays() {
            this.currentMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1
            this.currentYear = this.currentMonth === 1 ? this.currentYear - 1 : this.currentYear
            this.getAllDays(this.currentYear, this.currentMonth)
            this.setCurrentDate(this.currentYear, this.currentMonth, this.selectedDay)
            this.setSelectedDayClass(this.selectedYear, this.selectedMonth, this.selectedDay)
        },

        //下个月
        getNextMonthDays() {
            this.currentYear = this.currentMonth === 12 ? this.currentYear + 1 : this.currentYear
            this.currentMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1
            this.getAllDays(this.currentYear, this.currentMonth)
            this.setCurrentDate(this.currentYear, this.currentMonth, this.selectedDay)
            this.setSelectedDayClass(this.selectedYear, this.selectedMonth, this.selectedDay)
        },

        //上一年
        getLastYearDays() {
            this.currentYear = this.currentYear - 1
            this.getAllDays(this.currentYear, this.currentMonth)
            this.setCurrentDate(this.currentYear, this.currentMonth, this.selectedDay)
            this.setSelectedDayClass(this.selectedYear, this.selectedMonth, this.selectedDay)
        },

        //下一年
        getNextYearDays() {
            this.currentYear = this.currentYear + 1
            this.getAllDays(this.currentYear, this.currentMonth)
            this.setCurrentDate(this.currentYear, this.currentMonth, this.selectedDay)
            this.setSelectedDayClass(this.selectedYear, this.selectedMonth, this.selectedDay)
        },

        //今天
        jumpToToady() {
            let currentDate = new Date()
            this.currentYear = currentDate.getFullYear()
            this.currentMonth = currentDate.getMonth() + 1
            this.currentDay = currentDate.getDate()
            this.selectedYear = currentDate.getFullYear()
            this.selectedMonth = currentDate.getMonth() + 1
            this.selectedDay = currentDate.getDate()
            this.getAllDays(this.currentYear, this.currentMonth)
            this.setCurrentDate(this.currentYear, this.currentMonth, this.currentDay)
            this.setSelectedDayClass(this.selectedYear, this.selectedMonth, this.selectedDay)
        },

        setCurrentDate(year, month, day) {
            let date = this.formateDateJoinStr(year, month, day, )
            this.setData({
                currentDate: date
            })

        },

        //设置选中日期的样式 默认选中当前日期
        setSelectedDayClass(year, month, day) {
            let todayYear = year ? year : new Date().getFullYear()
            let todyaMonth = month ? month : new Date().getMonth() + 1
            let todayDay = day ? day : new Date().getDate()
            this.data.days.map(day => {
                if (day.year === todayYear && day.month === todyaMonth && day.day === todayDay) {
                    day.class = 'thisDayIsSelect'
                } else {
                    if (day.day === todayDay) {
                        day.class = 'thisDayNoSelect'
                    } else {
                        day.class = ''
                    }
                }
            })
            this.setData({
                days: this.data.days
            })
        },

        //选择日期
        selectDay(e) {
            let day = e.currentTarget.dataset.date
            this.selectedYear = day.year
            this.selectedMonth = day.month
            this.selectedDay = day.day
            this.setCurrentDate(day.year, day.month, day.day)
            this.setSelectedDayClass(day.year, day.month, day.day)
            let detail = {
                    value: this.formateDateJoinStr(day.year, day.month, day.day)
                }
                //将选中的日期传给自定义事件
            this.triggerEvent('select', detail);
        },

        //日期格式化
        formateDateJoinStr(year, month, day) {
            return [year, month, day].map(this.formatNumber).join(this.data.formatType)
        },

        //星期格式化
        formatWeek(day, week) {
            let result = week - (day % 7 - 1);
            let currentWeek = result < 0 ? 7 + result : result;
            return currentWeek;

        },
        //获取当月1号为星期几
        getfristDayWeek(date) {
            let day = date.getDate() //获取当前日
            let week = date.getDay() //获取当前星期几
            return this.formatWeek(day, week)
        }


    }
})