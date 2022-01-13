let txtContact ="LIÊN HỆ",
    txtHome ="TRANG CHỦ";

if (localStorage.getItem('lang') === 'en'){
    txtContact ="CONTACT";
    txtHome ="HOME";
  }

export const MenuItems = [
    {
        title: txtHome,
        path: '/contact',
        cName: 'nav-links',
    },
    {
        title: txtContact,
        path: '/',
        cName: 'nav-links',
    }
]