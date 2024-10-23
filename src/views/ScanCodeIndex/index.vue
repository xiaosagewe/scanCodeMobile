<template>
  <div style="padding: 16px;">
    <div class="van-safe-area-top"></div>
    <img :src="LOGO" alt="" srcset="" class="logo">
    <div class="scanCodeIndexWrapper">
      <van-image
        width="100"
        height="100"
        src="http://rs-cn-20220728.oss-cn-shanghai.aliyuncs.com/image/20241023/1729686432798226.jpg?Expires=2045046433&OSSAccessKeyId=LTAI5t5g39V9oiXfrxJjciWy&Signature=GLhDcjWwya5%2FpNzbADbpotAgsPA%3D"
      />
      <div class="desc">非实物图片，仅为操作演示</div>
      <div class="mainContent">本功能需要手机支持并开启摄像头权限，请确保手机摄像头功能已开启</div>
      <div class="desc">仅适用于 2024年 10月17日及以后生产的胜威塑料产品</div>
      <van-button style="width: 66vw;" round type="primary" @click="() => { handleScan('') }">立即扫码</van-button>
      <div class="mainContent">条形码破损/撕毁无法识别</div>
      <van-button plain style="width: 60vw;margin-top: 20px; margin-bottom: 20px" round type="primary" @click="handleOpenInput">手动输入</van-button>
    </div>
    <div class="title">查询步骤</div>
    <div class="content">1.将手机摄像头对准产品二维码进行扫码</div>
    <div class="content">2.待识别正确二维码后，即可查看溯源信息</div>
    <van-grid :column-num="3" direction="horizontal" :border="false">
      <van-grid-item icon="photo-o" text="文字">
        <van-image
          :src="PRO_TOP"
        />
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <van-image
          :src="PRO_IN"
        />
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <van-image
          :src="PRO_BODY"
        />
      </van-grid-item>
    </van-grid>
    <div class="van-safe-area-bottom"></div>
    <van-dialog v-model:show="show" title="请输入二维码英文或数字" show-cancel-button @confirm="handleConfirm">
      <div class="inputWrapper">
        <van-field
          v-model="code"
          center
          clearable
          label=""
          placeholder=""
        >
        </van-field>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import router from '@/router';
import wx from "weixin-jsapi";

import { getWechatConfig } from '@/api/index';

import LOGO from '@/assets/logo.png';
import PRO_TOP from '@/assets/pro-top.png';
import PRO_BODY from '@/assets/pro-body.png';
import PRO_IN from '@/assets/pro-in.png';

export default {
  components: { QrcodeStream },

  data() {
    return {
      key: '',
      code: 'F2755F1A5B8B',
      paused: true,
      result: '',
      showScanConfirmation: false,
      show: false,
      LOGO,
      PRO_TOP,
      PRO_BODY,
      PRO_IN,
    }
  },

  mounted() {
    this.handleGetWechatConfig();
  },

  methods: {
    handleOpenInput() {
      this.show = true;
    },
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

    handleConfirm() {
      router.push({
        path: '/scanCodeSuccess',
        query: {
          codeStr: this.code
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
.logo {
  height: 32px;
}

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

.inputWrapper{
  width: 90%;
  border: 1px solid #333;
  margin: 20px auto;
  border-radius: 6px;
  padding: 4px;
}
</style>