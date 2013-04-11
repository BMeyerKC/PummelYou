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
           // var headerViewModel = ko.meteor.find(Matches, {});
            var headerViewModel = ko.meteor.find(Matches,{},null, HeaderViewModel);
            var defaultController = new DefaultRoute();
            
            window.matchController = new MatchRoute();
            page("/", defaultController.defaultRoute);
            page("/match", window.matchController.defaultRoute);
            page("/match/create", window.matchController.createMatch);
            page("/match/:id", window.matchController.load, window.matchController.show);

            page();
            
            ko.applyBindings(headerViewModel, document.getElementById("scoresTopWrapper"));

            //$(".datetimepicker").datetimepicker({
            //    language: 'en',
            //    pick12HourFormat: true
            //});


            ko.bindingHandlers.datetimepicker = {
                init: function (element, valueAccessor, allBindingsAccessor) {
                    //initialize datepicker with some optional options
                    //var options = allBindingsAccessor().datepickerOptions || {};
                    console.log(element);
                    $(element).datetimepicker({
                        language: 'en',
                        pick12HourFormat: true
                    });

                    //when a user changes the date, update the view model
                    ko.utils.registerEventHandler(element, "changeDate", function (event) {
                        var value = valueAccessor();
                        if (ko.isObservable(value)) {
                            value(event.date);
                        }
                    });
                },
                update: function (element, valueAccessor) {
                    var widget = $(element).data("datetimepicker");
                    //when the view model is updated, update the widget
                    if (widget) {
                        widget.date = ko.utils.unwrapObservable(valueAccessor());
                        widget.setValue();
                    }
                }
            };

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

