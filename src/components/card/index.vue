<template>
  <div>
    <div :class="props.noRadius ? 'cardWrapperNoRadius' : 'cardWrapper'" :style="radius ? {} : { borderRadius: 0 }">
      <div class="rightFixBottom">
        <slot name="rightFixBottom"></slot>
      </div>
      <div class="rightFixTop">
        <slot name="rightFixTop"></slot>
      </div>
      <div :class="['cardTitle', props.titleBarClass]" v-if="showTitle">
        <div v-if="props.leftTitle">
          {{ props.leftTitle }}
        </div>
        <slot v-else name="leftTitle"></slot>
        <div v-if="props.rightTitle">
          {{ props.rightTitle }}
        </div>
        <slot v-else name="rightTitle"></slot>
      </div>
      <div class="cardContent" :style="{ paddingRight: props.noRightPadding ? '0' : '2.13vw' }" v-if="showContent && ((needCollpase && showCardContent) || !needCollpase)">
        <slot></slot>
      </div>
    </div>
    <div v-if="props.needCollpase" class="trapezoidal">
      <van-icon v-if="showCardContent" name="arrow-down" class="trapezoidalIcon" @click="showCardContent = false;" />
      <van-icon v-else name="arrow-up" class="trapezoidalIcon" @click="showCardContent = true;"/>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    needCollpase: {
      type: Boolean,
      default: false,
    },
    titleBarClass: {
      type: String,
      default: '',
    },
    radius: {
      type: Boolean,
      default: true,
    },
    showContent: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    leftTitle: {
      type: String,
      default: '',
    },
    rightTitle: {
      type: String,
      default: '',
    },
    noRightPadding: {
      type: Boolean,
      default: false,
    },
    noRadius: {
      type: Boolean,
      default: false,
    },
  });

  const showCardContent = ref(false);
</script>

<style scoped lang="less">
.cardWrapper, .cardWrapperNoRadius {
  background-color: #fff;
  border-radius: 2.13vw;
  position: relative;
  overflow: hidden;

  .cardTitle {
    padding: 2.13vw 4.26vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .hotBg, .straigthBg, .policyBg {
    overflow: visible;
    background-image: linear-gradient(3deg, rgba(255, 0, 13, 0) 20%, rgba(255, 0, 13, 0.1) 80%);
    padding: 4.26vw;
  }

  .straigthBg {
    background: linear-gradient(3deg, rgba(0, 117, 255, 0) 20%, rgba(0, 117, 255, 0.15) 100.51%);
  }

  .policyBg {
    background: linear-gradient(3deg, rgba(255, 95, 0, 0) 20%, rgba(255, 95, 0, 0.15) 100.51%);
  }

  .cardContent {
    padding: 2.13vw;
    position: relative;
  }

  .rightFixBottom {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .rightFixTop {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
  }
}

.cardWrapperNoRadius {
  border-radius: 0;
}

.trapezoidalWrapper {
  width: 10vw;
  position: absolute;
  bottom: -2.13vw;
  left: 50%;
  z-index: 2;
}

.trapezoidal {
  position: relative;
  width: 20vw;
  height: 5vw;
  text-align: center;
  margin: 0 auto;
  rotate: 180deg;
}

.trapezoidal::before,
.trapezoidal::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  border-radius: 8px 0 0 0;
  background: #fff;
  z-index: 0;
  transform-origin: bottom;
  transform: skew(-20deg);
  border: 0px solid #333;
  box-sizing: border-box;
}

.trapezoidal::after {
  left: auto;
  right: 0;
  transform: skew(20deg);
  border-radius: 0 8px 0 0;
  background-color: #fff;
  border-left: 0 none;
}

.trapezoidalIcon {
  font-size: 3.25vw;
  z-index: 2;
}
</style>
