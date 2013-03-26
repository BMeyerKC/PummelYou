var Matches = new Meteor.Collection("matches");
var sayConsole = function (message) {
    console.log(message);
};
//
//---- SERVER ----
//
if (Meteor.isServer) {
    Meteor.publish("matches", function () {
        return Matches.find();
    });
    Matches.allow({
        insert: function (userId, match) {
            return true;
        },
        update: function (userId, match) {
            if (userId == undefined || userId == null) return false;
            return true;
        }
    });
    Meteor.startup(function () {
        sayConsole("server startup");
    });
}
//
//---- CLIENT ----
//
if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });

    fixBadUnderScoreString = function (badString) {
        var goodString = badString.replace(/[ ]/g,'_');
        return goodString;
    };
    loadHeader = function () {

    };
    Meteor.subscribe("matches");
    Meteor.startup(function () {
        $(function () {
            // Define Minimongo collections to match server/publish.js.
            //Matches = new Meteor.Collection( "matches" );
            // Define routing
            var headerViewModel = new HeaderViewModel();
            var defaultController = new DefaultRoute();
            matchController = new MatchRoute();
            page("/", defaultController.defaultRoute);
            page("/match", matchController.defaultRoute);
            page("/match/create", matchController.createMatch);
            page("/match/:id", matchController.load, matchController.show);

            page();
            
            ko.applyBindings(headerViewModel, document.getElementById("scoresTopWrapper"));

        });
    });
    //Handlebar Helpers
    Handlebars.registerHelper("underscore", function (badString) {
        var goodString = badString.replace(" ", "_");
        return goodString;
    });
    //Template Setups
    Template.hello.greeting = function () {
        return "Welcome to pummelyou.";
    };
    //Template.scoresTop.matchGroup = function () {
    //    var matches = Matches.find({});
    //    var gameTypes = [ ];
    //    matches.forEach(function (match) {
    //        if (gameTypes.indexOf(match.game) == -1) {
    //            gameTypes.push(match.game);
    //        }
    //    });
    //    return gameTypes;
    //};
    //Template.scoresTop.matches = function () {
    //    var gameType = this.toString();
    //    var matches = Matches.find({"game": gameType });
    //    return matches;
    //};
    //Template.scoresTop.helpers({
    //    gameStatus: function (match) {
    //        if (match.gameTime == null) {
    //            return "BAD";
    //        }
    //        var d = Date.parse(match.gameTime);
    //        return d.toString("ddd HH:mm tt");
    //    }
    //});
    //matchCreate
    Template.matchCreate.rendered = function () {
    };
} 

