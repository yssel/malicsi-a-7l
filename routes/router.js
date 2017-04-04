'use strict'

let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let bcrypt = require('bcrypt');

let userController = require("../controllers/user-controller");
let adminController = require('../controllers/admin-controller');
let gameController = require('../controllers/game-controller');
let sponsorController = require('../controllers/sponsor-controller')
let sportController = require("../controllers/sport-controller");
let matchController = require("../controllers/match-controller");
let logController = require("../controllers/log-controller");
let competitorController = require("../controllers/competitor-controller");
let organizerController = require("../controllers/organizer-controller");
let teamController = require("../controllers/team-controller");

function sha256Hash(req, res, next) {
    if (req.body.password == undefined) {
        console.log("Hello");
        res.status(404).send({ 'message' : 'Incorrect credentials'});
    } else {
        console.log("Hi");
        let hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        req.body.password = hash.digest('hex');
        next();
    }
}

//admin/system routers
function bcryptHash(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
       if (!err) {
           req.body.password = hash;
           next();
       } else {
           console.log(err);
           res.status(404).send('Error in bcrypt');
       }
    });
}

// Example usage: router.post('/r/anime', checkUser('O'), createGame);
function checkUser(type) {
    return (req, res, next) => {
        if (req.session.user !== undefined && (req.session.user.type === type || req.session.user.type === 'A')) {
            next();
        } else {
            res.status(401).send({'message': 'Unauthorized access.'});
        }
    };
}

//overall user routers
router.post('/login', sha256Hash, userController.login);
router.post('/organizer', checkUser('A'), sha256Hash, bcryptHash, adminController.createOrganizer);
router.post('/register', sha256Hash, bcryptHash, userController.register);
router.get('/logout', userController.logout);
router.get('/user/:id', userController.getUserInfo);
router.put('/user/update', sha256Hash, bcryptHash, userController.update);
router.put('/user/:id/active', checkUser('A'), adminController.changeActivity);
router.get('/user/info', userController.getUserInfo);

//competitor routers
router.get('/competitor/searchCompetitor', competitorController.searchCompetitor);
router.put('/competitor/editCompetitor', competitorController.editCompetitor);
router.get('/competitor/getCompetitorTeams', competitorController.getCompetitorTeams);
router.get('/competitor/getCompetitor', competitorController.getCompetitor);

//organizer routers
router.get('/organizer/searchOrganizer', organizerController.searchOrganizer);
router.get('/organizer/findGames',organizerController.findGames);
router.get('/organizer/findSport',organizerController.findSport);
router.get('/organizer/findTeam',organizerController.findTeam);
router.put('/organizer/editOrganizer', organizerController.editOrganizer);
router.get('/organizer/getRequest', organizerController.getRequest);
router.post('/organizer/acceptRequest', organizerController.acceptRequest);
router.get('/organizer/getPendingParticipation', organizerController.getPendingParticipation);

//team routers
router.get('/team/teamStatistics',teamController.getTeamStatistics);
router.post('/team/createTeam',teamController.createTeam);
router.delete('/team/deleteTeam',teamController.deleteTeam);
router.post('/team/teamMembershipRequest',teamController.teamMembershipRequest);
router.post('/team/acceptMembershipRequest',teamController.acceptMembershipRequest);
router.get('/team/countTeamInSports',teamController.countTeamInSports);
router.get('/team/getTeamMembers',teamController.getTeamMembers);

//log routers
router.get('/log/viewAllLogs', checkUser('A'), logController.viewAllLogs);
router.post('/log/viewLogsByDate', checkUser('A'), logController.viewLogsByDate);

//game routers
router.get('/game/search/:keyword', gameController.searchForGameByKeyword);
router.get('/game/viewGame',  gameController.viewGameDetails);
router.get('/game/countGameOrganizer/:organizerId', gameController.countGameOrganizer);
router.post('/game/createGame',  gameController.createGame);
router.post('/game/addSponsor',  sponsorController.addSponsorToGame);
router.put('/game/updateGame',  gameController.updateGame);
router.put('/game/editSponsor',  sponsorController.editSponsorDetails);
router.delete('/game/deleteGame/',  gameController.deleteGame);
router.delete('/game/deleteSponsor',  sponsorController.deleteSponsorFromGame);

//sport routers
router.get('/sport/:sportId', sportController.viewSportDetails);
router.post('/sport/createSport', sportController.createSport);
router.put('/sport/editMatch', matchController.editMatch);
router.put('/sport/editTeamRankingInMatch', matchController.editTeamRankingInMatch);
router.post('/sport/addWinnerSport', sportController.addWinnerSport);
router.put('/sport/editSport', sportController.editSport);
router.delete('/sport/deleteSport', sportController.deleteSport);


//match routers
router.post('/sport/match/addMatch',  matchController.addMatch);
router.get('/sport/match/:sportId',  matchController.viewMatchInSport);

//log routers
router.get('/log/viewAllLogs', checkUser, logController.viewAllLogs);
router.post('/log/viewLogsByDate', checkUser, logController.viewLogsByDate);

module.exports = router;
