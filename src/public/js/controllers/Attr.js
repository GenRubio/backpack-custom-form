const Attr = {
    customFormInput: '#custom_form_data',
    customFormResultContainer: '#result_custom_form',
    customFormLoadingLabel: '.custom-form_loading-data',
    srfToken: document.querySelector('meta[name="csrf-token"]').content,
    blockCustomFormContainer: '.custom-form-section_block',
    section: {
        modal: {
            modal: '#modalSection',
            title: '#modalSectionLabel',
            openButton: 'button[data-target="#modalSection"]',
            saveButton: '#creat-section-form_submit-button',
            inputs: {
                title: 'input[name="creat-section-form_title"]',
                permissionCreate: 'input[name="creat-section-form_permission_create"]',
                permissionUpdate: 'input[name="creat-section-form_permission_update"]',
                permissionDelete: 'input[name="creat-section-form_permission_delete"]',
            },
            lang: {
                langContainer: '#modal-change-lang_section_modal',
                defaultLangLabel: '.current-language_section_modal',
                optionButton: '.language_section_modal-option_button',
            }
        }
    },
    line: {
        modal: {
            modal: '#modalLine',
            title: '#modalLineLabel',
            openButton: '.lines-section button[data-target="#modalLine"]',
            saveButton: '#creat-line-form_submit-button',
            alert: '.alert-creat-line-form',
            inputs: {
                totalColumns: 'input[name="custom_form_selected_line_columns"]',
                permissionCreate: 'input[name="creat-line-form_permission_create"]',
                permissionUpdate: 'input[name="creat-line-form_permission_update"]',
                permissionDelete: 'input[name="creat-line-form_permission_delete"]',
            },
        }
    },
    input: {
        modal: {
            modal: '#modalInput',
            title: '#modalInputLabel',
            openButton: '.input-container button[data-target="#modalInput"]',
            saveButton: '#creat-input-form_submit-button',
            containerRepeatable: '#select-options',
            alert: ".alert-creat-input-form",
            langButton: {
                button: '#modal-change-lang_unput_modal',
                optionButton: '.language_input_modal-option_button',
                defaultLabel: '.current-language_input_modal',
            },
            inputs: {
                label: 'input[name="creat-input-form_label"]',
                placeholder: 'input[name="creat-input-form_placeholder"]',
                showLabel: 'input[name="creat-input-form_show_label"]',
                name: 'input[name="creat-input-form_name"]',
                prefixName: '.custom-form_prefix-entity-name',
                type: '#select-input-type-custom-form',
                required: 'input[name="creat-input-form_required"]',
                showInPreview: 'input[name="creat-input-form_show_in_preview"]',
                updateInPreview: 'input[name="creat-input-form_update_in_preview"]',
                showInEmail: 'input[name="creat-input-form_show_in_email"]',
            },
            dependences: {
                addButton: '#custom-form-dependences-container_button_create',
                removeButton: '.custom-form-dependence-form_controls-button',
                input: '.custom-form_dependences_select-inputs',
                inputOptions: '.custom-form_dependences_select-input_options',
                layout: '.custom-form-dependence-input.d-none',
                notLayout: '.custom-form-dependence-input:not(.d-none)',
                container: '.custom-form-dependences-container',
            },
            repeatable: {
                addButton: '#repeatable_select-inputs-button_create',
                actionButton: '.repeatable_select-form_controls-button',
                default: '.repeatable_select-inputs-container input[name="default"]',
                value: '.repeatable_select-inputs-container input[name="value"]',
                layout: '.repeatable_select-input.d-none',
                notLayout: '.repeatable_select-input:not(.d-none)',
                container: '.repeatable_select-inputs-container',
                sonContainer: '.repeatable_select-input',
                controls: {
                    up: '.repeatable_select-form_controls-button[data-action="up"]',
                    down: '.repeatable_select-form_controls-button[data-action="down"]',
                },
            }
        }
    },
    actions: {
        controlButtons: '.custom-form_controls-button',
    },
    trans: JSON.parse($('#custom_form_data').attr('data-translations')),
};
export default Attr;
