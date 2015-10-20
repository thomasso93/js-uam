(function (global) {
	var mapArray;

	if (!global.UAM) {
		global.UAM = {};
	}
    
    global.UAM.aircrafts = [];
    
    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Sample aircraft with sample service  /////////////// 
    
    global.UAM.aircrafts.push({
        code: 'SP-ABC',
        services: []
    });
    
    global.UAM.aircrafts[0].services.push({
        name: 'smth1',
        timeToExecute: 120
    });
    
    //////////////////////////////////////////////////////////////////////////////////////

    global.UAM.addAircraft = function (newAircraftCode) {
		var aircraft = {
			code: newAircraftCode,
			services: []
		};
		global.UAM.aircrafts.push(aircraft);
		return aircraft;
    };

    global.UAM.removeAircraft = function (aircraftObj) {
        var aircrafts = global.UAM.aircrafts;
		var length = aircrafts.length;
		
		for(var i=0; i<length; i++) {
			if (aircrafts[i].code == aircraftObj.code) && (aircrafts[i].services == aircraftObj.services) {
				var index = airctafts.indexOf(airctafts[i]);
				airctafts = airctafts.splice(index, 1);
			}
		}
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExecute) {
	
		if checkIfAircraftExists(aircraftObj) {
			var service = {};
			var aircrafts = global.UAM.aircrafts;
			var index = aircrafts.indexOf(aircraftObj);
			
			service.name = name;
			service.timeToExecute = timeToExecute;
			aircrafts[index].services.push(service)
		}
		else {
			console.log("Could not find given aircraft");
		}
			
    };
        
    global.UAM.reduceTimeToExecute = function(aircraftObj, time) {
        if checkIfAircraftExists(aircraftObj) { 
			var aircrafts = global.UAM.aircrafts;
			var index = aircrafts.indexOf(aircraftObj);
			airctafts[index].services.timeToExecute -= time;
		}
    };
    
    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
        var repair = [];
		var aircrafts = global.UAM.aircrafts;
		var lenght = aircrafts.lenght;
		for (var i=0; i<length; i++) {
			if (aircrafts[i].services.time <= maxTimeToExecute) {
				repair.push(aircrafts[i]);
			}
		}
		return repair;
    };
	
	global.UAM.checkIfAircraftExists = function(aircraftObj) {
		var aircrafts = global.UAM.aircrafts;
		var length = aircrafts.length;
		for(var i=0; i<length; i++) {
			if (aircrafts[i].code == aircraftObj.code) && (aircrafts[i].services == aircraftObj.services) {
				return true;
			}
		}
		return false;
	}

}(window));

/*

Przykład użycia:

var newAircraft1 = addAircraft('SP-XY1');
var newAircraft2 = addAircraft('SP-XY2');

addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);
reduceTimeToExecute(newAircraft1, 20);

var sxy2a = addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft1 ]

removeAircraft(newAircraft1);

getAircraftsForRepairs(100); // []

reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft2 ]

*/
