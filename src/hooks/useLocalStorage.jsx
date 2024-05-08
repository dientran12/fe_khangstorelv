import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
    // Trạng thái để lưu trữ giá trị của chúng ta
    // Truyền hàm trạng thái ban đầu vào useState để logic chỉ được thực thi một lần
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Lấy dữ liệu từ local storage bằng khóa
            const item = window.localStorage.getItem(key);
            // Phân tích cú pháp json lưu trữ hoặc nếu không có thì trả về giá trị ban đầu
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Nếu có lỗi cũng trả về giá trị ban đầu
            console.log(error);
            return initialValue;
        }
    });

    // useEffect để cập nhật local storage khi trạng thái thay đổi
    useEffect(() => {
        try {
            // Cho phép giá trị là một hàm để chúng ta có cùng API như useState
            const valueToStore =
                typeof storedValue === 'function'
                    ? storedValue(storedValue)
                    : storedValue;
            // Lưu trạng thái
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // Một cài đặt nâng cao hơn sẽ xử lý trường hợp có lỗi
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
