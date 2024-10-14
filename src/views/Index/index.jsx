import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from "vue-router";
import moment from 'moment';

import { login, clQrCode, uploadImg, sendToMail } from '@/api/index';

import styles from './index.module.less';

const router = useRouter()

export default {
  data() {
    return {
      code: '',
      code2: '',
      html5QrCode: null,
      password: '',
      showPicker: false,
      date: new Date(),
      formatDate: moment().format('YYYY-MM-DD'),
    };
  },
  computed: {
    
  },
  methods: {
    handleScan(num) {
      const close = () => {
        this.html5QrCode.stop().finally(() => {
          this.html5QrCode.clear()
          // router.push('/index')
        })
      }
      const callbackSuccess = (res) => {
        this[`code${num}`] = res;
        close();
        alert(`${res}, 识别成功！`);
      };

      const callbackFailure = (res) => {
        console.log('fail', res)
      };

      // 获取相机设备
      Html5Qrcode.getCameras()
      .then(devices => {
        // 扫码配置
        const config = {
          fps: 24, //  二维码扫描每秒帧数
          qrbox: { width: 300, height: 300 }, // UI框的大小
          aspectRatio: 1.777778,  // 纵横比,此值表示全屏
        }
        if (devices && devices.length) {
          const cameraId = devices[devices.length - 1].id //后置摄像头，一般最后一个是后置摄像头
          //let cameraId = devices[0].id //前置摄像头
          // 打开相机，开始扫描，callbackSuccess, callbackFailure扫描成功与失败的回调函数（自行定义）
          this.html5QrCode.start({ deviceId: { exact: cameraId } }, config, callbackSuccess, callbackFailure).catch(err => {
            alert(err)
          })
        } else {
          // 如果没有找到设备，直接启用摄像头
          //environment：后置摄像头  user：前置摄像头
          this.html5QrCode.start({ facingMode: "environment" }, config, callbackSuccess, callbackFailure).catch(err => {
            alert(err)
          })
        }
      })
      .catch(err => {
        alert(err)
      })
    },
  },

  mounted() {
    this.html5QrCode = new Html5Qrcode("reader")
    // clQrCode();
  },

  render() {
    return (
      <div class={styles.Index}>
        <div id='reader' class={styles.ScanWrapper}></div>
        <van-row gutter={20}>
          <van-col span={12}>
            <van-uploader after-read={this.afterRead}>
              <van-button block type="success" native-type="submit">第一个</van-button> 
            </van-uploader>
            <van-button v-show={false} block type="success" native-type="submit" onClick={() => { this.handleScan('') }}>第一个</van-button> 
          </van-col>
          <van-col span={12}>
            <van-uploader after-read={this.afterRead2}>
              <van-button block type="success" native-type="submit">第二个</van-button> 
            </van-uploader>
            <van-button v-show={false} block type="success" native-type="submit" onClick={() => { this.handleScan('2') }}>第二个</van-button>
          </van-col>
        </van-row>
      </div>
    );
  },
};