Router.configure({
  layoutTemplate: 'main-layout'
});


Router.map( function () {

	// homepage
	this.route('home', {
		path: '/',
		template: 'home'
	});
});