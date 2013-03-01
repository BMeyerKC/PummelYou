Matches = new Meteor.Collection("matches");
var sayConsole = function( message ) {
  console.log( message );
};
//
//---- SERVER ----
//
if( Meteor.isServer ) {
  Meteor.publish("matches", function( ) {
      return Matches.find( );
  } );
  Matches.allow( {
      insert: function( userId, match ) {
        return true;
      },
      update: function( userId, match ) {
        if( userId == undefined || userId == null) return false;
        return true;
      }
  } );
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
          page( "/match/create", matchController.createMatch );
          page( );
      } );
  } );
  //Template Setups
  Template.hello.greeting = function( ) { 
    return "Welcome to pummelyou."; 
  };
  Template.scoresTop.matchGroup = function( ) {
            return Matches.find( );
          };
  Template.scoresTop.helpers({
      gameTimeShort: function (match) {
        if (match.gameTime == null) {
          return "BAD";
        }
        var d = Date.parse(match.gameTime);
        return d.toString("ddd HH:mm tt");
      }
  });
  
  //matchCreate
  Template.matchCreate.rendered = function() {
  };
  
} 

