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
        
        this.element = element,

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

    this.closebuton = this.element.querySelectorAll('button[data-dismiss="modal"]');


    for(let button of this.closebuton) {
      button.addEventListener('click', (e) => this.onClose(e));
    }

        // let a = this.element.element
        // console.log(a)

        // for(let i = 0; i < a.querySelectorAll('[data-dismiss]').length; i++) {
        //     a.querySelectorAll('[data-dismiss]')[i].onclick = function() {
        //         return this.onClose()
        //     }
        // }            
    }

    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose(e) {

        this.element.style.display = 'none',
        this.unregisterEvents();
        // this.close(),
        // e.preventDefault();
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