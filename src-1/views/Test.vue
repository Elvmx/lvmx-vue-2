<template>
  <div class="test">
    <div class="route-node">
      <ul>
        <li v-for="item in 20" :key="item">{{ item }}</li>
      </ul>
    </div>
    <!-- <v-touch
      v-on:panstart="onPanstart"
      v-on:panmove="onPanmove"
      v-on:panend="onPanend"
      v-on:pancancel="onPanend"
    >
      <div class="footer" :style="footerStyle">
        <div class="route-node">
          <ul>
            <li v-for="item in 20" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </v-touch> -->
  </div>
</template>

<script>
import BetterScroll from "better-scroll";

export default {
  name: "test",

  data() {
    return {
      fastTouch: false, // 快速移动
      footerTop: 420,
      footerMinTop: 140,
      footerMaxTop: 420,
    };
  },

  computed: {
    footerStyle() {
      if (this.fastTouch) {
        return {
          top: `${this.footerTop}px`,
          transition: "top 300ms ease-in",
        };
      } else {
        return {
          top: `${this.footerTop}px`,
        };
      }
    },
  },

  mounted() {
    new BetterScroll(".route-node");
  },

  methods: {
    range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    onPanstart() {
      this.fastTouch = false;
      this.recordY = this.footerTop;
    },
    onPanmove(e) {
      this.footerTop = this.range(
        this.recordY + e.deltaY,
        this.footerMinTop,
        this.footerMaxTop
      );
    },
    onPanend(e) {
      this.fastTouch = true;
      if (e.deltaY <= 0) {
        this.footerTop = this.footerMinTop;
      } else {
        this.footerTop = this.footerMaxTop;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.test {
  height: 100%;
  background-color: #ccc;

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  .route-node {
    flex: 1;
    height: 500px;
    overflow: hidden;
    li {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
