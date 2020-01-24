let openMini = document.querySelector('.sidebar-toggle');
let body = document.querySelector('.skin-blue');
/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        openMini.addEventListener('click', function() {
            body.classList.toggle('sidebar-open');
            body.classList.toggle('sidebar-collapse');
        })
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {

        let login = document.querySelector('.menu-item_login');
        let register = document.querySelector('.menu-item_register');
        let logOut = document.querySelector('.menu-item_logout');
        let modalWindow;

        register.addEventListener('click', function() {
            modalWindow = App.getModal('register');
            modalWindow.open()
        });
        login.addEventListener('click', () => {
            modalWindow = App.getModal('login');
            modalWindow.open();
        });
        logOut.addEventListener('click', () => {
            User.logout({}, (err, response) => {
                if (response.success = true) {
                    App.setState('init');
                }
            });

        })
    }
}