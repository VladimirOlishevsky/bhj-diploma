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
        if (!element) {
            throw new Error("Элемент не существует в Modal");
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

        // this.element.addEventListener("click", function() {
        //     this.onClose
        // });
        console.log(this.element)
            //.querySelectorAll('.close').addEventListener("click", this.onClose())
    }

    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose(e) {

            console.log(e)
                //e.preventDefault();
            this.close()

        }
        /**
         * Удаляет обработчики событий
         * */
    unregisterEvents() {
            this.element.removeEventListener("click", this.onClose);
        }
        /**
         * Открывает окно: устанавливает CSS-свойство display
         * со значением «block»
         * */
    open() {
            this.display = 'block';
        }
        /**
         * Закрывает окно: удаляет CSS-свойство display
         * */
    close() {
        this.display = 'none';
    }
}