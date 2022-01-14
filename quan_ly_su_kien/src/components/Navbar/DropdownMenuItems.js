let txtuef ="TRƯỜNG UEF",
    txtEconomy ="KHOA KINH TẾ",
    txtCommunication ="KHOA QUAN HỆ CÔNG CHÚNG VÀ TRUYỀN THÔNG",
    txtIT ="KHOA CÔNG NGHỆ THÔNG TIN",
    txtEnglish ="KHOA TIẾNG ANH",
    txtLaw ="KHOA LUẬT VÀ QUAN HỆ QUỐC TẾ",
    txtTravel ="KHOA QUẢN TRỊ DU LỊCH - KHÁCH SẠN",
    txtInternational ="KHOA NGÔN NGỮ VÀ VĂN HÓA QUỐC TẾ";



if (localStorage.getItem('lang') === 'en'){
    txtuef ="UEF";
    txtEconomy ="FACULTY OF ECONOMICS";
    txtCommunication ="FACULTY OF PUBLIC RELATIONS AND COMMUNICATION";
    txtIT ="FACULTY OF INFORMATION TECHNOLOGY";
    txtEnglish ="FACULTY OF ENGLISH";
    txtLaw ="SCIENCE OF LAW AND INTERNATIONAL RELATIONS";
    txtTravel ="FACULTY OF TOURISM & HOSPITALITY MANAGEMENT";
    txtInternational ="FACULTY OF INTERNATIONAL LANGUAGE AND CULTURE";
}

export const DropdownMenuItems = [
    {
        title: txtuef,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Trường UEF'
    },
    {
        title: txtEconomy,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Kinh tế'
    },
    {
        title: txtCommunication,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Quan hệ công chúng và Truyền thông'
    },
    {
        title: txtIT,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Công nghệ thông tin'
    },
    {
        title: txtEnglish,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Tiếng anh'
    },
    {
        title: txtLaw,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Luật và Quan hệ quốc tế'
    },
    {
        title: txtTravel,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Quản trị du lịch - Khách sạn'
    },
    {
        title: txtInternational,
        path: '/displayEventByUnit',
        cName: 'dropdown-item',
        label: 'Khoa Ngôn ngữ và Văn hóa quốc tế'
    },
]