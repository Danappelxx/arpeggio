Template.course.helpers({
    name: function () {
        return Course.findOne({_id: this.courseId}).name;
    },
    teacher: function () {
        var profile =  Meteor.users.findOne({_id: Course.findOne({_id: this.courseId}).teacher}).profile;
        return profile.firstName + " " + profile.lastName;
    },
    forms: function () {
        return Form.find({course : this.courseId}).fetch();
    },
    courseId: function() {
        return this.courseId;
    }
});

Template.form.helpers({
    formComponents: function () {
        var components = Component.find({ _id : { $in : this.components } }).fetch();
        return components;
    },
    schema: function () {
        var components = Component.find({ _id : { $in : this.components } }).fetch();

        var schemas = components
            .map((el) => {
                var componentConverter = new ComponentConverter(el.inputType, el.label, el.data);
                return {
                    type: String,
                    optional: true,
                    autoform: componentConverter.autoform,
                    label: el.label
                };
            })
            .reduce((prev, curr) => {
                prev[curr.label] = curr;
                return prev;
            }, {});

        var schema = new SimpleSchema(schemas);

        return schema;
    },
    schemaIsEmpty: function (schema) {
        return schema._schemaKeys.length === 0;
    }
});

AutoForm.hooks({
    componentForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            Object.keys(insertDoc).forEach(function(key){
                let id = Component.findOne({label: key})._id;
                Response.insert({
                    componentId: id,
                    data: insertDoc[key]
                });
            });
            Session.set('chartDatas', new ResponseProcessor("AAxj8kqqomLJsqqAz").chartDatas);
            this.done();
            return false;
        }
    }
});
