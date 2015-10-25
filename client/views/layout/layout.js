Meteor.startup(function () {

    var components = Component.find({}).fetch();
    for (var i = 0; i < components.length; i++) {
        if (components[i].form == null) {
            Component.remove( { _id : components[i]._id } );
        }
    }

    // How many minutes did the homework take you?
    Component.insert({
        inputType: Component.Key.InputType.text,
        label: "How many minutes did the homework take you?",
        graphType: Component.Key.GraphType.histogram
    });

    // How did you feel about the amount of homework?
    Component.insert({
        inputType: Component.Key.InputType.radio,
        label: "How did you feel about the amount of homework?",
        graphType: Component.Key.GraphType.pie,
        data: [
                {"label": "Too little", "value": 0},
                {"label": "Just right", "value": 5},
                {"label": "Too much", "value": 10}
        ]
        // form: null // global
    }, function(err, result) {
        console.log(err);
        console.log(result);
    });

    // On a scale of 1-10, how hard was the homework?
    Component.insert({
        inputType: Component.Key.InputType.radio,
        label: "How hard was the homework?",
        graphType: Component.Key.GraphType.histogram,
        data: [
                {label: "Too easy", value: 0},
                {label: "Just right", value: 5},
                {label: "Too difficult", value: 10}
        ]
    });
});

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
    'click .add-form-btn': function (e) {
        e.preventDefault();

        // Handle crete form
    }
});



addUserToCourse = function (userId, courseId) {
    var courses = Meteor.user().courses || [];

    courses.push(courseId);

    Meteor.users.update( { _id : Meteor.userId() }, { $set : { courses : courses } } );
}
