var Match = function () {
    var self = this;

    self.name = ko.observable("");
    self.startDate = ko.observable(new Date());
    self.owner = ko.observable();
    self.players = ko.observableArray();
};

var Player = function () {
    var self = this;

    self.name = ko.observable("Jack");
};
var MatchRoute = function () {
    var self = this;
    // Matches.bindTemplate("matchPage", { liveUpdate: true });
    // Matches.bindTemplate("matchCreate");
    self.defaultRoute = function () {
        console.log("Match - DefaultRoute");
    };
    //allMatches
    self.allMatches = function (query, page) {
        console.log("Match Router - allMatches");
        var html = Meteor.render(function () {
            return Template.matchPage({ matches: self.matches });
        });
        $("#main").html(html);
    };
    //load
    self.load = function (ctx, page) {
        var id = ctx.params.id;
        console.log("Match Router - load: " + id);
    };
    self.matches = Matches.find();
    //createMatch
    self.newMatch = ko.observable();
    
    self.createMatch = function (query, page) {
        console.log("Match Router - createMatch");
        
        var createModal = $("#matchCreateModal");
        ko.cleanNode(createModal);
        self.newMatch(new Match());
        ko.applyBindings(self.newMatch, createModal[0]);
        $("#matchCreateModal").modal();
        $(".datetimepicker").datetimepicker({
            language: 'en',
            pick12HourFormat: true
        });
    };

    $("#matchCreateSubmit").on("click", function (event) {
        console.log("make a match");
        console.log(self.newMatch());

        var newOwner = new Player();
        newOwner.name(Meteor.user().profile.name);
        self.newMatch().owner(newOwner);
        self.newMatch().players.push(new Player());
        console.log(self.newMatch().owner().name());
        $("#matchCreateModal").modal("hide");
    });

};

