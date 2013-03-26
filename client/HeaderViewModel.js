; var HeaderViewModel = function () {
    var self = this;
    
    self.scoresTop = ko.meteor.find(Matches, {});

    self.scoreTab = function (name) {
        return fixBadUnderScoreString("#scoreTab-" + name());
    };

    self.gameStatus = function(match) {
        if (match.gameTime == null) {
            return "BAD";
        }
        var d = Date.parse(match.gameTime);
        return d.toString("ddd HH:mm tt");
    };

}