Template.home.rendered = () => {
    console.log("rendered!");
};

Template.home.helpers({
    name: function() {
        return Meteor.user().username;
    }
});