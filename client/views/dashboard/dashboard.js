Template.dashboard.helpers({
    classes: function () {
        var courses = Course.find({ _id : { $in : (Meteor.user().courses || [] ) } }).fetch();
        return courses;
    }
});