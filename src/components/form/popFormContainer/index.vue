<template>
  <van-popup :show="props.show" position="bottom" closeable @close="handleClose">
    <card :show-title="false"><div style="text-align: center; font-weight: bold;" class="padding8">筛选</div></card>
    <van-form>
      <slot></slot>
    </van-form>
    <div class="justifyBetween padding8">
      <van-button type="primary" style="width: 48%" plain round block @click="handleReset">重置</van-button>
      <van-button type="primary" style="width: 48%" block round @click="handleSubmit">{{ confirmText }}</van-button>
    </div>
  </van-popup>
</template>

<script setup>
  import card from '@/components/card/index.vue';

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    confirmText: {
      type: String,
      default: '查询'
    },
  });

  const emit = defineEmits(['update:show', 'confirm', 'reset']);

  const handleClose = () => {
    emit('update:show', false);
  };

  const handleSubmit = () => {
    emit('update:show', false);
    emit('confirm');
  };

  const handleReset = () => {
    // emit('update:show', false);
    emit('reset');
  };
</script>
