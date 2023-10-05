
import Attr from './Attr.js';

const LineModalUpdateController = {
    trans: Attr.trans,
    attr: Attr,
    openModalUpdateHandler(item) {
        $(this.attr.line.modal.title).text(this.trans.update_line);
        $(this.attr.line.modal.saveButton).text(this.trans.save);
        $(this.attr.line.modal.saveButton).attr('data-hash-section', item.hash_section);
        $(this.attr.line.modal.saveButton).attr('data-order', item.order);
        $(this.attr.line.modal.saveButton).attr('data-method', 'update');
        $(this.attr.line.modal.modal).attr('data-item', JSON.stringify(item));
        $(this.attr.line.modal.modal).modal('show');

        this.setInputsForm(item);
    },
    setInputsForm(item) {
        let inputs = $(this.attr.line.modal.inputs.totalColumns);
        inputs.each((index, element) => {
            if ($(element).val() == item.total_columns) {
                $(element).prop('checked', true);
            }
        });

        $(this.attr.line.modal.inputs.permissionCreate).prop('checked', item.admin_panel.permission_create);
        $(this.attr.line.modal.inputs.permissionUpdate).prop('checked', item.admin_panel.permission_update);
        $(this.attr.line.modal.inputs.permissionDelete).prop('checked', item.admin_panel.permission_delete);

        window.newLineObject = {
            hash: item.hash,
            hash_section: item.hash_section,
            type: "line",
            order: item.order,
            admin_panel: {
                permission_update: item.admin_panel.permission_update,
                permission_delete: item.admin_panel.permission_delete,
                permission_create: item.admin_panel.permission_create
            },
            total_columns: item.total_columns,
            columns: item.columns
        };
    },
};

export default LineModalUpdateController;
