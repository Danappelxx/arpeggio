Template.course.helpers({
    name: function () {
        console.log(this.courseId);
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