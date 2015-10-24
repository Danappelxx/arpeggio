Template['main-layout'].events({
    'click .logout-btn': function(event) {
        event.preventDefault();
        AccountsTemplates.logout();
    }
})