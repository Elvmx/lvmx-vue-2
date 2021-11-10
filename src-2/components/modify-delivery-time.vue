<template>
  <van-popup v-bind="$attrs" v-on="$listeners" position="bottom">
    <van-picker ref="picker" item-height="12vw" :show-toolbar="false" :visible-item-count="5" :columns="columns" />
  </van-popup>
</template>

<script>
import dayjs from "dayjs";

const currentYear = new Date().getFullYear();

export default {
  name: "modify-delivery-time",

  props: {
    /**
     * 可选的最小时间
     */
    minDate: { type: Date, default: () => new Date(currentYear, 0, 1) },
    /**
     * 可选的最大时间
     */
    maxDate: { type: Date, default: () => new Date(currentYear, 1, 31) },
  },

  data() {
    return {
      columns: [],
    };
  },

  watch: {
    minDate() {
      !this.initing && this.init();
    },

    maxDate() {
      !this.initing && this.init();
    },
  },

  created() {
    this.init();
  },

  methods: {
    times(n, iteratee) {
      let index = -1;
      const result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
    },

    padZero(num, targetLength = 2) {
      let str = num + "";

      while (str.length < targetLength) {
        str = "0" + str;
      }

      return str;
    },

    init() {
      this.initing = true;
      const minDate = this.minDate;
      const maxDate = this.maxDate;

      this.columns = this.getDateArr(null, minDate, maxDate).map((item) => ({
        ...item,
        children: this.getHoursArr(item.date, minDate, maxDate).map((item) => ({
          ...item,
          children: this.getMinutesArr(item.date, minDate, maxDate),
        })),
      }));
      this.initing = false;
    },

    getDateArr(currentDate, minDate, maxDate) {
      let result = [];
      let days = dayjs(maxDate).diff(dayjs(minDate), "day");
      for (let i = 0; i <= days; i++) {
        const a = dayjs(minDate).add(i, "day");
        result.push({
          text: a.format("YYYY-MM-DD"),
          date: a.toDate(),
        });
      }
      return result;
    },

    getHoursArr(currentDate, minDate, maxDate) {
      let result = [];
      let rangeArr = [0, 23];
      if (currentDate.getDate() === minDate.getDate()) {
        rangeArr[0] = minDate.getHours();
      }
      if (currentDate.getDate() === maxDate.getDate()) {
        rangeArr[1] = maxDate.getHours();
      }
      this.times(rangeArr[1] - rangeArr[0] + 1, (index) => {
        result.push({
          text: this.padZero(rangeArr[0] + index),
          date: dayjs(currentDate)
            .set("hour", rangeArr[0] + index)
            .toDate(),
        });
      });
      return result;
    },

    getMinutesArr(currentDate, minDate, maxDate) {
      let result = [];
      let rangeArr = [0, 59];
      if (currentDate.getDate() === minDate.getDate() && currentDate.getHours() === minDate.getHours()) {
        rangeArr[0] = minDate.getMinutes();
      }
      if (currentDate.getDate() === maxDate.getDate() && currentDate.getHours() === maxDate.getHours()) {
        rangeArr[1] = maxDate.getMinutes();
      }
      this.times(rangeArr[1] - rangeArr[0] + 1, (index) => {
        result.push({
          text: this.padZero(rangeArr[0] + index),
        });
      });
      return result;
    },
  },
};
</script>
