// 交易时间的快捷选项 3-6个月
export const pickerOptions = {
  shortcuts: [
    {
      text: "最近三个月",
      onClick(picker) {
        let end = new Date().setHours(23, 59, 59);
        let start = new Date().setHours(0, 0, 0);
        start = new Date(start);
        end = new Date(end);
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近六个月",
      onClick(picker) {
        let end = new Date().setHours(23, 59, 59);
        let start = new Date().setHours(0, 0, 0);
        start = new Date(start);
        end = new Date(end);
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一年",
      onClick(picker) {
        let end = new Date().setHours(23, 59, 59);
        let start = new Date().setHours(0, 0, 0);
        start = new Date(start);
        end = new Date(end);
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
        picker.$emit("pick", [start, end]);
      },
    },
  ],
};

// 时间要设置为当天结束，因为组件默认的是当前时间，这样会显示当天时间，但不能选择，因为当前时间已经结束，所以要设置当日23：59：59：59
const endDate = new Date();
endDate.setHours(23, 59, 59, 59); // 结束时间：当日23：59：59：59
// 交易时间的快捷选项 禁止选中以前当前时间
export const disabledBeforeNowPickerOptions = {
  disabledDate(time) {
    return time.getTime() < Date.now() - 86400000;
  },
};

// 交易时间的快捷选项 禁止选中以后时间
export const disabledAfterNowPickerOptions = {
  disabledDate(time) {
    return time.getTime() > endDate;
  },
};
