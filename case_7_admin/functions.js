/*
* 对Date的扩展，将 Date 转化为指定格式的String   
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
* 例子：   
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
*/
const formatDate = function (date, fmt) { //author: meizz   
    var o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// input-date 当天
const inputDateInit = function () {
    // 给input  date设置默认值
    let now = new Date();
    //格式化日，如果小于9，前面补0
    let day = ("0" + now.getDate()).slice(-2);
    //格式化月，如果小于9，前面补0
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    //拼装完整日期格式
    let today = now.getFullYear() + "-" + (month) + "-" + (day);

    return today
}

// 两天之间的天数
const getDateDiff = function (startDate, endDate) {
    var startTime = Date.parse(startDate)
    var endTime = Date.parse(endDate)
    var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates;
}

// 展示当前日期的计划
const showPlan = function (day) {
    // 计划列表
    let planList = JSON.parse(localStorage.getItem('planList'))
    // 计划完成情况
    let planComplete = JSON.parse(localStorage.getItem('planComplete'))
    let plans = planComplete && planComplete[day]

    let content = ''
    planList && planList.forEach(item => {
        // 当前日期需在该计划开始之后
        if (Date.parse(day) >= Date.parse(item.start)) {
            let show = false
            if (item.frequency == '每天') {
                // 每天
                show = true
            } else if (item.frequency == '隔天') {
                // 每隔一天
                let dates = getDateDiff(item.start, day)

                if (dates % 2 == 0) {
                    show = true
                }
            } else if (item.frequency == '隔两天') {
                // 每隔两天
                let dates = getDateDiff(item.start, day)

                if (dates % 3 == 0) {
                    show = true
                }
            } else if (item.frequency == '一次') {
                // 只有一次
                if (day == item.start) {
                    show = true
                }
            }

            if (show) {
                // 检查计划是否完成
                let showColor = 'warning'
                plans && plans.forEach(plansItem => {
                    if (plansItem == item.title) {
                        showColor = 'success'
                        return
                    }
                })

                content += `<li onclick="showModal(this)" data-toggle="modal" data-target="#myModal-1" class="list-group-item list-group-item-${showColor}"><span class="badge">${item.frequency}</span>
    <span class="plan-title">${item.title}</span></li>`
            }

        }
    })
    if (!content) {
        content = `<div style="line-height:60px;text-align:center;color:#bbb;">还木有计划呢，快去添加计划吧~</div>`
    } else {
        if (content.indexOf('warning') == -1) {
            content += `<div style="line-height:60px;text-align:center;color:#bbb;">今天的任务都完成啦~</div>`
        }
    }
    $('.list-group.item-list').html(content)
}

let title
const showModal = function (pEle) {
    title = $(pEle).find('.plan-title').text()

    // 显示图片
    let planList = JSON.parse(localStorage.getItem('planList'))
    let pic = ''
    planList && planList.forEach((item, index) => {
        if (item.title == title) {
            pic = item.pic
            return
        }
    })

    pic && $('.pic-block').attr('src', pic)

}