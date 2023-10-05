
import Attr from './Attr.js';
import UtilsController from './UtilsController.js';

const InputModalDependencesController = {
    attr: Attr,
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on('click', this.attr.input.modal.dependences.addButton, (ev) => this.addButtonHandler(ev));
        $(document).on('click', this.attr.input.modal.dependences.removeButton, (ev) => this.removeButtonHandler(ev));
        $(document).on('change', this.attr.input.modal.dependences.input, (ev) => this.inputsSelectHandler(ev));
        $(document).on('change', this.attr.input.modal.dependences.inputOptions, (ev) => this.inputsOptionsSelectHandler(ev));
    },
    inputsSelectHandler(ev) {
        let el = $(ev.currentTarget);
        let dependenceHash = el.find(':selected').data('dependence-hash');
        let inputHash = el.val();
        window.newInputObject.dependences.forEach(function (dependence) {
            if (dependence.hash == dependenceHash) {
                dependence.input_hash = inputHash;
            }
        });
        this.loadItems();
    },
    inputsOptionsSelectHandler(ev) {
        let el = $(ev.currentTarget);
        let dependenceHash = el.find(':selected').data('dependence-hash');
        let inputOptionHash = el.val();
        window.newInputObject.dependences.forEach(function (dependence) {
            if (dependence.hash == dependenceHash) {
                dependence.input_option_hash = inputOptionHash;
            }
        });
    },
    removeButtonHandler(ev) {
        ev.preventDefault();
        let el = $(ev.currentTarget);
        let dependenceHash = el.attr('data-dependence-hash');
        window.newInputObject.dependences = window.newInputObject.dependences.filter(dependence => dependence.hash != dependenceHash);
        this.loadItems();
    },
    addButtonHandler(ev) {
        ev.preventDefault();
        window.newInputObject.dependences.push({
            hash: UtilsController.creatHash(),
            input_hash: null,
            input_option_hash: null
        });
        this.loadItems();
    },
    loadItems() {
        this.removeOptions();
        let lang = UtilsController.defaultLang();
        let customFormJsonData = UtilsController.inputCustomFormValue();
        let columns = this.getColumnsInputByTypes(customFormJsonData, ['select', 'radio', 'checkbox']);
        let attributes = this.attr;

        for (let i = 0; i < window.newInputObject.dependences.length; i++) {
            let dependenceHash = window.newInputObject.dependences[i].hash;
            let item = $(attributes.input.modal.dependences.layout).clone();
            item.attr('data-hash', dependenceHash);
            item.removeClass('d-none');
            let removeButton = item.find(attributes.input.modal.dependences.removeButton);
            removeButton.attr('data-dependence-hash', dependenceHash);

            let selectInput = item.find(attributes.input.modal.dependences.input);
            columns.forEach(function (column) {
                let inputText = UtilsController.getTranslation(lang, column.input.label);
                let inputOption = new Option(inputText + ": " + column.input.name, column.hash);
                $(inputOption).attr('data-options', JSON.stringify(column.input.options));
                $(inputOption).attr('data-dependence-hash', dependenceHash);
                selectInput.append(inputOption);

                if (window.newInputObject.dependences[i].input_hash == column.hash) {
                    inputOption.selected = true;

                    let selectInputOptions = item.find(attributes.input.modal.dependences.inputOptions);
                    for (let j = 0; j < column.input.options.length; j++) {
                        let optionItem = column.input.options[j];
                        let optionText = UtilsController.getTranslation(lang, optionItem.value);
                        let valueOption = new Option(optionText, optionItem.hash);
                        $(valueOption).attr('data-dependence-hash', dependenceHash);
                        selectInputOptions.append(valueOption);
                        if (window.newInputObject.dependences[i].input_option_hash == optionItem.hash) {
                            valueOption.selected = true;
                        }
                    }
                    if (window.newInputObject.dependences[i].input_option_hash == null) {
                        window.newInputObject.dependences[i].input_option_hash = column.input.options[0].hash ?? null;
                    }
                }
            });

            if (window.newInputObject.dependences[i].input_hash == null) {
                item.find(this.attr.input.modal.dependences.inputOptions).attr('disabled', true);
            }

            let container = $(this.attr.input.modal.dependences.container);
            if (i > 0) {
                container.find(this.attr.input.modal.dependences.notLayout).last().after(item);
            } else {
                container.prepend(item);
            }
        }
    },
    removeOptions() {
        $(this.attr.input.modal.dependences.container).find(this.attr.input.modal.dependences.notLayout).not(
            this.attr.input.modal.dependences.addButton).remove();
    },
    getColumnsInputByTypes(customFormJsonData, types) {
        let columns = [];
        for (let i = 0; i < customFormJsonData.form_sections.length; i++) {
            let section = customFormJsonData.form_sections[i];
            for (let j = 0; j < section.lines.length; j++) {
                let line = section.lines[j];
                for (let k = 0; k < line.columns.length; k++) {
                    let column = line.columns[k];
                    if (column.input && types.includes(column.input.type)) {
                        columns.push(column);
                    }
                }
            }
        }
        return columns;
    }
};

export default InputModalDependencesController;
