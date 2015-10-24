/* global Course SimpleSchema */
Course = new Mongo.Collection("course");
Course.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
    },
    teacher: {
        type: String,
        label: "Teacher"
    },
    period: {
        type: String,
        label: "Period"
    }
}));
