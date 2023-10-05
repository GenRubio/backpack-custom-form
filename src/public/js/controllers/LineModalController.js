
import UtilsController from './UtilsController.js';
import Attr from './Attr.js';

const LineModalController = {
    trans: Attr.trans,
    attr: Attr,
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on('click', this.attr.line.modal.openButton, (ev) => this.openModelCreateHandler(ev));
        $(document).on('hidden.bs.modal', this.attr.line.modal.modal, (ev) => this.closeModalHandler(ev));
        $(document).on('click change', this.attr.line.modal.inputs.totalColumns, (ev) => this.setTotalInputsInputHandler(ev));
        $(document).on('change', this.attr.line.modal.inputs.permissionCreate, (ev) => this.setPermissionCreateInputHandler(ev));
        $(document).on('change', this.attr.line.modal.inputs.permissionUpdate, (ev) => this.setPermissionUpdateInputHandler(ev));
        $(document).on('change', this.attr.line.modal.inputs.permissionDelete, (ev) => this.setPermissionDeleteInputHandler(ev));
    },
    openModelCreateHandler(ev) {
        let el = $(ev.currentTarget);
        $(this.attr.line.modal.title).text(this.trans.create_line);
        $(this.attr.line.modal.saveButton).text(this.trans.create);
        let hashSection = el.attr('data-hash-section');
        let order = el.attr('data-order');

        $(this.attr.line.modal.saveButton).attr('data-hash-section', hashSection);
        $(this.attr.line.modal.saveButton).attr('data-order', order);
        $(this.attr.line.modal.saveButton).attr('data-method', 'create');
    },
    closeModalHandler(ev) {
        UtilsController.reloadCustomFormData();
    },
    setTotalInputsInputHandler(ev) {
        let el = $(ev.currentTarget);
        let totalColumns = el.val();
        window.newLineObject.total_columns = totalColumns;
    },
    setPermissionCreateInputHandler(ev) {
        let el = $(ev.currentTarget);
        window.newLineObject.admin_panel.permission_create = el.prop('checked');
    },
    setPermissionUpdateInputHandler(ev) {
        let el = $(ev.currentTarget);
        window.newLineObject.admin_panel.permission_update = el.prop('checked');
    },
    setPermissionDeleteInputHandler(ev) {
        let el = $(ev.currentTarget);
        window.newLineObject.admin_panel.permission_delete = el.prop('checked');
    },
};

export default LineModalController;
