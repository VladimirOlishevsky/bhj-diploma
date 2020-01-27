/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
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
     * Вызывает метод render для отрисовки страницы
     * */
    update() {
        this.render()
    }

    /**
     * Отслеживает нажатие на кнопку удаления транзакции
     * и удаления самого счёта. Внутри обработчика пользуйтесь
     * методами TransactionsPage.removeTransaction и
     * TransactionsPage.removeAccount соответственно
     * */
    registerEvents() {

        this.element.addEventListener('click', (event) => {

            if (event.target.closest('.remove-account')) {
                this.removeAccount();
            }
            if (event.target.closest('.transaction__remove')) {
                this.removeTransaction(event.target.data.id)
            }
        });
    }

    /**
     * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
     * Если пользователь согласен удалить счёт, вызовите
     * Account.remove, а также TransactionsPage.clear с
     * пустыми данными для того, чтобы очистить страницу.
     * По успешному удалению необходимо вызвать метод App.update()
     * для обновления приложения
     * */
    removeAccount() {
        if (!this.lastOptions) {
            return
        }
        if (!confirm('Вы действительно хотите удалить счет?')) {
            return
        }
        Account.remove(this.lastOptions.account_id, {}, (err, response) => {
            this.clear()
        })
    }

    /**
     * Удаляет транзакцию (доход или расход). Требует
     * подтверждеия действия (с помощью confirm()).
     * По удалению транзакции вызовите метод App.update()
     * */
    removeTransaction(id) {
        if (confirm('Вы действительно хотите удалить транзакцию?')) {
            return
        }
        Transaction.remove(id, {}, (err, response) => {
            if (response) {
                App.update();
            }
        })
    }

    /**
     * С помощью Account.get() получает название счёта и отображает
     * его через TransactionsPage.renderTitle.
     * Получает список Transaction.list и полученные данные передаёт
     * в TransactionsPage.renderTransactions()
     * */
    render(options) {
        if (!options) {
            return
        }
        this.lastOptions = options;
        Account.get(options.account_id, {}, (err, response) => {
            if (response) {
                this.renderTitle(response.data.name);
            }
        });
        Transaction.list(options, (err, response) => {
            if (response.data) {
                console.log(response.data)
                this.renderTransactions(response.data)
            }
        })
    }

    /**
     * Очищает страницу. Вызывает
     * TransactionsPage.renderTransactions() с пустым массивом.
     * Устанавливает заголовок: «Название счёта»
     * */
    clear() {
        this.renderTransactions(data = [])
        this.lastOptions.reset();
    }

    /**
     * Устанавливает заголовок в элемент .content-title
     * */
    renderTitle(name) {
        document.querySelector('.content-title').textContent = name;
    }

    /**
     * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
     * в формат «10 марта 2019 г. в 03:20»
     * */
    formatDate(date) {

    }

    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * item - объект с информацией о транзакции
     * */
    getTransactionHTML(item) {

    }

    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML
     * */
    renderTransactions(data) {

    }
}