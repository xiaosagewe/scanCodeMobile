<template>
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
    <van-row :gutter="20">
      <van-col :span="12">
        <van-button block type="success" native-type="submit" @click="() => { handleScan('') }">第一个</van-button>
      </van-col>
      <van-col :span="12">
        <van-button block type="success" native-type="submit" @click="() => { handleScan('2') }">第二个</van-button>
      </van-col>
      <van-col :span="24">
        <van-cell-group>
          <van-cell title="结果一:" :label="code" />
          <van-cell title="结果二:" :label="code2" />
        </van-cell-group>
      </van-col>
      <van-col span={24}>
        <van-button block type="primary" native-type="submit" @click="handleSave">保存</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { login } from '@/api/index';

console.log(window.BarcodeDetector);

export default {
  components: { QrcodeStream },

  data() {
    return {
      key: '',
      code: '',
      code2: '',
      paused: true,
      result: '',
      showScanConfirmation: false
    }
  },

  methods: {
    handleScan(num) {
      this.paused = false;
      this.key = `code${num}`;
    },
    handleSave() {
      login({ code: this.code, code2: this.code2 })
      .then(({ code, data, msg }) => {
        if (code === 200) {
          alert(data);
          this.code = '';
          this.code2 = '';
        } else {
          alert(msg)
        }
      })
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
      const str = JSON.stringify(detectedCodes.map((code) => code.rawValue));
      this[this.key] = str;

      this.paused = true;

      alert(`${str}, 扫码成功！`);
      // await this.timeout(500)
      // this.paused = false
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