/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * */
    constructor(element) {
        if (element === '') {
            return Error
        };
        this.element = element;
        this.registerEvents()
    }

    /**
     * Необходимо запретить отправку формы. В момент отправки
     * вызывает метод submit()
     * */
    registerEvents() {
        this.element.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    }

    /**
     * Преобразует данные формы в объект вида
     * {
     *  'название поля формы 1': 'значение поля формы 1',
     *  'название поля формы 2': 'значение поля формы 2'
     * }
     * */
    getData() {
        let obj = {};
        for (let i = 0; i < this.element.length; i++) {
            let key = this.element[i].name
            let value = this.element[i].value
            obj[key] = value
        }
        return obj
    }

    onSubmit(options) {

    }

    /**
     * Вызывает метод onSubmit и передаёт туда
     * данные, полученные из метода getData()
     * */
    submit() {
        this.onSubmit({
            url: this.element.action,
            method: this.element[method],
            data: this.getData()
        })
    }
}