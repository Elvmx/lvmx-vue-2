<template>
  <div class="home">
    <v-touch
      class="hello"
      :style="helloStyle"
      v-on:panstart="onPanstart"
      v-on:panmove="onPanmove"
      v-on:panend="onPanend"
      v-on:pancancel="onPanend"
    >
      <div class="hello-body">
        <div class="a"></div>
        <div class="b"></div>
        <div class="c">
          <div v-for="item in 100" :key="item">{{ item }}</div>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      top: 500,
      minTop: 100,
      maxTop: 500,
    };
  },

  computed: {
    helloStyle() {
      return {
        transform: `translate3d(0, ${this.top}px, 0)`,
      };
    },
  },

  methods: {
    range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    onPanstart(e) {
      console.log("onPanstart", e);
      this.recordY = this.top;
    },
    onPanmove(e) {
      console.log("onPanmove", e);
      this.top = this.range(this.recordY + e.deltaY, this.minTop, this.maxTop);
    },
    onPanend(e) {
      console.log("onPanend", e);
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

.hello {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

.hello-body {
  height: 636px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.a {
  margin: 10px auto;
  width: 90vw;
  height: 50px;
  background-color: red;
}

.b {
  margin-bottom: 10px;
  height: 100px;
  background-color: green;
}

.c {
  flex: 1;
  background-color: greenyellow;
  overflow-y: auto;
  > div {
    height: 50px;
  }
}
</style>
