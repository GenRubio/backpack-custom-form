import Attr from './Attr.js';
import UtilsController from './UtilsController.js';

const InputModalRepeatableController = {
    attr: Attr,
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on('keyup', this.attr.input.modal.repeatable.value, (ev) => this.setRepeatableValueInputHandler(ev));
        $(document).on('change', this.attr.input.modal.repeatable.default, (ev) => this.setRepeatableDefaultInputHandler(ev));
        $(document).on('click', this.attr.input.modal.repeatable.actionButton, (ev) => this.repeatableItemActionHandler(ev));
        $(document).on('click', this.attr.input.modal.repeatable.addButton, (ev) => this.repeatableCreateHandler(ev));
    },
    repeatableCreateHandler(ev) {
        ev.preventDefault();
        window.newInputObject.options.push({
            hash: UtilsController.creatHash(),
            order: window.newInputObject.options.length + 1,
            value: '',
            default: false
        });
        this.loadRepeatableItems();
    },
    repeatableItemActionHandler(ev) {
        ev.preventDefault();
        let el = $(ev.currentTarget);
        let action = el.attr('data-action');
        let container = el.closest(this.attr.input.modal.repeatable.sonContainer);
        let order = container.attr('data-order');
        switch (action) {
            case 'delete':
                window.newInputObject.options.splice(order - 1, 1);
                this.loadRepeatableItems();
                break;
            case 'up':
                let itemUp = window.newInputObject.options.splice(order - 1, 1);
                window.newInputObject.options.splice(order - 2, 0, itemUp[0]);
                this.loadRepeatableItems();
                break;
            case 'down':
                let itemDown = window.newInputObject.options.splice(order - 1, 1);
                window.newInputObject.options.splice(order, 0, itemDown[0]);
                this.loadRepeatableItems();
                break;
            default:
                break;
        }
    },
    setRepeatableDefaultInputHandler(ev) {
        let el = $(ev.currentTarget);
        let container = el.closest(this.attr.input.modal.repeatable.sonContainer);
        let order = container.attr('data-order');
        if ($(ev.currentTarget).prop('checked')) {
            for (let i = 0; i < window.newInputObject.options.length; i++) {
                if (i != order - 1) {
                    window.newInputObject.options[i].default = false;
                }
            }
        }
        window.newInputObject.options[order - 1].default = $(ev.currentTarget).prop('checked');
        this.loadRepeatableItems();
    },
    setRepeatableValueInputHandler(ev) {
        let el = $(ev.currentTarget);
        let lang = UtilsController.inputModalLang();
        let container = el.closest(this.attr.input.modal.repeatable.sonContainer);
        let order = container.attr('data-order');

        if (!window.newInputObject.options[order - 1].value) {
            window.newInputObject.options[order - 1].value = {};
        }
        window.newInputObject.options[order - 1].value[lang] = $(ev.currentTarget).val();
    },
    loadRepeatableItems() {
        let lang = UtilsController.inputModalLang();
        for (let i = 0; i < window.newInputObject.options.length; i++) {
            window.newInputObject.options[i].order = i + 1;
        }

        this.removeSelectOptions();

        for (let i = 0; i < window.newInputObject.options.length; i++) {
            let item = $(this.attr.input.modal.repeatable.layout).clone();
            item.attr('data-order', window.newInputObject.options[i].order);
            item.attr('data-hash', window.newInputObject.options[i].hash);
            item.removeClass('d-none');
            item.find('input[name="value"]').val(UtilsController.getTranslation(lang, window.newInputObject.options[i].value));
            if (window.newInputObject.options[i].default) {
                item.find('input[name="default"]').prop('checked', true);
            }
            if (i == 0) {
                item.find(this.attr.input.modal.repeatable.controls.up).addClass(
                    'd-none');
            } else if (i == window.newInputObject.options.length - 1) {
                item.find(this.attr.input.modal.repeatable.controls.down).addClass(
                    'd-none');
            }
            if (i == 0 && window.newInputObject.options.length == 1) {
                item.find(this.attr.input.modal.repeatable.controls.down).addClass(
                    'd-none');
            }
            let container = $(this.attr.input.modal.repeatable.container);
            if (i > 0) {
                container.find(this.attr.input.modal.repeatable.notLayout).last().after(item);
            } else {
                container.prepend(item);
            }
        }
    },
    removeSelectOptions() {
        $(this.attr.input.modal.repeatable.container).find(this.attr.input.modal.repeatable.notLayout).not(
            this.attr.input.modal.repeatable.addButton).remove();
    },
};

export default InputModalRepeatableController;
