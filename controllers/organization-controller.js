const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganization = (req, res) => {
	query = 'select * from organization where name like ?';

	connection.userType('A').query(query,
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
			if(!err) {
				return res.status(200).send(rows);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.editOrganization = (req, res) => {
	query = 'update organization set name = ? where organization_id = ?';

	connection.userType('A').query(query,
		[
			req.body.name, req.body.organization_id
		], (err, rows) => {
			if(!err){
				if(rows.affectedRows === 0) return res.status(404).send({ 'message': 'Organization was not updated.' });
				else return res.status(200).send(rows);
			}else return res.status(500).send({'message' : 'Internal Server Error'});
		}
	);
}

exports.addOrganization = (req, res) => {
	query = 'insert into organization (name) values(?)';

	connection.userType('A').query(query,
        [
            req.body.name
        ], (err, rows) => {
            if(!err) {
                return res.status(200).send({ 'message' : 'Sucessfully created organization'});
            } else {
                return res.status(500).send({ 'message' : 'Internal Server Error'});
            }
        }
    );
}

/**
exports.checkOrganization = (req, res) => {
	connection.userType('A').query('CALL get_organization(?)',
		[req.body.orgName],
		(err, rows) => {
		if (!err && rows[0].length!=0) {
			return res.status(200).send(rows);
		}
		else if (rows[0].length==0){
			res.status(404).send("Organization not found.");
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}
**/
exports.addOrganizationToGame = (req, res) =>{
	connection.userType('A').query('CALL get_organization(?, ?)',
		[req.body.orgId, req.body.gameId],
		(err, rows) => {
		if (!err) {
			return res.status(200).send("Successfully Added");
		}else{
			res.status(500).send("Internal Server Error");
		}


	})
}
