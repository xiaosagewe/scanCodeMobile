<template>
  <div>
    <div class="van-safe-area-top"></div>
    <van-notice-bar
      left-icon="volume-o"
      text="尊敬的客户，感谢您购买胜威塑料原厂生产产品！"
    />
    <div>
      <qrcode-stream
        :paused="paused"
        @detect="onDetect"
        @camera-on="onCameraOn"
        @camera-off="onCameraOff"
        @error="onError"
      >
        <!-- <div
          v-show="showScanConfirmation"
          class="scan-confirmation"
        >
        </div> -->
      </qrcode-stream>
      <van-field
        v-model="code"
        center
        clearable
        label=""
        placeholder="请扫描产品防伪认证二维码"
        style="margin-bottom: 20px"
      >
        <template #button>
          <van-button block size="small" icon="scan" type="primary" native-type="submit" @click="() => { handleScan('') }">
            扫一扫
            <!-- <template #icon>
              <van-button block size="small" type="primary" native-type="submit" @click="() => { handleScan('') }">
                扫一扫
              </van-button>
            </template> -->
          </van-button>
        </template>
      </van-field>
      <van-grid :column-num="2" direction="horizontal">
        <van-grid-item icon="photo-o" text="文字">
          <van-image
            src="https://img2.baidu.com/it/u=646717384,2899469166&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
          />
        </van-grid-item>
        <van-grid-item icon="info-o" text="提示：防伪认证二维码位于产品介绍标签下方"></van-grid-item>
      </van-grid>
    </div>
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
      code: '22cb3469456e48629598192fff1333df',
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
        url: 'https://rs.svetia.cn',
      }).then(({ code, data, msg }) => {
        if (code === 200) {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx845025ef991271f6', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ["scanQRCode"], // 必填，需要使用的JS接口列表, 这里只需要调用扫一扫
          });
        } else {
          alert(msg)
        }
      })
    },
    handleScan(num) {
      if (this.code) {
        router.push({
          path: '/codeDetail',
          query: {
            codeStr: this.code,
          },
        });
      } else {
        // this.paused = false;
        // this.key = `code${num}`;
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // 扫码成功，跳转到二维码指定页面（res.resultStr为扫码返回的结果）
            // window.location.replace(res.resultStr);
            setTimeout(() => {
              window.location.replace(res.resultStr);
            }, 2000);
          },
        });
      }
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
</style>