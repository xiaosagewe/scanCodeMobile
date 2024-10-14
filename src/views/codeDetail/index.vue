<template>
    <div>
      <div class="van-safe-area-top"></div>
      <van-notice-bar
        left-icon="volume-o"
        text="尊敬的客户，感谢您购买胜威塑料原厂生产产品！"
      />
      <van-button style="margin-top: 20px;" type="primary" icon="info-o" size="small">商品信息</van-button>
      <van-cell-group style="margin-bottom: 20px;">
        <van-cell title="产品图片">
          <van-image
            width="80"
            height="80"
            src="https://img14.360buyimg.com/pop/jfs/t1/214373/10/12019/836979/62038e1eEe00f1dbd/0d8de10b86606890.png"
          />
        </van-cell>
        <van-cell title="产品名称" :value="detail.name" />
        <van-cell title="产品型号" :value="detail.type" />
        <van-cell title="使用范围" :value="detail.scope" />
        <van-cell title="净含量" :value="detail.netContent" />
        <van-cell title="保质期" :value="detail.expirationYear" />
        <van-cell title="执行标准" :value="detail.standard" />
      </van-cell-group>
      <van-button type="primary" icon="qr" size="small">防伪信息</van-button>
      <van-cell-group>
        <van-cell title="桶身防伪码" :value="detail.code" />
        <van-cell title="瓶口（外）防伪码" :value="detail.code2" />
        <van-cell title="瓶口（内）防伪码" :value="detail.code3" />
        <van-cell title="创建时间" :value="detail.createTime" />
        <van-cell title="首次扫码时间" :value="detail.firstTime" />
        <van-cell title="上次扫码时间" :value="detail.lastTime" />
        <van-cell title="被查询次数" :value="detail.queryTime">
          <van-tag type="danger" round size="large">{{ detail.queryTime }} 次</van-tag>
        </van-cell>
      </van-cell-group>
      <div class="van-safe-area-bottom"></div>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  import { getDetailByCode } from '@/api/index';
  
  export default {
    data() {
      return {
        detail: {},
      }
    },

    mounted() {
      this.handleGetDetail();
    },
  
    methods: {
      handleGetDetail() {
        const codeStr = router?.currentRoute?.value?.query?.codeStr;

        if (!codeStr) {
          return;
        }

        getDetailByCode({ codeStr })
          .then(({ code, data, msg }) => {
            console.log(data);
            if (code === 200) {
              this.detail = data;
            } else {
              alert(msg)
            }
          });
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