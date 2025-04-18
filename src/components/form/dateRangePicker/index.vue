<template>
  <van-field is-link="" :label="props.label" placeholder="请输入日期" readonly @click="dateRangeShow = true">
    <template #input>
      <van-icon name="calendar-o" class="mr4" /> {{ props.startDate }} -<van-icon name="calendar-o" class="mr4 ml4" /> {{ props.endDate }}
    </template>
  </van-field>
  <van-popup v-model:show="dateRangeShow" position="bottom">
    <van-picker-group
      title="日期范围"
      :tabs="['开始日期', '结束日期']"
      @confirm="onDateConfirm"
      @cancel="onDateCancel"
    >
      <van-date-picker :model-value="props.startDate.split('-')" @change="handleStartChange" />
      <van-date-picker :model-value="props.endDate.split('-')" @change="handleEndChange" />
    </van-picker-group>
  </van-popup>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['confirm', 'update:startDate', 'update:endDate']);

const dateRangeShow = ref(false);
const newStart = ref('');
const newEnd = ref('');

const handleStartChange = (val) => {
  newStart.value = val.selectedValues.join('-');
};

const handleEndChange = (val) => {
  newEnd.value = val.selectedValues.join('-');
};

const onDateConfirm = (value) => {
  dateRangeShow.value = false;
  emit('update:startDate', newStart.value);
  emit('update:endDate', newEnd.value);
};

const onDateCancel = () => {
  dateRangeShow.value = false;
};

watch(
  () => dateRangeShow.value,
  () => {
    if (dateRangeShow.value) {
      newStart.value = props.startDate;
      newEnd.value = props.endDate;
    }
  }
);

</script>
