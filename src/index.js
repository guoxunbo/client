import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import '@alifd/next/reset.scss';
import router from './router';
import "antd/dist/antd.css";
import globalStyles from './global.scss';
import '@api/Extend';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Application } from '@api/Application';
//import 'antd-mobile/dist/antd-mobile.css';
moment.locale('zh-cn');

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

document.title=Application.name;

ReactDOM.render(<HashRouter>{router}</HashRouter>, ICE_CONTAINER);

