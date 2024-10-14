const API_URL = {
  webSocketUrl: process.env.VUE_APP_SOCKET, // websocket 服务地址
  iframeUrl: process.env.VUE_APP_IFRAME, // iframe 加载地址
  dangerIframeUrl: process.env.VUE_APP_DANGER_IFRAME, // 危险源iframe 加载地址
  picService: process.env.VUE_APP_PICSERVICE, // 图片服务
};

export default API_URL;
