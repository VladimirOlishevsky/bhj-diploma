/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.withCredentials = true;

    if (options.method === 'GET') {

        xhr.open(options.method, `${options.url}?${options.data.mail}&${options.data.password}`);
        xhr.send();
    }
    if (options.method === 'POST') {

        formData = new FormData;
        formData.append('mail', options.data.mail);
        formData.append('password', options.data.password);

        xhr.open(options.method, options.url);
        xhr.send(formData);
    }
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.status, xhr.response);
        }
    }
};