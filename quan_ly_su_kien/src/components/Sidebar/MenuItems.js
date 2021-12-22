// import React from 'react';
// import * as RiIcons from 'react-icons/ri';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import * as GiIcons from 'react-icons/gi';
// import * as GrIcons from 'react-icons/gr';
import logo from "../../asset/img/logo.png";
import past_event from "../../asset/img/past_even.png";
import love_event from "../../asset/img/love_event.png";
import language from "../../asset/img/language.png";
import theme from "../../asset/img/theme.png";
import setting from "../../asset/img/setting.png";
import logout from "../../asset/img/logout.png";

export const MenuItems = [
  {
    title: 'Tên đăng nhập',
    path: '/',
    icon: logo, //fix later
    cName: 'nav-text nav-username'
  },
  {
    title: 'Sự kiện đã qua',
    path: '/eventended',
    icon: past_event,
    cName: 'nav-text'
  },
  {
    title: 'Sự kiện yêu thích',
    path: '/loveevent',
    icon: love_event,
    cName: 'nav-text'
  },
  {
    title: 'Ngôn ngữ',
    path: '/language',
    icon: language,
    cName: 'nav-text side-end'
  },
  {
    title: 'Giao diện',
    path: '/theme',
    icon: theme,
    cName: 'nav-text side-end'
  },
  {
    title: 'Cài đặt',
    path: '/settings',
    icon: setting,
    cName: 'nav-text side-end'
  },
  {
    title: 'Log out',
    path: '/logout',
    icon: logout,
    cName: 'nav-text side-end'
  }
];