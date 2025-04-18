<template>
  <van-field :border="false" required v-model="props.value" label="所在地区" readonly is-link placeholder="请选择地区" :rules="[{ required: true, message: '请选择地区' }]" @click="show = true" />
  <van-popup v-model:show="show" position="bottom">
    <van-cascader
      :model-value="props.areaValue"
      title="请选择所在地区"
      :field-names="fieldNames"
      :options="areaTree"
      @close="show = false"
      @finish="onOriginFinish"
    />
  </van-popup>
</template>

<script setup>
import { ref } from 'vue';

import AREA_MAP from '@/assets/area.json';

const fieldNames = {
  text: 'name',
  value: 'name',
};

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  areaValue: {
    type: String,
    default: '',
  },
  fields: {
    type: Array,
    default: ['province', 'city', 'region', 'township'],
  },
});

const emit = defineEmits(['update:value', 'update:areaValue', 'confirm']);

const areaTree = ref(AREA_MAP);
const show = ref(false);

const onOriginFinish = ({ selectedOptions }) => {
  show.value = false;

  emit('update:value', selectedOptions.map((o, index) => {
    if (index === selectedOptions.length - 1) {
      emit('update:areaValue', o.name);
    }
    return o.name;
  }).join(''));
  emit('confirm', selectedOptions);
};

</script>
