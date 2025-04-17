<template>
  <van-pull-refresh v-model="refreshing" @refresh="search">
    <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了"
      @load="onLoad">
      <div v-for="(item, index) in state.list" :key="item">
        <slot name="item" v-bind="item" :index="index"></slot>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { nextTick, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'LazyList',
  props: {
    api: {
      type: Function,
      required: true,
    },
    searchParams: {
      type: Object,
      default: {}
    },
  },
  setup(props) {
    const route = useRoute();
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      pageProps: {
        page: 1,
        limit: 10,
      },
      leave: false,
    });
    const refreshing = ref(false);

    const onLoad = async () => {
      try {
        const { data = [], count = 0 } = await props.api({ ...props.searchParams, ...state.pageProps });

        state.loading = false;
        state.list = [...state.list, ...data];
        if (state.list.length >= count) {
          state.finished = true;
        } else {
          state.pageProps.page++;
        }

        if (refreshing.value) {
          refreshing.value = false;
        }
      } catch (err) {
        state.finished = true;
        if (refreshing.value) {
          refreshing.value = false;
        }
      } finally {
        state.loading = false;
        if (refreshing.value) {
          refreshing.value = false;
        }
      }
    };

    const search = () => {
      state.finished = false;
      state.list = [];
      state.pageProps.page = 1;
      state.loading = true;

      nextTick(() => {
        onLoad();
      });
    };

    const editRow = (index, opt) => {
      state.list[index] = { ...state.list[index], ...opt };
    };

    return {
      route,
      state,
      refreshing,
      onLoad,
      search,
      editRow,
    };
  },
};
</script>
