import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import globalMixin from './global/mixin.js';
import './styles/common.less';

import { Button, Col, Row, Cell, CellGroup, Uploader, Field, Popup, Form, DatetimePicker, NoticeBar, Card, Grid, GridItem, Image as VanImage, Tag, Dialog } from 'vant';

document.addEventListener('gesturestart', function (event) {
  event.preventDefault();
});

createApp(App)
  .use(Dialog)
  .use(Tag)
  .use(Grid)
  .use(VanImage)
  .use(GridItem)
  .use(NoticeBar)
  .use(Card)
  .use(Button)
  .use(DatetimePicker)
  .use(Form)
  .use(Popup)
  .use(Field)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(CellGroup)
  .use(Uploader)
  .use(router)
  .mixin(globalMixin)
  .mount('#app');
