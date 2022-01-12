import logo from "../../asset/img/logo.png";
import past_event from "../../asset/img/past_even.png";
import love_event from "../../asset/img/love_event.png";
import language from "../../asset/img/language.png";
import theme from "../../asset/img/theme.png";
import setting from "../../asset/img/setting.png";
import logout from "../../asset/img/logout.png";
import Cookies from 'universal-cookie';

  let account = new Cookies().get('authToken');    
  let username =""
  if (account)
    {username = account.name}

export const MenuItems = [
  {
    title: username,
    path: '',
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
    title: 'Quản lý tài khoản',
    path: '/manageaccount',
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