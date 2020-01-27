/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Вызывает AccountsWidget.update() для получения
     * списка счетов и последующего отображения
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            throw new Error("Элемент не существует в Modal");
        };
        this.element = element;
        this.registerEvents();
        this.update();
    }

    /**
     * При нажатии на .create-account открывает окно
     * #modal-new-account для создания нового счёта
     * При нажатии на один из существующих счетов
     * (которые отображены в боковой колонке),
     * вызывает AccountsWidget.onSelectAccount()
     * */
    registerEvents() {

        this.element.addEventListener('click', (event) => {

            if (event.target.closest('.create-account')) {
                App.getModal('createAccount').open();
            }
            if (event.target.closest('.account')) {
                this.onSelectAccount(event.target.closest('.account'));
            }
        });
    }

    /**
     * Метод доступен только авторизованным пользователям
     * (User.current()).
     * Если пользователь авторизован, необходимо
     * получить список счетов через Account.list(). При
     * успешном ответе необходимо очистить список ранее
     * отображённых счетов через AccountsWidget.clear().
     * Отображает список полученных счетов с помощью
     * метода renderItem()
     * */
    update() {

        if (User.current()) {
            Account.list(User.current(), (err, response) => {
                if (response) {
                    this.clear()
                    for (let i = 0; i < response.data.length; i++) {
                        this.renderItem(response.data[i]);
                        console.log(response.data[i])
                    }
                } else {
                    console.log(err)
                }
            })
        }
    }

    /**
     * Очищает список ранее отображённых счетов.
     * Для этого необходимо удалять все элементы .account
     * в боковой колонке
     * */
    clear() {
        let accounts = document.querySelectorAll('.account')
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].remove()
        }
    }

    /**
     * Срабатывает в момент выбора счёта
     * Устанавливает текущему выбранному элементу счёта
     * класс .active. Удаляет ранее выбранному элементу
     * счёта класс .active.
     * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
     * */
    onSelectAccount(element) {
        const accounts = document.querySelectorAll('.account');
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].classList.remove('active');
        }
        element.classList.add('active');
        App.showPage('transactions', { account_id: element.dataset.id });
    }

    /**
     * Возвращает HTML-код счёта для последующего
     * отображения в боковой колонке.
     * item - объект с данными о счёте
     * */
    getAccountHTML(item) {
        return `<li class="active account" data-id="${item.id}">
              <a href="#">
                  <span>${item.name}</span> /
                  <span>${item.sum} ₽</span>
              </a>
            </li>`
    }

    /**
     * Получает массив с информацией о счетах.
     * Отображает полученный с помощью метода
     * AccountsWidget.getAccountHTML HTML-код элемента
     * и добавляет его внутрь элемента виджета
     * */
    renderItem(item) {
        this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(item))
    }
}