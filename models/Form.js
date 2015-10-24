/* globals Form SimpleSchema */
Form = new Mongo.Collection("form");
Form.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    course: {
        type: String,
        label: "Course ID"
    },
    components: {
        type: [String],
        label: "Components IDs"
    }
}));
