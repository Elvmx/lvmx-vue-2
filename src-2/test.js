const dayjs = require("dayjs");

const times = (n, iteratee) => {
  let index = -1;
  const result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
};

const padZero = (num, targetLength = 2) => {
  let str = num + "";

  while (str.length < targetLength) {
    str = "0" + str;
  }

  return str;
};

const getDateArr = (currentDate, minDate, maxDate) => {
  let result = [];
  let days = maxDate.getDate() - minDate.getDate();
  for (let i = 0; i <= days; i++) {
    const a = dayjs(minDate).add(i, "day");
    result.push({
      text: a.format("YYYY-MM-DD"),
      date: a.toDate(),
    });
  }
  return result;
};

const getHoursArr = (currentDate, minDate, maxDate) => {
  let result = [];
  let rangeArr = [0, 23];
  if (currentDate.getDate() === minDate.getDate()) {
    rangeArr[0] = minDate.getHours();
  }
  if (currentDate.getDate() === maxDate.getDate()) {
    rangeArr[1] = maxDate.getHours();
  }
  times(rangeArr[1] - rangeArr[0] + 1, (index) => {
    result.push({
      text: padZero(rangeArr[0] + index),
      date: dayjs(currentDate)
        .set("hour", rangeArr[0] + index)
        .toDate(),
    });
  });
  return result;
};

const getMinutesArr = (currentDate, minDate, maxDate) => {
  let result = [];
  let rangeArr = [0, 59];
  if (currentDate.getDate() === minDate.getDate() && currentDate.getHours() === minDate.getHours()) {
    rangeArr[0] = minDate.getMinutes();
  }
  if (currentDate.getDate() === maxDate.getDate() && currentDate.getHours() === maxDate.getHours()) {
    rangeArr[1] = maxDate.getMinutes();
  }
  console.log(rangeArr);
  times(rangeArr[1] - rangeArr[0] + 1, (index) => {
    result.push({
      text: padZero(rangeArr[0] + index),
    });
  });
  return result;
};

const minDate = dayjs("2021-11-03 10:30").toDate();
const maxDate = dayjs("2021-11-06 10:00").toDate();

// const aa = getDateArr(new Date(), minDate, maxDate);
// const bb = getHoursArr(dayjs("2021-11-06").toDate(), minDate, maxDate);
// const cc = getMinutesArr(dayjs("2021-11-03 09:10").toDate(), minDate, maxDate);

const aa = getDateArr(null, minDate, maxDate).map((item) => ({
  ...item,
  children: getHoursArr(item.date, minDate, maxDate).map((item) => ({
    ...item,
    children: getMinutesArr(item.date, minDate, maxDate),
  })),
}));

console.log(aa);
