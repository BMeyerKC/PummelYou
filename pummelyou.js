Matches = new Meteor.Collection("matches");
var sayConsole = function (message) {
  console.log(message);
};
//
//---- SERVER ----
//
if( Meteor.isServer ) {
  Meteor.publish("matches", function( ) {
      return Matches.find( );
  } );
  Matches.allow({
      insert: function (userId, match) {
        return true;
      },
      update: function (userId, match) {
        if (userId == undefined || userId == null) return false;
        return true;
      }
  });
  Meteor.startup( function( ) {
      sayConsole("server startup");
  } );
}
//
//---- CLIENT ----
//
if( Meteor.isClient ) {
  Meteor.subscribe("matches");
  Meteor.startup( function( ) {
      $( function( ) {
          // Define Minimongo collections to match server/publish.js.
          //Matches = new Meteor.Collection( "matches" );
          // Define routing
          var defaultController = new DefaultRoute( ); 
          var matchController = new MatchRoute( );
          page( "/", defaultController.defaultRoute ); 
          page( "/match", matchController.allMatches ); 
          page( );
      } );
  } );
  //Template Setups
  Template.hello.greeting = function( ) { 
    return "Welcome to pummelyou."; 
  };
  Template.hello.events( { 
      'click input' : function( ) { 
        // template data, if any, is available in 'this'
        if( typeof console !== 'undefined' ) 
          console.log( "You pressed the button" ); 
      } 
  } );
  Template.scoresTop.match = function( ) {
            return Matches.find( );
          };
} 

