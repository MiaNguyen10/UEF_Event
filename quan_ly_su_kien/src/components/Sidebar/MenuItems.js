import avar from "../../asset/img/user.png";
import past_event from "../../asset/img/past_even.png";
import fav_event from "../../asset/img/fav_event.png";
import admin from "../../asset/img/management.png";
import language from "../../asset/img/language.png";
import theme from "../../asset/img/theme.png";
import setting from "../../asset/img/setting.png";
import logout from "../../asset/img/logout.png";
import Cookies from 'universal-cookie';

  let account = new Cookies().get('authToken');    
  let username ="", 
      txtEndedEvent ="Sự kiện đã qua",
      txtLoveEvent ="Sự kiện yêu thích",
      txtManageAccountAdmin ="Quản lý quản trị viên",
      txtLanguage ="Ngôn ngữ",
      txtManageAccount ="Quản lý tài khoản",
      txtLogout ="Đăng xuất";

  if (account)
    {username = account.name}
  
  if (localStorage.getItem('lang') === 'en'){
    txtEndedEvent ="Past event";
    txtLoveEvent ="Favorite event";
    txtManageAccountAdmin ="Admin management";
    txtLanguage ="Language";
    txtManageAccount ="Account management";
    txtLogout ="Log out";
  }
  
export const MenuItems = [
  {
    title: username,
    path: '',
    icon: avar, //fix later
    cName: 'nav-text nav-username'
  },
  {
    title: txtEndedEvent,
    path: '/eventended',
    icon: past_event,
    cName: 'nav-text'
  },
  {
    title: txtLoveEvent,
    path: '/favorite',
    icon: fav_event,
    cName: 'nav-text'
  },
  {
    title: txtManageAccountAdmin,
    path: '/manageaccount',
    icon: admin,
    cName: 'nav-text'
  },
  {
    title: txtManageAccount,
    path: '/settings',
    icon: setting,
    cName: 'nav-text side-end'
  },
  {
    title: txtLanguage,
    path: '/language',
    icon: language,
    cName: 'nav-text side-end'
  },
  {
    title: txtLogout,
    path: '/logout',
    icon: logout,
    cName: 'nav-text side-end'
  }
];