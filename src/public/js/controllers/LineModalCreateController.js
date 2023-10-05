import UtilsController from './UtilsController.js';
import Attr from './Attr.js';

const LineModalCreateController = {
    attr: Attr,
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on('click', this.attr.line.modal.saveButton, (ev) => this.saveFormHandler(ev));
    },
    saveFormHandler(ev) {
        let el = $(ev.currentTarget);
        let method = el.attr('data-method');
        $(this.attr.line.modal.modal).animate({
            scrollTop: 0
        }, 500);
        let customFormJsonData = UtilsController.inputCustomFormValue();
        let hashSection = el.attr('data-hash-section');
        let order = el.attr('data-order');
        let section = customFormJsonData.form_sections.find(section => section.hash ==
            hashSection);

        if (method == "update") {
            if (window.newLineObject.columns.length != window.newLineObject.total_columns) {
                for (let i = 0; i < window.newLineObject.columns.length; i++) {
                    if (window.newLineObject.columns[i].input != null) {
                        let alert = $(this.attr.line.modal.alert);
                        UtilsController.showAlert(alert, 'La linea contiene campos creados no es posible su edicion', true);
                        return false;
                    }
                }
            }
            let line = section.lines.find(line => line.hash == window.newLineObject.hash);
            line.admin_panel.permission_update = window.newLineObject.admin_panel.permission_update;
            line.admin_panel.permission_delete = window.newLineObject.admin_panel.permission_delete;
            line.admin_panel.permission_create = window.newLineObject.admin_panel.permission_create;
            if (line.total_columns != window.newLineObject.total_columns) {
                line.columns = [];
                for (let i = 0; i < window.newLineObject.total_columns; i++) {
                    let column = {
                        hash: UtilsController.creatHash(),
                        hash_line: line.hash,
                        hash_section: hashSection,
                        type: "column",
                        order: i + 1,
                        admin_panel: {
                            permission_create: true
                        },
                        input: null
                    };
                    line.columns.push(column);
                }
            }
            line.total_columns = window.newLineObject.total_columns;
        }

        if (method == "create") {
            let lineHash = UtilsController.creatHash();
            let line = {
                hash: lineHash,
                hash_section: hashSection,
                type: window.newLineObject.type,
                order: order,
                admin_panel: {
                    permission_update: window.newLineObject.admin_panel.permission_update,
                    permission_delete: window.newLineObject.admin_panel.permission_delete,
                    permission_create: window.newLineObject.admin_panel.permission_create
                },
                total_columns: window.newLineObject.total_columns,
                columns: []
            };
            for (let i = 0; i < window.newLineObject.total_columns; i++) {
                let column = {
                    hash: UtilsController.creatHash(),
                    hash_line: lineHash,
                    hash_section: hashSection,
                    type: "column",
                    order: i + 1,
                    admin_panel: {
                        permission_create: true
                    },
                    input: null
                };
                line.columns.push(column);
            }
            section.lines.push(line);
        }

        el.closest('.modal').modal('hide');
        $(this.attr.customFormInput).val(JSON.stringify(customFormJsonData));
        UtilsController.savedAlert();
        UtilsController.reloadCustomFormData();
    },
};

export default LineModalCreateController;
