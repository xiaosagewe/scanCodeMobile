<template>
  <div style="padding: 16px;">
    <div class="van-safe-area-top"></div>
    <div class="scanCodeIndexWrapper">
      <van-image
        width="100"
        height="100"
        src="https://img2.baidu.com/it/u=646717384,2899469166&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
      />
      <div class="desc">非实物图片，仅为操作演示</div>
      <div class="mainContent">本功能需要手机支持并开启摄像头权限，请确保手机摄像头功能已开启</div>
      <div class="desc">仅适用于 2024年 10月17日及以后生产的胜威塑料产品</div>
      <van-button style="width: 66vw;" round type="primary" @click="() => { handleScan('') }">立即扫码</van-button>
      <div class="mainContent">条形码破损/撕毁无法识别</div>
      <van-button plain style="width: 60vw;margin-top: 20px; margin-bottom: 20px" round type="primary" @click="() => { handleScan('') }">手动输入</van-button>
    </div>
    <div class="title">查询步骤</div>
    <div class="content">1.将手机摄像头对准产品二维码进行扫码</div>
    <div class="content">2.待识别正确二维码后，即可查看溯源信息</div>
    <div class="van-safe-area-bottom"></div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import router from '@/router';
import wx from "weixin-jsapi";

import { getWechatConfig } from '@/api/index';

export default {
  components: { QrcodeStream },

  data() {
    return {
      key: '',
      code: '',
      paused: true,
      result: '',
      showScanConfirmation: false
    }
  },

  mounted() {
    this.handleGetWechatConfig();
  },

  methods: {
    handleGetWechatConfig() {
      getWechatConfig({
        url: 'https://rs.svetia.cn/codeManageMobile/#/scanCodeIndex',
      }).then(({ code, data, msg }) => {
        if (code === 200) {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx06615118720169c0', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ["scanQRCode"], // 必填，需要使用的JS接口列表, 这里只需要调用扫一扫
          });
        } else {
          alert(msg)
        }
      })
    },
    handleScan(num) {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          // 扫码成功，跳转到二维码指定页面（res.resultStr为扫码返回的结果）
          router.push({
            path: '/scanCodeSuccess',
            query: {
              codeStr: res.resultStr,
            },
          });
        },
      });
    },

    onCameraOn() {
      this.showScanConfirmation = false
    },

    onCameraOff() {
      this.showScanConfirmation = true
    },

    onError(error) {
      console.log(error);
    },

    async onDetect(detectedCodes) {
      const str = detectedCodes.map((code) => code.rawValue).join('');
      this[this.key] = str;

      this.paused = true;

      router.push({
        path: '/codeDetail',
        query: {
          codeStr: str,
        },
      });
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },
  }
}
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.scanCodeIndexWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 12vw;

  .desc {
    font-size: 14px;
    color: #999;
    margin: 8px 0 20px 0;
  }

  .mainContent {
    font-size: 18px;
    color: #333;
    margin-top: 32px;
    display: flex;
    text-align: center;
  }
}

.title {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.content {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}
</style>