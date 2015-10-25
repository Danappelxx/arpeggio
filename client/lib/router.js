Router.configure({
  layoutTemplate: 'main-layout'
});

Router.onBeforeAction('loading');


Router.map( function () {

	// Homepage
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
	
	// Dashboard
	this.route('dash', {
		path: '/dash',
		template: 'dashboard',
		onBeforeAction: function () {
			if (!Meteor.user()) {
				Router.go('home');
			} else {
				this.next();
			}
		},
		yieldRegions: { 
			'courseNav': {to: 'nav'}
		}
	});

	// Class page
	this.route('course', {
		path: '/course/:courseId',
		template: 'course',
		data: function () {
			return { 'courseId' : this.params.courseId };
		},
		yieldRegions: { 
			'formNav': {to: 'nav'}
		}
	});


	this.route('charts', {
		path: '/charts/:formId',
		template: 'charts',

		waitOn: function () {
			return Meteor.subscribe('form');
		},
		data: function () {
			// console.log(this.params.formId);
			return { 'formId' : this.params.formId };
		}
	})
});

