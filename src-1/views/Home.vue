<template>
  <div class="home">
    <v-touch
      v-on:panstart="onPanstart"
      v-on:panmove="onPanmove"
      v-on:panend="onPanend"
      v-on:pancancel="onPanend"
    >
      <div class="hello-body" :style="footerStyle">
        <div class="a"></div>
        <div class="b"></div>
        <div class="c" ref="cRef">
          <ul>
            <li v-for="item in 20" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script>
// import BetterScroll from "better-scroll";
export default {
  name: "Home",

  data() {
    return {
      fastTouch: false, // 快速移动
      top: 400,
      minTop: 200,
      maxTop: 400,
    };
  },

  computed: {
    footerStyle() {
      if (this.fastTouch) {
        return {
          top: `${this.top}px`,
          transition: "top 300ms ease-in",
        };
      } else {
        return {
          top: `${this.top}px`,
        };
      }
    },
    isExpand() {
      return this.top === this.minTop;
    },
  },

  watch: {
    isExpand() {
      this.bs.refresh();
    },
  },

  mounted() {
    // this.bs = new BetterScroll(".c");
    // this.bs.disable();
  },

  methods: {
    range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    onPanstart() {
      this.fastTouch = false;
      this.recordY = this.top;
    },
    onPanmove(e) {
      if (this.$refs.cRef.contains(e.target)) return;
      console.log("onPanmove", e);
      this.top = this.range(this.recordY + e.deltaY, this.minTop, this.maxTop);
    },
    onPanend(e) {
      if (this.$refs.cRef.contains(e.target)) return;
      this.fastTouch = true;
      if (e.deltaY <= 0) {
        this.top = this.minTop;
      } else {
        this.top = this.maxTop;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #ccc;
}

.hello-body {
  position: fixed;
  top: 100%;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  touch-action: pan-y !important;
}

.a {
  flex-shrink: 0;
  margin: 10px auto;
  width: 90vw;
  height: 50px;
  background-color: red;
}

.b {
  flex-shrink: 0;
  margin-bottom: 10px;
  height: 100px;
  background-color: green;
}

.c {
  flex: 1;
  display: flex;
  background-color: greenyellow;
  overflow: hidden;
  touch-action: pan-y !important;
  ul {
    width: 100%;
    height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  li {
    height: 50px;
  }
}
</style>
