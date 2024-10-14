export default {
  methods: {
    setState(data = {}, callback) {
      Object.entries(data).forEach(([key, value]) => {
        this[key] = value;
      });

      if (callback) {
        this.$nextTick(() => {
          callback();
        })
      }
    },
  },
};
