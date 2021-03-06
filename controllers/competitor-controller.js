'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const logs = require('./../controllers/log-controller.js');

exports.searchCompetitor = (req, res) => {
	let query = "CALL search_competitor(?)";
	
	connection.userType("G").query(query,
		[
			"%" + req.query.keyword + "%"
		], (err, rows) => {
		    if(!err) {
		    	if(rows[0].length == 1) {
					return res.status(200).send(rows[0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getCompetitor = (req, res) => {
	let query = "CALL get_competitor(?)";

	connection.userType("G").query(query,
		[
			req.query.search
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0][0]);

			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getCompetitorTeams = (req, res) => {
	let query = 'CALL get_competitor_teams(?)';
	
	connection.userType(req.session.user.type).query(query,
		[
			req.session.user.id
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0]);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
}

exports.getCompetitorTeamsPublic = (req, res) => {
	let query = 'CALL get_competitor_teams(?)';
	
	connection.userType("G").query(query,
		[
			req.query.id
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0]);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
}

exports.getCompetitorOrganization = (req, res) => {
	let query = 'CALL get_competitor_organization(?)';
	
	connection.userType("G").query(query,
		[
			req.session.user.id
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0]);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
}

exports.editCompetitor = (req,res) => {
	let query = "CALL edit_competitor(?,?,?,?,?,?)";
	let query1 = "CALL get_competitor(?)";

	connection.userType(req.session.user.type).query(query,
		[
			req.body.birthday,
			req.body.first_name,
			req.body.last_name,
			req.body.nickname,
			req.body.sex,
			req.session.user.id
		], (err, rows) => {
			if(!err) {
				connection.userType(req.session.user.type).query(query1,
					[
						req.session.user.id
					], (err, rows) => {
						if(!err) {
							logs.createLog(req.session.user.id,"Edited Competitor Information");
							return res.status(200).send(rows[0][0]);
						}
					}
				);
			} else {
				return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}

exports.editCompetitorBio = (req,res) => {
	let query = "CALL edit_competitor_bio(?,?)";
	let query1 = "CALL get_competitor(?)";

	connection.userType(req.session.user.type).query(query,
		[
			req.body.bio,
			req.session.user.id
		], (err, rows) => {
			if(!err) {
				connection.userType(req.session.user.type).query(query1,
					[
						req.session.user.id
					], (err, rows) => {
						if(!err) {
							logs.createLog(req.session.user.id,"Edited Competitor Bio");
							return res.status(200).send(rows[0][0]);
						}
						else{
							return res.status(500).send({'message' : 'Internal Server Error'});
						}
					}
				);
			} else {
				return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}

exports.getCompetitorRanking = (req, res) => {
	let query = "CALL get_competitor_ranking(?)";

	connection.userType("G").query(query,
		[
			req.query.id
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0][0]);

			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}
