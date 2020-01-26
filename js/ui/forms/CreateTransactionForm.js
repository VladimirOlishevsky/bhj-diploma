/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
    /**
     * Вызывает родительский конструктор и
     * метод renderAccountsList
     * */
    constructor(element) {
        super(element)
        this.renderAccountsList()
    }

    /**
     * Получает список счетов с помощью Account.list
     * Обновляет в форме всплывающего окна выпадающий список
     * */
    renderAccountsList() {

        let selects = document.querySelectorAll('.accounts-select')

        Account.list(User.current(), (err, response) => {
            if (response) {
                for (let j = 0; j < selects.length; j++) {
                    selects[j].textContent = '';
                    for (let i = 0; i < response.data.length; i++) {
                        selects[j].insertAdjacentHTML('beforeend', `<option value="${response.data[i].id}">${response.data[i].name}</option>`);
                    }
                }
            } else {
                console.log(err)
            }
        })
    }

    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
    onSubmit(options) {
        Transaction.create(options.data, (err, response) => {
            if (response) {
                this.element.reset();
                App.getModal('newIncome').close();
                App.getModal('newExpense').close();
                App.update();
            }
        })

    }
}