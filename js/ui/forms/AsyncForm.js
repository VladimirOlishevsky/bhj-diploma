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
        if (!element) {
            throw new Error("Элемент не существует в Modal");
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
            if (this.element.checkValidity()) {
                e.preventDefault();
                this.submit();
            }
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
        let formData = new FormData(this.element)
        for (let item of formData.entries()) {
            const key = item[0],
                value = item[1];
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
        let options = {};
        options.url = this.element.action;
        options.method = this.element.method;
        options.data = this.getData();
        this.onSubmit(options);
    }
}