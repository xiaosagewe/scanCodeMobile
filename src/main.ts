import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import globalMixin from './global/mixin.js';
import './styles/common.less';

import { Button, Col, Row, Cell, CellGroup, Uploader, Field, Popup, Form, DatetimePicker, Picker, NoticeBar, PullRefresh, Card, Grid, GridItem, Image as VanImage, Tag, Dialog, Icon, Toast, List, NavBar } from 'vant';

document.addEventListener('gesturestart', function (event) {
  event.preventDefault();
});

createApp(App)
  .use(Icon)
  .use(Dialog)
  .use(Tag)
  .use(Grid)
  .use(VanImage)
  .use(GridItem)
  .use(NoticeBar)
  .use(Card)
  .use(Button)
  .use(DatetimePicker)
  .use(Picker)
  .use(Form)
  .use(Popup)
  .use(Field)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(CellGroup)
  .use(Uploader)
  .use(Toast)
  .use(List)
  .use(NavBar)
  .use(PullRefresh)
  .use(router)
  .mixin(globalMixin)
  .mount('#app');
