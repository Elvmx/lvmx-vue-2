<template>
  <div id="app">
    <van-field readonly clickable label="城市" @click="fn1" />

    <van-field readonly clickable label="城市" @click="fn2" />

    <modify-delivery-time v-model="showPicker" :min-date="minDate" :max-date="maxDate" />
  </div>
</template>

<script>
import ModifyDeliveryTime from "@/components/modify-delivery-time";
import dayjs from "dayjs";

export default {
  name: "App",
  components: { ModifyDeliveryTime },
  data() {
    return {
      showPicker: false,
      minDate: dayjs("2021-11-03 10:00").toDate(),
      maxDate: dayjs("2021-11-05 23:40").toDate(),
    };
  },
  methods: {
    fn1() {
      this.minDate = dayjs("2021-11-03 10:00").toDate();
      this.maxDate = dayjs("2021-11-05 23:40").toDate();
      this.showPicker = true;
    },

    fn2() {
      this.minDate = dayjs("2021-11-02 10:00").toDate();
      this.maxDate = dayjs("2021-11-06 23:40").toDate();
      this.showPicker = true;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
</style>
