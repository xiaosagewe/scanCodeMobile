<template>
  <div style="padding: 16px">
    <div class="van-safe-area-top"></div>
    <img :src="LOGO" alt="" class="logo">
    <div class="errorMainWrapper">
      <div class="errorWrapper">
        <img :src="FAIL" alt="" srcset="">
        <div class="title">非常抱歉，暂未查询到该产品溯源信息</div>
      </div>
      <div class="errorTitle">查询失败原因可能如下:</div>
      <div class="errorcontent">A.被查询产品可能不是2024年10月17日及以后生产的胜威塑料产品。</div>
      <div class="errorcontent">B.手机扫码距离或位置不正确，请正对条形码，保持条形码清晰且完全处于摄像头范围内。</div>
      <div class="errorcontent">C.摄像头模糊或手机问题导致扫码不成功。</div>
      <div class="errorcontent">D.可能条形码破损/残缺导致无法识别，可尝试手动输入条形码数字进行溯源。</div>
      <van-button style="width: 66vw;margin: 0 auto; margin-top: 32px;" round type="primary" @click="handleTry">重试</van-button>
    </div>
    <div class="van-safe-area-bottom"></div>
  </div>
</template>

<script>
import router from '@/router';
import FAIL from '@/assets/fail.jpg';
import LOGO from '@/assets/logo.png';

export default {
  data() {
    return {
      FAIL,
      LOGO,
    };
  },
  methods: {
    handleTry() {
      const scanPath = router?.currentRoute?.value?.query?.scanPath;

      router.push(scanPath);
    },
  }
}
</script>

<style scoped>
.logo {
  height: 32px;
}

.errorMainWrapper {
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.errorWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;

  img {
    width: 60vw;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #111;
  }
}

.errorTitle {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.errorcontent {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}
</style>