<template>
  <div style="padding: 16px;">
    <div class="van-safe-area-top"></div>
    <van-nav-bar title="扫码入库" style="margin-top: -16px;margin-bottom: 16px;" />
    <van-field
      :style="{ border: activeInput === 1 ? '1px solid red' : 'none', fontSize: '20px', wordBreak: 'break-all' }"
      size="large"
      v-model="scanBody"
      ref="scanBodyRef"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入瓶身码"
    >
      <template #label>
        <div style="font-size: 20px;">扫瓶身</div>
      </template>
    </van-field>
    <van-field
      :style="{ border: activeInput === 2 ? '1px solid red' : 'none', fontSize: '20px' }"
      size="large"
      v-model.trim="scanHead"
      ref="scanHeadRef"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入瓶盖码"
    >
      <template #label>
        <div style="font-size: 20px;">扫瓶盖</div>
      </template>
    </van-field>
    <van-field
      style="font-size: 20px;"
      size="large"
      v-model="password"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入密码"
    >
      <template #label>
        <div style="font-size: 20px;">密码</div>
      </template>
    </van-field>
    <van-field
      style="font-size: 20px; margin-bottom: 16px"
      size="large"
      v-model="pageType"
      rows="1"
      autosize
      type="textarea"
      placeholder=""
      disabled
    >
      <template #label>
        <div style="font-size: 20px;">机器码</div>
      </template>
    </van-field>
    <div class="ScanConfirmBtnWrapper">
      <van-button type="primary" size="large" style="margin-right: 16px;" @click="handleReset">开始/重置</van-button>
      <van-button size="large" @click="handleSave">保存</van-button>
    </div>
    <div class="coeListItemWrapper" style="background-color: #eee;" >
      <div class="codeItemTitle width1">瓶身码</div>
      <div class="codeItemTitle width2">瓶盖码</div>
      <div class="codeItemTitle width3">机器码</div>
      <div class="codeItemTitle width2">扫入时间</div>
    </div>
    <LazyList ref="listRef" :api="handleGetCodePage">
      <template #item="item">
        <div :key="item.id" class="coeListItemWrapper" >
          <div class="codeItemTitle width1">{{ item.code }}</div>
          <div class="codeItemTitle width2">{{ item.code2 }}</div>
          <div class="codeItemTitle width3">{{ item.type }}</div>
          <div class="codeItemTitle width2">{{ item.createTime }}</div>
        </div>
      </template>
    </LazyList>
    <!-- <van-list
      :finished="true"
      finished-text="没有更多了"
    >
      <div v-for="item in list" :key="item.id" class="coeListItemWrapper" >
        <div class="codeItemTitle width1">{{ item.code }}</div>
        <div class="codeItemTitle width2">{{ item.code2 }}</div>
        <div class="codeItemTitle width3">{{ item.type }}</div>
        <div class="codeItemTitle width2">{{ item.createTime }}</div>
      </div>
    </van-list> -->
    <div class="van-safe-area-bottom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import router from '@/router';
import { Toast } from 'vant';
import LazyList from '@/components/lazy-list/index.vue';

import { saveCode, getCodePage } from '@/api/codeScanToStore';

const test1 = '';
const test2 = '';

const password = ref('1234');
const activeInput = ref(1);
const scanBody = ref('');
const scanBodyRef = ref();
const scanHead = ref('');
const scanHeadRef = ref();
const pageType = ref('');

const listRef = ref();

const handleGetCodePage = (pageOpt) => {
  return new Promise((resolve, reject) => {
    getCodePage({
      type: pageType.value,
      password: password.value,
      pageInfo: {
        pageIndex: pageOpt.page,
        pageSize: pageOpt.limit,
      },
    })
      .then((res) => {
        if (res.code === 200) {
          resolve({
            data: res?.data?.records || [],
            count: res?.data?.total,
          });
        } else {
          reject(res);
        }
        // list.value = res?.data?.records || [];
      });
  })
};

const handleSave = () => {
  if (scanBody.value && scanHead.value) {
    saveCode({
      type: pageType.value,
      code: scanBody.value,
      code2: scanHead.value,
      password: password.value,
    }).then(({ code, msg }) => {
      if (code !== 200) {
        Toast.fail(msg);
      } else {
        Toast.success({
          message: msg,
          duration: 1000,
        });
      }
      handleReset();
      listRef?.value?.search()
    });
  } else {
    Toast.fail('存在空值！请重新扫码！');
  }
};

const handleReset = () => {
  scanBody.value = '';
  scanHead.value = '';
  activeInput.value = 1;
  scanBodyRef.value.focus();
};

onMounted(() => {
  scanBodyRef.value.focus();
  scanBody.value = test1;
  pageType.value = router.currentRoute.value.query.type;

  document.onkeydown = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault();

      if (activeInput.value === 1 && scanBody.value) {
        activeInput.value = 2;
        scanHeadRef.value.focus();
        scanHead.value = test2;
      } else if (activeInput.value === 2 && scanHead.value) {
        handleSave();
      }
    }
  }
});

</script>

<style scoped lang="scss">
.coeListItemWrapper {
  display: flex;
  border: 1px solid #eee;
  border-right: none;

  .codeItemTitle {
    border-right: 1px solid #eee;
    word-break: break-all;
    padding:8px;
    flex-grow: 1;
  }

  .width1 {
    width: 40%;
  }
 
  .width2 {
    width: 20%;
  }

  .width3 {
    width: 20%;
  }
}

.ScanConfirmBtnWrapper {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
</style>