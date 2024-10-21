<template>
    <div style="padding: 16px; background-color: #efefef; height: 100vh">
      <div class="van-safe-area-top"></div>
      <div class="card">
        <div class="cardTitle">防伪信息</div>
        <div class="cardItem special">当前防伪码是第 <van-tag type="danger" round size="large">{{ detail.queryTime }}</van-tag> 次查询</div>
        <div class="cardItem">
          <div class="cardItemTitle">桶身防伪码</div>
          <div class="cardItemContent">{{ detail.code }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">油嘴（外）防伪码</div>
          <div class="cardItemContent">{{ detail.code2 }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">油嘴（内）防伪码</div>
          <div class="cardItemContent">{{ detail.code3 }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">首次扫码时间</div>
          <div class="cardItemContent">{{ detail.firstTime }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">上次扫码时间</div>
          <div class="cardItemContent">{{ detail.lastTime }}</div>
        </div>
      </div>
      <div class="card">
        <div class="cardTitle">商品信息</div>
        <div class="cardItem">
          <div class="cardItemTitle">产品名称</div>
          <div class="cardItemContent">{{ detail.name }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">产品型号</div>
          <div class="cardItemContent">{{ detail.type }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">使用范围</div>
          <div class="cardItemContent">{{ detail.scope }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">净含量</div>
          <div class="cardItemContent">{{ detail.netContent }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">保质期</div>
          <div class="cardItemContent">{{ detail.expirationYear }}</div>
        </div>
        <div class="cardItem">
          <div class="cardItemTitle">执行标准</div>
          <div class="cardItemContent">{{ detail.standard }}</div>
        </div>
      </div>
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
              router.push({
              path: '/scanCodeFail',
              query: {
                scanPath: '/scanCodeIndex'
              },
            });
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

  .card {
    background-color: #fff;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 16px;

    .cardTitle {
      color: #333;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 4px;
    }

    .cardItem {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.special {
        justify-content: flex-start;
        margin-bottom: 4px;
      }

      .cardItemTitle {
        color: #999;
        font-size: 16px;
      }

      .cardItemContent {
        color: #333;
        font-size: 16px;
      }
    }
  }
  </style>