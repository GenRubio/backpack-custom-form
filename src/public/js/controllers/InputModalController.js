
import UtilsController from './UtilsController.js';
import InputModalRepeatableController from './InputModalRepeatableController.js';
import Attr from './Attr.js';

const InputModalController = {
    trans: Attr.trans,
    attr: Attr,
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on('click', this.attr.input.modal.openButton, (ev) => this.openModalCreateHandler(ev));
        $(document).on('hidden.bs.modal', this.attr.input.modal.modal, (ev) => this.closeModalHandler(ev));
        $(document).on('change', this.attr.input.modal.inputs.showLabel, (ev) => this.setShowLabelInputHandler(ev));
        $(document).on('keyup', this.attr.input.modal.inputs.label, (ev) => this.setLabelInputHandler(ev));
        $(document).on('keyup', this.attr.input.modal.inputs.placeholder, (ev) => this.setPlaceholderInputHandler(ev));
        $(document).on('keyup', this.attr.input.modal.inputs.name, (ev) => this.setNameInputHandler(ev));
        $(document).on('change', this.attr.input.modal.inputs.type, (ev) => this.setTypeInputHandler(ev));
        $(document).on('change', this.attr.input.modal.inputs.required, (ev) => this.setRequiredInputHandler(ev));
        $(document).on('change', this.attr.input.modal.inputs.showInPreview, (ev) => this.setShowInPreviewInputHandler(ev));
        $(document).on('change', this.attr.input.modal.inputs.updateInPreview, (ev) => this.setUpdateInPreviewInputHandler(ev));
        $(document).on('change', this.attr.input.modal.inputs.showInEmail, (ev) => this.setShowInEmailInputHandler(ev));
    },
    openModalCreateHandler(ev) {
        $(this.attr.input.modal.title).text(this.trans.create_input);
        $(this.attr.input.modal.saveButton).text(this.trans.create);
        let hashSection = $(ev.currentTarget).attr('data-hash-section');
        let hashLine = $(ev.currentTarget).attr('data-hash-line');
        let order = $(ev.currentTarget).attr('data-order');

        $(this.attr.input.modal.saveButton).attr('data-hash-section', hashSection);
        $(this.attr.input.modal.saveButton).attr('data-hash-line', hashLine);
        $(this.attr.input.modal.saveButton).attr('data-order', order);
        $(this.attr.input.modal.saveButton).attr('data-method', 'create');
        $(this.attr.input.modal.inputs.prefixName).text(UtilsController.getPrefixEntityName());
    },
    closeModalHandler(ev) {
        UtilsController.reloadCustomFormData();
    },
    setShowLabelInputHandler(ev) {
        window.newInputObject.show_label = $(ev.currentTarget).prop('checked');
    },
    setRequiredInputHandler(ev) {
        window.newInputObject.required = $(ev.currentTarget).prop('checked');
    },
    setShowInPreviewInputHandler(ev) {
        window.newInputObject.show_in_preview = $(ev.currentTarget).prop('checked');
    },
    setUpdateInPreviewInputHandler(ev) {
        window.newInputObject.update_in_preview = $(ev.currentTarget).prop('checked');
    },
    setShowInEmailInputHandler(ev) {
        window.newInputObject.show_in_email = $(ev.currentTarget).prop('checked');
    },
    setLabelInputHandler(ev) {
        let lang = UtilsController.inputModalLang();
        if (!window.newInputObject.label) {
            window.newInputObject.label = {};
        }
        window.newInputObject.label[lang] = $(ev.currentTarget).val();
        let method = $(this.attr.input.modal.saveButton).attr('data-method');
        if (method == "create") {
            let prefix = UtilsController.getPrefixEntityName();
            let slug = UtilsController.createSlug($(ev.currentTarget).val());
            window.newInputObject.name = prefix + slug;
            $(this.attr.input.modal.inputs.name).val(slug);
        }
    },
    setPlaceholderInputHandler(ev) {
        let lang = UtilsController.inputModalLang();
        if (!window.newInputObject.placeholder) {
            window.newInputObject.placeholder = {};
        }
        window.newInputObject.placeholder[lang] = $(ev.currentTarget).val();
    },
    setNameInputHandler(ev) {
        let prefix = UtilsController.getPrefixEntityName();
        window.newInputObject.name = prefix + $(ev.currentTarget).val();
    },
    setTypeInputHandler(ev) {
        window.newInputObject.type = $(ev.currentTarget).val();

        let container = $(this.attr.input.modal.containerRepeatable);
        switch ($(ev.currentTarget).val()) {
            case 'select':
                container.removeClass('d-none');
                break;
            case 'radio':
                container.removeClass('d-none');
                break;
            case 'checkbox':
                container.removeClass('d-none');
                break;
            default:
                container.addClass('d-none');
                InputModalRepeatableController.removeSelectOptions();
                break;
        }
    }
};

export default InputModalController;
