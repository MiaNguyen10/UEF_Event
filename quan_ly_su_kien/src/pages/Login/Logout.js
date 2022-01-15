import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const Logout = () => {
    const lang = localStorage.getItem('lang');
    i18next.changeLanguage(lang);
    const { t, i18n } = useTranslation();
    return (
        Swal.fire({
            title: t('Popup.ques_logout'),
            showCancelButton: true,
            confirmButtonText: t('Popup.yes'),
            cancelButtonText: t('Popup.no')
          }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const cookies = new Cookies();
                    cookies.remove('authToken', { path: '/' });    
                    <Navigate to="/" />           
                    Swal.fire({
                        title: t('Popup.come_home1') + '<a href="/">' + t('Popup.come_home2') + '</a>' + t('Popup.logout_success'),
                        icon: 'info',
                        showConfirmButton: false});
                }else{
                    Swal.fire({
                    title: t('Popup.come_home1') + '<a href="/">' + t('Popup.come_home2') + '</a>' + t('Popup.come_home3'),
                    icon: 'info',
                    showConfirmButton: false});
                }
                
            }
        )
    )

};

export default Logout;