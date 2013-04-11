; var HeaderViewModel = {
    key: function(item) {
        return ko.utils.unwrapObservable(item._id);
    },
    create: function(options) {
        return new Match(options.data);
    }
    //"scoresTop": {
    //    create: function(options)
    //}    

    
    //self.scoresTop = ko.meteor.find(Matches, {});

    //self.scoreTab = function (name) {
    //    return fixBadUnderScoreString("#scoreTab-" + name());
    //};

    //self.status = ko.computed(function () {
    //    //if (match.gameTime == null) {
    //        return "BAD";
    //   // }
    //    //var d = Date.parse(self.startDate());
    //    return self.startDate().toString("ddd HH:mm tt");

    //});

}