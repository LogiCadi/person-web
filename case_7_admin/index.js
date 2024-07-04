// 初始化日历
const myCalendar = new SimpleCalendar(".sc-container");
myCalendar.updateSize("100%", "320px");

// 初始化显示今天的计划
showPlan(formatDate(myCalendar.getSelectedDay(), "yyyy-MM-dd"));

// 添加计划 时间输入框 显示当天日期
$(".add-plan").click(function () {
  // input-date 显示当天
  let today = inputDateInit();

  //完成赋值
  $("#start").val(today);
});

/**点击日期显示当天的计划列表 */
document.querySelector("body").addEventListener("click", function (e) {
  if (
    e.target.className.indexOf("sc-item") != -1 ||
    e.target.className.indexOf("lunar-day") != -1 ||
    e.target.className.indexOf("sc-return-today ") != -1
  ) {
    showPlan(formatDate(myCalendar.getSelectedDay(), "yyyy-MM-dd"));
  } else if (e.target.className.indexOf("plan-title") != -1) {
    console.log(e.target.innerText);
  }
});

// 添加新的计划
$(".plan-add-btn").click(function () {
  let title = $("#title").val();
  let start = $("#start").val();
  let pic = $("#pic").val();
  let frequency = $("#frequency").val();

  let saveData = { title, start, pic, frequency };

  let planList = JSON.parse(localStorage.getItem("planList")) || [];
  planList.push(saveData);

  console.log(planList);

  localStorage.setItem("planList", JSON.stringify(planList));

  $("#myModal").modal("hide");

  // 刷新显示计划
  showPlan(formatDate(myCalendar.getSelectedDay(), "yyyy-MM-dd"));
});

// 删除一个计划
$(".del-plan").click(function () {
  let planList = JSON.parse(localStorage.getItem("planList"));
  planList &&
    planList.forEach((item, index) => {
      if (item.title == title) {
        planList.splice(index, 1);
        return;
      }
    });
  console.log(planList);

  localStorage.setItem("planList", JSON.stringify(planList));
  $("#myModal-1").modal("hide");

  // 刷新显示计划
  showPlan(formatDate(myCalendar.getSelectedDay(), "yyyy-MM-dd"));
});

// 设置当日已完成
$(".plan-complete").click(function () {
  let planComplete = JSON.parse(localStorage.getItem("planComplete")) || {};
  let selectDay = formatDate(myCalendar.getSelectedDay(), "yyyy-MM-dd");

  if (!planComplete[selectDay]) {
    planComplete[selectDay] = [];
  }
  planComplete[selectDay].push(title);

  console.log(planComplete);

  localStorage.setItem("planComplete", JSON.stringify(planComplete));
  $("#myModal-1").modal("hide");

  // 刷新显示计划
  showPlan(selectDay);
});

// 显示data
$(".save-data").click(function () {
  let planComplete = JSON.parse(localStorage.getItem("planComplete"));
  let planList = JSON.parse(localStorage.getItem("planList"));

  if (planList || planComplete) {
    data = JSON.stringify({
      planComplete,
      planList,
    });
  } else {
    data = "";
  }

  $(".io-data-textarea").val(data);
});

// 复制data
$(".copy-btn").click(function () {
  let obj = document.querySelector(".io-data-textarea");
  obj.select();
  document.execCommand("Copy");
  alert("复制成功");

  $("#myModal-2").modal("hide");
});

// 导入data
$(".io-btn").click(function () {
  let data = JSON.parse($(".io-data-textarea").val());

  localStorage.setItem("planComplete", JSON.stringify(data.planComplete));
  localStorage.setItem("planList", JSON.stringify(data.planList));

  $("#myModal-2").modal("hide");

  showPlan(formatDate(myCalendar.getSelectedDay(), "yyyy-MM-dd"));
});
