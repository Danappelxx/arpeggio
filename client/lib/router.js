Router.configure({
  layoutTemplate: 'main-layout'
});


Router.map( function () {

	// homepage
	this.route('home', {
		path: '/',
		template: 'home',
		layoutTemplate: '',
		onBeforeAction: function () {
			if (Meteor.user()) {
				Router.go('dash');
			} else {
				this.next();
			}
		}
	});
	
	this.route('dash', {
		path: '/dash',
		template: 'dashboard',
		onBeforeAction: function () {
			if (!Meteor.user()) {
				Router.go('home');
			} else {
				this.next();
			}
		}
	});
});

