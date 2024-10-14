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
import { login } from '@/api/index';

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

  methods: {
    handleScan(num) {
      if (this.code) {
        router.push({
          path: '/codeDetail',
          query: {
            codeStr: this.code,
          },
        });
      } else {
        this.paused = false;
        this.key = `code${num}`;
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

      console.log(str);

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