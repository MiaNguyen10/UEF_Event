import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as GrIcons from 'react-icons/gr';

export const MenuItems = [
  {
    title: 'Tên đăng nhập',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Sự kiện đã qua',
    path: '/recently',
    icon: <GiIcons.GiBackwardTime />,
    cName: 'nav-text'
  },
  {
    title: 'Sự kiện yêu thích',
    path: '/loveevent',
    icon: <AiIcons.AiFillHeart />,
    cName: 'nav-text'
  },
  {
    title: 'Ngôn ngữ',
    path: '/language',
    icon: <GrIcons.GrLanguage />,
    cName: 'nav-text'
  },
  {
    title: 'Giao diện',
    path: '/theme',
    icon: <RiIcons.RiBrush3Line />,
    cName: 'nav-text'
  },
  {
    title: 'Cài đặt',
    path: '/settings',
    icon: <AiIcons.AiFillSetting />,
    cName: 'nav-text'
  },
  {
    title: 'Log out',
    path: '/logout',
    icon: <IoIcons.IoMdExit />,
    cName: 'nav-text'
  }
];