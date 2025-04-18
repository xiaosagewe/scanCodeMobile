<template>
  <div v-if="props.styleMode === 'productList'" class="padding8" style="font-weight: bold;font-size: 3.8vw;" @click="originShow = true">
    {{ originNameMap[props.originCode] }} <van-icon name="arrow-down" class="ml4" />
  </div>
  <van-field v-if="props.styleMode === 'field'" :label-width="props.labelWidth" is-link="" :model-value="originNameMap[props.originCode]" label="基地" placeholder="请选择基地" readonly @click="originShow = true" style="background-color: transparent;"/>
  <van-popup v-model:show="originShow" position="bottom" class="h-[30%]">
    <van-picker
      title="基地"
      :model-value="[props.originCode]"
      :columns="originList"
      @confirm="onOriginConfirm"
      @cancel="originShow = fasle"
    />
  </van-popup>
</template>

<script setup>
import { getOriginList } from '@/api/common';
import { ref } from 'vue';

const props = defineProps({
  styleMode: {
    type: String,
    default: 'field',
  },
  labelWidth: {
    type: String,
    default: '6.2em',
  },
  mode: {
    type: String,
    default: 'code',
  },
  originCode: {
    type: String,
    default: '',
  },
  isStraight: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:originCode', 'confirm', 'dataInit']);

const originNameMap = ref({ '': '全部', });
const originShow = ref(false);
const originList = ref([]);

// 基地列表
const initOrigins = async () => {
  // 基地
  const arr = await getOriginList({
    page: 1,
    limit: 1000
  });
  const nameMapObj = {
    '': '全部基地',
  };

  const formatArr = arr.filter(o => props.isStraight ? o.originType === 1 : true).map((o) => {
    if (props.mode === 'name') {
      nameMapObj[o.shortName] = o.shortName;
    } else {
      nameMapObj[o.originCode] = o.shortName;
    }
    return {
      text: o.shortName,
      value: props.mode === 'name' ? o.shortName : o.originCode,
      originType: o.originType,
    };
  });
  emit('dataInit', formatArr);
  originList.value = [{ text: '全部', value: '' }].concat(formatArr);
  originNameMap.value = nameMapObj;

};

const onOriginConfirm = ({ selectedOptions }) => {
  originShow.value = false;

  emit('update:originCode', selectedOptions[0].value);
  emit('confirm', selectedOptions[0]);
};

initOrigins();

</script>
