var Match = function (data) {
    //console.log(ko.mapping.toJS(data));
    var self = this;

    //self.startDate = ko.observable(data.startDate);
    ko.mapping.fromJS(data, {}, this);
    
    self.status = ko.computed(function () {
        if (self.startDate == null) {
            return "BAD";
        }
        //var d = Date.parse(self.startDate());
        //return "whasdfat";
        return self.startDate().toString("ddd HH:mm tt");

    });

    self.owner = ko.observable(data.owner);
    self.players = ko.observableArray();
};

var Player = function (data) {
    var self = this;
    console.log(data);
    self._id = ko.observable(data._id);
    self.name = ko.observable(data.name);
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
    self.createMatch = function (query, page) {
        console.log("Match Router - createMatch");

        var matchCreateApp = new MatchCreateApp();

        var createModal = $("#matchCreateModal");

        ko.cleanNode(createModal);

        ko.applyBindings(matchCreateApp, createModal[0]);
        
        createModal.modal();
    };


};

var MatchCreateApp = function () {
    var self = this;
    
    self.newMatch = ko.mapping.fromJS(new Match({
        owner: new Player({
            _id: Meteor.user()._id
            , name: Meteor.user().profile.name
        }),
        startDate: new Date()
    }));


    self.insertMatch = function () {
        var m = ko.mapping.toJS(self.newMatch);
        //this is needed cause fromJS adds it and meteor no like
        delete m["__ko_mapping__"];
        Matches.insert(m);
        $("#matchCreateModal").modal("hide");
    };

};

