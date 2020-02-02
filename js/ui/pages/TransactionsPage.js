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
        this.render(this.lastOptions)
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
                console.log(event.target.closest('.transaction__remove'))
                this.removeTransaction(event.target.closest('.transaction__remove').dataset.id)
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
        console.log(this.lastOptions)
        if (!this.lastOptions) {
            return
        }
        if (confirm('Вы действительно хотите удалить счет?')) {
            Account.remove(this.lastOptions.account_id, {}, (err, response) => {
                if (response) {
                    this.clear();
                    App.update();
                }
            })
        }
    }

    /**
     * Удаляет транзакцию (доход или расход). Требует
     * подтверждеия действия (с помощью confirm()).
     * По удалению транзакции вызовите метод App.update()
     * */
    removeTransaction(id) {
        console.log(id)

        if (confirm('Вы действительно хотите удалить транзакцию?')) {
            Transaction.remove(id, {}, (err, response) => {
                if (response.success) {
                    App.update();
                } else {
                    console.log(err);
                }
            })
        }

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
        this.renderTransactions([]);
        this.renderTitle('Название счёта');
        this.lastOptions = '';
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
        date = new Date(date)
        let arr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        if (date.getMinutes() < 0) {
            date.getMinutes() = '0' + date.getMinutes()
        }
        if (date.getHours() < 0) {
            date.getHours() = '0' + date.getHours()
        }
        return date.getDate() + ' ' + arr[date.getMonth()] + ' ' + date.getFullYear() + ' года в ' + date.getHours() + ':' + date.getMinutes();
    }

    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * item - объект с информацией о транзакции
     * */
    getTransactionHTML(item) {

        return `<div class="transaction transaction_${item.type} row">
                            <div class="col-md-7 transaction__details">
                            <div class="transaction__icon">
                                <span class="fa fa-money fa-2x"></span>
                            </div>
                            <div class="transaction__info">
                                <h4 class="transaction__title">${item.name}</h4>
                                <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                            </div>
                            </div>
                            <div class="col-md-3">
                            <div class="transaction__summ">
                            ${item.sum} <span class="currency">₽</span>
                            </div>
                            </div>
                            <div class="col-md-2 transaction__controls">
                                <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                                    <i class="fa fa-trash"></i>  
                                </button>
                            </div>
                        </div>`
    }

    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML
     * */
    renderTransactions(data) {

        let content = document.querySelector('.content');
        content.textContent = '';
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            content.innerHTML += this.getTransactionHTML(data[i]);
        }
    }
}