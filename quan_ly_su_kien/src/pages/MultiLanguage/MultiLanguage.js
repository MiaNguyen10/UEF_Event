import React from "react";
import Swal from 'sweetalert2';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function MultiLanguage () {
    const { t, i18n } = useTranslation();

  return (
    Swal.fire({
        title: t('Popup.language'),
        showCancelButton: true,
        confirmButtonText: t('Popup.vi'),
        cancelButtonText: t('Popup.en')
      }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.setItem('lang', 'vi');             
            } else{
                localStorage.setItem('lang', 'en');
            }
            Swal.fire({
                title: t('Popup.come_home1') + '<a href="/">' + t('Popup.come_home2') + '</a>' + t('Popup.come_home3'),
                icon: 'info',
                showConfirmButton: false});
        }
    )
)}

export default MultiLanguage;
