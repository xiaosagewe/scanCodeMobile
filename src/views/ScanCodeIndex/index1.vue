<template>
  <div>
    <div class="van-safe-area-top"></div>
    <div class="topBar">
      <div class="title">防伪查询</div>
      <div class="desc">
        <div>ANTI -</div>
        <div>COUNTERFEITING</div>
      </div>
    </div>
    <div class="contentWrapper">
      <div class="bigTitle">尊敬的客户</div>
      <div class="subTitle">感谢您使用胜威塑料防伪查询</div>
      <div class="inputWrapper">
        <van-field
          v-model="code"
          center
          clearable
          label=""
          placeholder="请扫描产品防伪认证二维码"
        >
          <template #button>
            <van-icon name="scan" size="28" style="cursor: pointer;" @click="() => { handleScan('') }" />
            <!-- <van-button block size="small" icon="scan" type="primary" native-type="submit" @click="() => { handleScan('') }">
            </van-button> -->
          </template>
        </van-field>
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item icon="photo-o" text="文字" >
          <template #icon>
            <van-image
              :src="PRO_TOP"
            />
          </template>
          <template #text>
            <div class="smallText">桶盖上的码在这里</div>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字" >
          <template #icon>
            <van-image
              :src="PRO_TOP"
            />
          </template>
          <template #text>
            <div class="smallText">桶盖内的码在这里</div>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字" >
          <template #icon>
            <van-image
              :src="PRO_BODY"
            />
          </template>
          <template #text>
            <div class="smallText">桶身上的码在这里</div>
          </template>
        </van-grid-item>
      </van-grid>
      <van-button type="primary" class="searchBtn" @click="handleConfirm">查询防伪信息</van-button>
    </div>
    <div class="van-safe-area-bottom"></div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import router from '@/router';
import wx from "weixin-jsapi";

import { getWechatConfig } from '@/api/index';

import PRO_TOP from '@/assets/pro-top.png';
import PRO_BODY from '@/assets/pro-body.png';

export default {
  components: { QrcodeStream },

  data() {
    return {
      key: '',
      // code: 'F2755F1A5B8B',
      code: '',
      PRO_TOP,
      PRO_BODY,
    }
  },

  mounted() {
    this.handleGetWechatConfig();
  },

  methods: {
    handleGetWechatConfig() {
      getWechatConfig({
        url: 'https://rs.svetia.cn/codeManageMobile/#/scanCodeIndex1',
      }).then(({ code, data, msg }) => {
        if (code === 200) {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx054c52e568b730c4', // 必填，公众号的唯一标识
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
      let _this = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          // 扫码成功，跳转到二维码指定页面（res.resultStr为扫码返回的结果）

          _this.code = res.resultStr;
        },
      });
    },

    handleConfirm() {
      if (!this.code) {
        alert('请输入防伪码');

        return;
      }
      router.push({
        path: '/scanCodeSuccess1',
        query: {
          codeStr: this.code
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
.topBar {
  background-color: blue;
  padding: 16px;
  display: flex;
  align-items: center;

  .title {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    padding-right: 8px;
    border-right: 2px solid #fff;
    line-height: 1;
  }

  .desc {
    color: #fff;
    font-weight: bold;
    padding-left: 8px;
    font-size: 12px;
  }
}

.contentWrapper {
  padding: 16px;

  .bigTitle {
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 4px solid #333;
    line-height: 2;
    margin-bottom: 8px;
  }

  .subTitle {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 6vh;
  }

  .inputWrapper {
    border: 1px solid #333;
    border-radius: 4px;
    padding: 2px;
    margin-bottom: 6vh;
  }

  .smallText {
    font-size: 12px;
    color: #333;
  }

  .searchBtn {
    display: block;
    width: 66vw;
    margin: 0 auto;
    margin-top: 6vh;
  }
}
</style>