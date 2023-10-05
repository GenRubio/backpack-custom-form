
import InputModalRepeatableController from './InputModalRepeatableController.js';
import InputModalDependencesController from './InputModalDependencesController.js';
import UtilsController from './UtilsController.js';
import Attr from './Attr.js';

const InputModalUpdateController = {
    trans: Attr.trans,
    attr: Attr,
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on('click', this.attr.input.modal.langButton.optionButton, (ev) => this.setLangOptionButtonHandler(ev));
    },
    setLangOptionButtonHandler(ev) {
        ev.preventDefault();

        let el = $(ev.currentTarget);
        let lang = el.attr('data-local');
        let langName = el.attr('data-lang-name');
        $(this.attr.input.modal.langButton.defaultLabel).text(langName);
        $(this.attr.input.modal.langButton.button).attr('data-lang', lang);
        let item = JSON.parse($(this.attr.input.modal.modal).attr('data-item'));
        this.setInputsForm(item, lang);
    },
    setInputsForm(inputObject, lang) {
        let label = UtilsController.getTranslation(lang, inputObject.input.label);
        let placeholder = UtilsController.getTranslation(lang, inputObject.input.placeholder);

        $(this.attr.input.modal.inputs.label).val(label);
        $(this.attr.input.modal.inputs.placeholder).val(placeholder);
        $(this.attr.input.modal.inputs.showLabel).prop('checked', inputObject.input.show_label);
        $(this.attr.input.modal.inputs.name).val(inputObject.input.name);
        $(this.attr.input.modal.inputs.type).val(inputObject.input.type);
        $(this.attr.input.modal.inputs.required).prop('checked', inputObject.input.required ?? true);
        $(this.attr.input.modal.inputs.showInPreview).prop('checked', inputObject.input.show_in_preview ?? true);
        $(this.attr.input.modal.inputs.updateInPreview).prop('checked', inputObject.input.update_in_preview ?? true);
        $(this.attr.input.modal.inputs.showInEmail).prop('checked', inputObject.input.show_in_email ?? true);

        window.newInputObject = inputObject.input;
        window.newInputObject.hash = inputObject.hash;

        InputModalRepeatableController.loadRepeatableItems();
        InputModalDependencesController.loadItems();

        let item = null;
        switch (inputObject.input.type) {
            case 'select':
                item = $(this.attr.input.modal.containerRepeatable);
                item.removeClass('d-none');
                break;
            case 'radio':
                item = $(this.attr.input.modal.containerRepeatable);
                item.removeClass('d-none');
                break;
            case 'checkbox':
                item = $(this.attr.input.modal.containerRepeatable);
                item.removeClass('d-none');
                break;
        }
    },
    openModalUpdateHandler(item) {
        let lang = $(this.attr.input.modal.langButton.button).attr('data-lang');

        $(this.attr.input.modal.title).text(this.trans.update_input);
        $(this.attr.input.modal.saveButton).text(this.trans.save);
        $(this.attr.input.modal.saveButton).attr('data-hash-section', item.hash_section);
        $(this.attr.input.modal.saveButton).attr('data-hash-line', item.hash_line);
        $(this.attr.input.modal.saveButton).attr('data-order', item.order);
        $(this.attr.input.modal.saveButton).attr('data-method', 'update');
        $(this.attr.input.modal.modal).attr('data-item', JSON.stringify(item));
        $(this.attr.input.modal.langButton.button).removeClass('d-none');

        $(this.attr.input.modal.inputs.name).prop('disabled', true);
        $(this.attr.input.modal.inputs.prefixName).text('');

        this.setInputsForm(item, lang);

        $(this.attr.input.modal.modal).modal('show');
    }
};

export default InputModalUpdateController;
