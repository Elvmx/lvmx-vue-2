<template>
  <div id="app">
    <input type="text" v-model="message" />

    <van-button type="primary" @click="onClick">提交</van-button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    console.log("mounted");
    this.$nextTick(() => {
      document.querySelector("input").focus();
    });
    // setTimeout(document.querySelector("input").focus(), 50);
  },
  methods: {
    onClick() {
      console.log(1, this.message);
    },
    fn1() {
      const input = document.querySelector("input");
      const button = document.querySelector("button");
      input.value = "我的天呀";
      input.focus();
      button.click();
    },
  },
};
</script>
