<template>
  <van-field
    v-if="props.styleMode === 'field'"
    :border="props.border"
    :label-width="props.labelWidth"
    :required="props.required"
    :model-value="myMap[`${props.popValue}`]?.text"
    readonly
    :label="props.label"
    :style="props.noPadding ? { padding: 0 } : {}"
    is-link
    :placeholder="props.placeholder"
    :rules="props.rules"
    @click.stop="showPicker = true"
  />
  <div v-if="props.styleMode === 'select'" style="font-size: 14px; display: flex; align-items: center;" @click.stop="showPicker = true">
    <div>{{ props.label }}</div>
    <div style="border: 1px solid #eee; padding: 1vw 2.13vw; border-radius: 1vw;" class="justifyBetween">{{ myMap[props.popValue]?.text }} <van-icon name="arrow-down" class="gray ml4" /></div>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom" teleport="html">
    <van-picker
      :title="props.popTitle"
      :model-value="[props.popValue]"
      :columns="props.popColumns"
      @confirm="handleConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script setup>
import { computed, ref } from 'vue';

const showPicker = ref(false);

const props = defineProps({
  styleMode: {
    type: String,
    default: 'field',
  },
  border: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: String,
    default: '6.2em',
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: '请选择',
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  rules: {
    type: Array,
    default: [],
  },
  popValue: {
    type: String,
    default: '',
  },
  popTitle: {
    type: String,
    default: '',
  },
  popColumns: {
    type: Array,
    default: [],
  },
  popColumnsMap: {
    type: Object,
    default: {},
  },
});

const myMap = computed(() => {
  const gettedMap = {};

  props.popColumns.forEach((o) => {
    gettedMap[`${o.value}`] = { text: o.text };
  });

  return gettedMap;
});

const emit = defineEmits(['update:popValue', 'confirm']);

const handleConfirm = (opt, index) => {
  showPicker.value = false;
  emit('update:popValue', opt.value);
  emit('confirm', value);
};
</script>
