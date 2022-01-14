let txtContact ="LIÊN HỆ",
    txtHome ="TRANG CHỦ";

if (localStorage.getItem('lang') === 'en'){
    txtContact ="CONTACT";
    txtHome ="HOME";
  }

export const MenuItems = [
    {
        title: txtContact,
        path: '/contact',
        cName: 'nav-links',
    },
    {
        title: txtHome,
        path: '/',
        cName: 'nav-links',
    }
]