/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (element === '') {
            return Error
        };
        this.element = element;
        this.registerEvents()
    }

    /**
     * При нажатии на элемент с data-dismiss="modal"
     * должен закрыть текущее окно
     * (с помощью метода Modal.onClose)
     * */
    registerEvents() {

        let add = function() {
            this.element.onClose()
        }
        for (let i = 0; i < this.element.querySelectorAll('[data-dismiss]').length; i++) {
            this.element.querySelectorAll('[data-dismiss]')[i].addEventListener('click', add)
        }
    }

    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose(e) {
            this.element.close()
            e.preventDefault()
        }
        /**
         * Удаляет обработчики событий
         * */
    unregisterEvents() {
            for (let i = 0; i < this.element.querySelectorAll('[data-dismiss]').length; i++) {
                this.querySelectorAll('[data-dismiss]')[i].removeEventListener('click', add)
            }
        }
        /**
         * Открывает окно: устанавливает CSS-свойство display
         * со значением «block»
         * */
    open() {
            this.element.display = 'block';
        }
        /**
         * Закрывает окно: удаляет CSS-свойство display
         * */
    close() {
        this.element.display = 'none';
    }
}