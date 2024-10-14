import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from "vue-router"
import { login } from '@/api/index';

import styles from './index.module.less';

const router = useRouter()

export default {
  methods: {
    handleScan() {
      var html5QrCode = new Html5Qrcode("reader")
      const close = () => {
        html5QrCode.stop().finally(() => {
          html5QrCode.clear()
          // router.push('/index')
        })
      }
      const callbackSuccess = (res) => {
        close();
        login({ code: res })
          .then((r) => {
            alert(`${res}, 识别成功，已保存入库。`);
            console.log(r);
          })
      };

      const callbackFailure = (res) => {
        console.log('fail', res)
      };

      // 获取相机设备
      Html5Qrcode.getCameras()
      .then(devices => {
        // 扫码配置
        const config = {
          fps: 10, //  二维码扫描每秒帧数
          qrbox: { width: 300, height: 300 }, // UI框的大小
          aspectRatio: 1.777778,  // 纵横比,此值表示全屏
        }
        if (devices && devices.length) {
          const cameraId = devices[devices.length - 1].id //后置摄像头，一般最后一个是后置摄像头
          //let cameraId = devices[0].id //前置摄像头
          // 打开相机，开始扫描，callbackSuccess, callbackFailure扫描成功与失败的回调函数（自行定义）
          html5QrCode.start({ deviceId: { exact: cameraId } }, config, callbackSuccess, callbackFailure).catch(err => {
            alert(err)
          })
        } else {
          // 如果没有找到设备，直接启用摄像头
          //environment：后置摄像头  user：前置摄像头
          html5QrCode.start({ facingMode: "environment" }, config, callbackSuccess, callbackFailure).catch(err => {
            alert(err)
          })
        }
      })
      .catch(err => {
        alert(err)
      })

    },
  },

  render() {
    return (
      <div class={styles.Index}>
        <div id='reader' class={styles.ScanWrapper}></div>
        <van-button class={styles.submit} block type="info" native-type="submit" onClick={this.handleScan}>扫一扫</van-button>
      </div>
    );
  },
};