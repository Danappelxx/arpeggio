Meteor.startup(function () {

    // don't change!
    var id1 = "P864bYXSu3koMLASp";
    var id2 = "j2uH9hKyEXH9qwgWf";
    var id3 = "EwgBAoQr6kohqttq8";

    if (! Component.findOne(id1)) {
        // How many minutes did the homework take you?
        Component.insert({
            _id: id1,
            inputType: Component.Key.InputType.text,
            label: "How many minutes did the homework take you?",
            graphType: Component.Key.GraphType.histogram
        });
    }

    if (! Component.findOne(id2)) {
        // How did you feel about the amount of homework?
        Component.insert({
            _id: id2,
            inputType: Component.Key.InputType.dropdown,
            label: "How did you feel about the amount of homework?",
            graphType: Component.Key.GraphType.pie,
            data: [
                JSON.stringify({
                    "label": "Too little",
                    "value": 0
                }),
                JSON.stringify({
                    "label": "Just right",
                    "value": 5
                }),
                JSON.stringify({
                    "label": "Too much",
                    "value": 10
                })
            ]
        });

        console.log(Component.findOne({_id: id2}));
    }

    if (! Component.findOne(id3)) {
        // On a scale of 1-10, how hard was the homework?
        Component.insert({
            _id: id3,
            inputType: Component.Key.InputType.dropdown,
            label: "How hard was the homework?",
            graphType: Component.Key.GraphType.histogram,
            data: [
                JSON.stringify({
                    "label": "Too easy",
                    "value": 0
                }),
                JSON.stringify({
                    "label": "Just right",
                    "value": 5
                }),
                JSON.stringify({
                    "label": "Too difficult",
                    "value": 10
                })
            ]
        });
    }
});

Template['main-layout'].helpers({
    'components': function () {
        var components = Component.find({}).fetch();
        return components;
    }
});

Template.formModal.helpers({
    'templateComponents': function() {
        var components = Component.find({}).fetch();
        var temp = components.filter( (el) => {
            return !el.form;
        });

        console.log(temp);
        return temp;
    }
});

Template['main-layout'].events({
    'click .logout-btn': function(e) {
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

        $('.btn-close').click();
        setTimeout(function(){$(".add-class-btn").blur()}, 1500);
    },
    'click .component-checkbox': function(e) {
        e.preventDefault();

        if ($(e.target).hasClass('todo-done')) {
            $(e.target).removeClass('todo-done');
        } else {
            $(e.target).addClass('todo-done');
        }
    },
    'click .create-form-btn': function(e) {
        e.preventDefault();


        console.log(Router.current().params.courseId);
        var courseId = Router.current().params.courseId;

        var rawComponentIds = [];
        var checked = $('.component-checkbox.todo-done');
        for (let i = 0; i < checked.length; i++) {
            var id = checked.eq(i).data('id');
            rawComponentIds.push(id);
        }

        // $('.component-checkbox').map ( function (i,el) {console.log(el.getAttribute('data-id'))});

        var formId = Random.id();
        console.log(rawComponentIds);
        var componentIds = rawComponentIds
            .map( (el) => {
                var base = Component.findOne(el);
                console.log(base);
                base._id = null;
                base.form = formId;
                return Component.insert(base);
            });

        Form.insert({
            _id: formId,
            name: $('.form-name-input').val(),
            course: courseId,
            components: rawComponentIds
        });
        $(".btn-close").click();
        setTimeout(function(){$(".add-form-btn").blur()}, 1500);
    }
});



addUserToCourse = function (userId, courseId) {
    var courses = Meteor.user().courses || [];

    courses.push(courseId);

    Meteor.users.update( { _id : Meteor.userId() }, { $set : { courses : courses } } );
}
