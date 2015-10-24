Template.component.helpers({
    label: function() {
        console.log(this);
        return this.label;
    },
    schema: function () {
        var componentConverter = new ComponentConverter(this.inputType, this.label, (this.data || []));
        
        console.log(componentConverter);
        
        var componentSchema = new SimpleSchema({
            test: {
                type: String,
                optional: true,
                autoform: componentConverter.autoform,
                label: this.label
            }
        });
        
        console.log(componentSchema);

        return componentSchema;
    }
});