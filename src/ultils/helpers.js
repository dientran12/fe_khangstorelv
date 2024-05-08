import imageEmpty from '~/assets/images/image-empty.jpg';
import { format } from 'date-fns'; // Import hàm format
import { vi } from 'date-fns/locale';

export function createSlugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

export const formatCurrencyVND = (number) => {
    return number.toLocaleString('vi-VN');
};


export const imageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(imageFile);
    });
};


// Hàm xử lý khi ảnh tải thành công nhưng có thể bị hỏng
export const handleImageOnLoad = (event) => {
    const imgElement = event.currentTarget;
    if (!imgElement.naturalWidth || !imgElement.naturalHeight) {
        imgElement.src = imageEmpty;
    }
};

// Hàm xử lý khi ảnh không tải được
export const handleImageOnError = (event) => {
    event.currentTarget.src = imageEmpty;
};

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
        time: format(date, 'p', { locale: vi }), // Giờ: phút
        date: format(date, 'P', { locale: vi }), // Ngày/Tháng
        year: format(date, 'yyyy', { locale: vi }) // Năm
    };
};

export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'text-lime-400'; // Màu cam
        case 'paid':
            return 'text-blue-500'; // Màu xanh dương
        case 'fulfilled':
            return 'text-green-500'; // Màu xanh lá
        case 'cancelled':
            return 'text-red-500'; // Màu đỏ
        default:
            return 'text-gray-500'; // Một màu mặc định nếu không có trạng thái phù hợp
    }
}
