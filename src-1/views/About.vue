<template>
  <div class="about">
    <div class="body">
      <van-cell title="单元格" is-link v-for="item in 20" :key="item" />

      <van-cell-group>
        <van-field v-model="message" label="文本" placeholder="请输入用户名" />
      </van-cell-group>

      <!-- <van-cell title="单元格" is-link v-for="item in 10" :key="item" /> -->
    </div>
    <div class="footer" v-show="!isFocus">
      <van-button type="primary" block>Hello</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",

  data() {
    return {
      message: "message",
      isFocus: false,
    };
  },

  mounted() {
    // document.body.addEventListener(
    //   "touchmove",
    //   function (e) {
    //     console.log(this);
    //     if (this === e.target) {
    //       e.preventDefault();
    //     }
    //   },
    //   { passive: false }
    // );
    // document.body.addEventListener(
    //   "focus",
    //   () => {
    //     console.log("获取焦点咯");
    //     this.isFocus = true;
    //   },
    //   { capture: true }
    // );
    // document.body.addEventListener(
    //   "blur",
    //   () => {
    //     console.log("失去焦点咯");
    //     this.isFocus = false;
    //   },
    //   { capture: true }
    // );
  },
};
</script>

<style lang="scss" scoped>
.about {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .body {
    min-height: 500px;
    flex: 1;
    overflow-y: auto;

    padding: 0 10px;
  }

  .footer {
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }
}
</style>
