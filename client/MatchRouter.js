var MatchRoute = function( ) {
  var self = this;
  Matches.bindTemplate("matchPage", { liveUpdate: true } );
  self.allMatches = function( query, page ) {
		console.log("Match Router - allMatches");
		var html = Meteor.render( function( ) {
			return Template.matchPage( { matches: self.matches} );
		} );
    	$("#main").html( html );	
	};
	self.matches = Matches.find( );
};

