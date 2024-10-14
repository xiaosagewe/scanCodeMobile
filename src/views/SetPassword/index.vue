<template>
  <div class="fullwrapperCenter">
    <van-row>
      <van-col span="24">
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
        />
      </van-col>
      <van-col span="23" style="margin-top: 20px;" >
        <van-button block type="primary" @click="handleSave">保存</van-button>
      </van-col>
    </van-row>
  </div>
  
</template>

<script setup>
import { ref } from 'vue';

import { savePassword } from '@/api/index';

const password = ref('');

const handleSave = () => {
  savePassword({ password: password.value }).then(({ code, data, msg }) => {
    if (code === 200) {
      alert('保存成功');
    } else {
      alert(msg)
    }
  })
};

</script>

<style lang="less">
.fullwrapperCenter {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
