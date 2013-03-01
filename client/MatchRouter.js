var MatchRoute = function( ) {
  var self = this;
  Matches.bindTemplate("matchPage", { liveUpdate: true } );
  Matches.bindTemplate("matchCreate");
  self.allMatches = function( query, page ) {
		console.log("Match Router - allMatches");
		var html = Meteor.render( function( ) {
			return Template.matchPage( { matches: self.matches} );
		} );
    	$("#main").html( html );	
	};
	self.createMatch = function( query, page ) {
	  console.log("Match Router = createMatch");
	  var html = Meteor.render( function( ) {
	      return Template.matchCreate( );
	  } );
	  $("#main").html( html );
    $(".datetimepicker").datetimepicker( {
      language: 'en',
      pick12HourFormat: true    } );
	};
	self.matches = Matches.find( );
};

