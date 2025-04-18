<template>
  <van-field is-link="" :model-value="unitNameMap[props.unitCode]" label="经销商编码" placeholder="请选择经销商编码" readonly @click="show = true"/>
  <van-popup v-model:show="show" position="bottom" class="h-[30%]">
    <van-picker
      title="经销商"
      :model-value="[props.unitCode]"
      :columns="unitList"
      @confirm="handleOnConfirm"
      @cancel="show = fasle"
    />
  </van-popup>
</template>

<script setup>
import { getDealerByCode } from '@/api/common';
import { ref } from 'vue';

const props = defineProps({
  unitCode: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:unitCode', 'confirm']);

const unitNameMap = ref({ '': '全部', });
const show = ref(false);
const unitList = ref([]);

const initOrigins = async () => {

  const username = localStorage.getItem('username');
  const arr = await getDealerByCode(username);
  const nameMapObj = {
    '': '全部',
  };

  const formatArr = arr.map((o) => {
    const str = `${o.unitCode}(${o.unitName})`;
    nameMapObj[o.unitCode] = str;
    return {
      text: str,
      value: o.unitCode,
    };
  });
  unitList.value = [{ text: '全部', value: '' }].concat(formatArr);
  unitNameMap.value = nameMapObj;
};

const handleOnConfirm = ({ selectedOptions }) => {
  show.value = false;

  emit('update:unitCode', selectedOptions[0].value);
  emit('confirm', selectedOptions[0]);
};

initOrigins();

</script>
