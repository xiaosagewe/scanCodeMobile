<template>
  <van-field is-link="" :label="props.label" placeholder="请输入日期" readonly @click="dateRangeShow = true">
    <template #input>
      <van-icon name="calendar-o" class="mr4" /> {{ props.date }}
    </template>
  </van-field>
  <van-popup v-model:show="dateRangeShow" position="bottom">
    <van-datetime-picker
      :model-value="props.date"
      type="date"
      title="选择年月日"
      @change="handleStartChange"
      @confirm="onDateConfirm"
      @cancel="onDateCancel"
    />
  </van-popup>
</template>

<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['confirm', 'update:startDate', 'update:endDate']);

const dateRangeShow = ref(false);
const newStart = ref('');

const handleStartChange = (val) => {
  console.log(val);
  newStart.value = moment(val).format('YYYY-MM-DD');
};

const onDateConfirm = (value) => {
  dateRangeShow.value = false;
  emit('update:date', newStart.value);
};

const onDateCancel = () => {
  dateRangeShow.value = false;
};

</script>
