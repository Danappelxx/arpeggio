/* globals Component SimpleSchema */
Component = new Mongo.Collection("component");
Component.attachSchema(new SimpleSchema({
    inputType: {
        type: Number,
        label: "Input Type"
    },
    label: {
        type: String,
        label: "Text Label"
    },
    graphType: {
        type: Number,
        label: "Graph Type"
    },
    data: {
        type: Object,
        label: "Component Data",
        optional: true
    },
    form: { // if doesn't have one, is global
        type: String,
        label: "Form Id",
        optional: true
    }
}));

// To use:
// if (Component.type == Component.key.InputType.checkbox { // do stuff }
Component.Key = {
    InputType: {
        checkbox: 0,
        range: 1,
        radio: 2,
        text: 3,
        number: 4
    },

    GraphType: {
        bar: 0,
        pie: 1,
        histogram: 2,
        time: 3
    }
};


ComponentConverter = class ComponentConverter {

    constructor(inputType, label, data) {
        this.inputType = inputType;
        this.label = label;
        this.data = data;


        // reference: http://autoform.meteor.com/types
        switch (this.inputType) {
            case Component.Key.InputType.range:
            case Component.Key.InputType.number:
            case Component.Key.InputType.text:
                this.autoform = {
                    afFieldInput: {
                        type: this.convertInputType()
                    }
                };
                break;

            case Component.Key.InputType.checkbox:
            case Component.Key.InputType.radio:
                this.autoform = {
                    type: this.convertInputType(),
                    options: () => {
                        return this.data;
                    }
                };
                break;
        }
    }

    convertInputType() {
        switch (this.inputType) {
            case Component.Key.InputType.range: return 'range';
            case Component.Key.InputType.number: return 'number';
            case Component.Key.InputType.text: return 'text';
            case Component.Key.InputType.checkbox: return 'select-checkbox';
            case Component.Key.InputType.radio: return 'select-radio';
        }
    }
};
