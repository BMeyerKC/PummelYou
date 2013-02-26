var DefaultRoute = function () {
	var self = this;
  
	self.defaultRoute = function(query, page) {
	console.log(query);
		var html = Meteor.render(function (){
			return Template.hello();
		});
		$("#main").html(html);
	};
};