/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    // const xhr = new XMLHttpRequest;
    // xhr.withCredentials = true;

    // if (options.method === 'GET') {

    //     console.log(options)

    //     xhr.open(options.method, `${options.url}?mail=${options.data.mail}&password${options.data.password}`);
    //     xhr.send();
    // }
    // if (options.method === 'POST') {


    //     let formData = new FormData;

    //     console.log(options)
    //     formData.append('mail', options.data.mail);
    //     formData.append('password', options.data.password);

    //     xhr.open(options.method, options.url);
    //     xhr.send(formData);
    // }
    // if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //         options.callback(null, xhr.response);
    //     } else {
    //         options.callback(xhr.status, xhr.response);
    //     }
    // }
    // try {
    //     xhr.open(options.method, options.url);
    //     xhr.send(formData);
    // } catch (e) {
    //     // перехват сетевой ошибки
    //     callback(e);
    // }

    // return xhr

    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    xhr.responseType = options.responseType;
    xhr.withCredentials = true;

    if (options.method === 'GET') {
        options.url = options.url + '?';
        for (let key in options.data) {
            options.url += `${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {

            options.callback(null, xhr.response);

            console.log(xhr.response);
        }
    });

    xhr.open(options.method, options.url);

    try {
        xhr.send(formData);
    } catch (err) {
        callback(err);
    }

    return xhr;

};