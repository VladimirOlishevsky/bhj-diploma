/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */

    static setCurrent(user) {
        localStorage.user = JSON.stringify(user);
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        if (localStorage.getItem('user')) {
            delete localStorage.user
        }
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        if (localStorage.user) {
            return JSON.parse(localStorage.user);
        }

    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(data, callback = f => f) {

        return createRequest({
            method: 'GET',
            url: User.HOST + User.URL + '/current',
            data: data,
            responseType: 'json',
            callback(err, response) {
                if (response.user) {
                    User.setCurrent(response.user);
                    console.log(response)
                } else {
                    User.unsetCurrent()
                } 
                
                callback(err, response);
            }
        })
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback = f => f) {
        return createRequest({
            method: 'POST',
            url: User.HOST + User.URL + '/login',
            data: data,
            responseType: 'json',
            callback(err, response) {
                if (response && response.user) {
                    User.setCurrent(response.user);
                    console.log(response)
                } else {
                    return err
                }
                callback(err, response);
            }
        })
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback = f => f) {

        return createRequest({
            method: 'POST',
            url: User.HOST + User.URL + '/register',
            data,
            responseType: 'json',
            callback(err, response) {
                if (response && response.user) {
                    User.setCurrent(response.user);
                    console.log(response)
                } else {
                    return err
                }
                callback(err, response);
            }
        })
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(data, callback = f => f) {
        return createRequest({
            method: 'POST',
            url: User.HOST + User.URL + '/logout',
            data: data,
            responseType: 'json',
            callback(err, response) {
                if (response && response.success) {
                    User.unsetCurrent(response.user);
                    console.log(response)
                } else {
                    return err
                }
                callback(err, response);
            }
        })
    }
}
User.URL = '/user';
User.HOST = Entity.HOST