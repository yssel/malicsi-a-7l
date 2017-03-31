
delimiter //
	create procedure edit_sport(in sportName varchar(50), in mechanicsInput text, in timeStart time, in timeEnd time, in startDate date, in endDate date, in sportDate date, in scoringSystem varchar(50), in sportId int(11))
	BEGIN
		UPDATE sport SET sport_name = sportName, mechanics = mechanicsInput, time_start = timeStart, time_end = timeEnd, start_end = startDate, end_date = endDate, sport_date = sportDate, scoring_system = scoringSystem WHERE sport_id = sportId;
	END;
	//
delimiter ;

delimiter //
	create procedure add_winner_sport(in winnerInput int(11), in sportId int(11))
	BEGIN
		UPDATE sport SET winner = winnerInput WHERE sport_id = sport_id;
	END;
	//
delimiter ;

delimiter //
	create procedure delete_sport(in sportId int(11))
	BEGIN
		DELETE FROM sport WHERE sport_id = sportId;
	END;
	//
delimiter ;


GRANT execute ON procedure delete_sport to organizer;
GRANT execute ON procedure add_winner_sport to organizer;
GRANT execute ON procedure edit_sport to organizer;
GRANT execute ON procedure delete_sport to administrator;
GRANT execute ON procedure add_winner_sport to administrator;
GRANT execute ON procedure edit_sport to administrator;
