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

            this.element = element;
            this.registerEvents();
            if (!element) {
                throw new Error("Элемент не существует в Modal");
            }
        }
        /**
         * При нажатии на элемент с data-dismiss="modal"
         * должен закрыть текущее окно
         * (с помощью метода Modal.onClose)
         * */
    registerEvents() {

            this.closeWindow = this.element.querySelectorAll('button[data-dismiss="modal"]');
            for (let button of this.closeWindow) {
                button.addEventListener('click', (e) => this.onClose(e));
            }
        }
        /**
         * Срабатывает после нажатия на элементы, закрывающие окно.
         * Закрывает текущее окно (Modal.close())
         * */
    onClose(e) {
            this.close();
            this.unregisterEvents();
        }
        /**
         * Удаляет обработчики событий
         * */
    unregisterEvents() {
            this.element.removeEventListener("click", (e) => this.onClose(e));
        }
        /**
         * Открывает окно: устанавливает CSS-свойство display
         * со значением «block»
         * */
    open() {
            this.element.style.display = 'block';
        }
        /**
         * Закрывает окно: удаляет CSS-свойство display
         * */
    close() {
        this.element.style.display = 'none';
    }
}