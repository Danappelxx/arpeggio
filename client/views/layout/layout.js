Template['main-layout'].helpers({
    'components': function () {
        var components = Component.find({}).fetch();
        console.log(components);
        return components;
    }
});

Template['main-layout'].events({
    'click .logout-btn': function(e) {
        e.preventDefault();
        AccountsTemplates.logout();
    },
    'click .add-course-btn': function(e) {
        e.preventDefault();
        $('').on('shown.bs.modal', function () {
            $('.add-course-btn').focus();
        });
    },
    'click .btn-join': function (e) {
        e.preventDefault();
        if ( isStudent(Meteor.user()) ) {
            
            var courseId = $('#course-code-input').val();
            addUserToCourse(Meteor.userId(), courseId);

        } else if ( isTeacher(Meteor.user()) ) {
            var name = $('.course-name-input').val();
            var period = $('.course-period-input').val();

            var courseId  = Course.insert({
                name: name,
                period: period,
                teacher: Meteor.userId()
            });
            
            addUserToCourse(Meteor.userId(), courseId);
        }

        $('.add-course-btn').blur();
    },
});

addUserToCourse = function (userId, courseId) {
    var courses = Meteor.user().courses || [];
    
    courses.push(courseId);
    
    Meteor.users.update( { _id : Meteor.userId() }, { $set : { courses : courses } } );
}