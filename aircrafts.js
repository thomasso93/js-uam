(function (global) {
    var mapArray;

    if (!global.UAM) {
        global.UAM = {};
    }

    global.UAM.aircrafts = [];

    global.UAM.aircrafts.push({
        code: 'SP-ABC',
        services: []
    });

    global.UAM.aircrafts[0].services.push({
        name: 'smth1',
        timeToExecute: 120
    });

    global.UAM.addAircraft = function (newAircraftCode) {
        if (typeof newAircraftCode !== "string") {
            return;
        }

        var aircraft = { code: newAircraftCode, services: [] }
        this.aircrafts.push(aircraft)

        return aircraft;
    };

    global.UAM.removeAircraft = function (aircraftObj) {
        var index = this.aircrafts.indexOf(aircraftObj);

        if (index >= 0) {
            this.aircrafts.splice(index, 1);
            return true;
        } else {
            return false;
        }
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExecute) {
        timeToExecute = parseInt(timeToExecute);
        if (aircraftObj == null ||
            typeof aircraftObj !== "object" ||
            typeof name !== "string" ||
            isNaN(timeToExecute)) {
            return;
        }

        var work = { name: name, timeToExecute: timeToExecute };
        aircraftObj.services.push(work);

        return work;
    };

    global.UAM.reduceTimeToExecute = function(aircraftObj, time) {
        time = parseInt(time);
        if (aircraftObj == null ||
            typeof aircraftObj !== "object" ||
            !(aircraftObj.services instanceof Array) ||
            isNaN(time)) {
            return;
        }

        aircraftObj.services.forEach(function(service) {
            service.timeToExecute -= time;
        });
    };

    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
        maxTimeToExecute = parseInt(maxTimeToExecute);
        if (isNaN(maxTimeToExecute)) {
            return;
        }

        var aircraftsForRepairs = [];

        this.aircrafts.forEach(function(aircraft) {
            if (aircraft.services instanceof Array) {
                aircraft.services.forEach(function(service) {
                    if (service.timeToExecute <= maxTimeToExecute &&
                        aircraftsForRepairs.indexOf(aircraft) < 0) {
                        aircraftsForRepairs.push(aircraft);
                    }
                });
            }
        });

        return aircraftsForRepairs;
    };

}(window));

/*

Przyk³ad u¿ycia:

var newAircraft1 = UAM.addAircraft('SP-XY1');
var newAircraft2 = UAM.addAircraft('SP-XY2');

UAM.addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
UAM.addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);
UAM.reduceTimeToExecute(newAircraft1, 20);

var sxy2a = UAM.addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = UAM.addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
UAM.reduceTimeToExecute(newAircraft2, 20);

UAM.getAircraftsForRepairs(100); // [ newAircraft1 ]

UAM.removeAircraft(newAircraft1);

UAM.getAircraftsForRepairs(100); // []

UAM.reduceTimeToExecute(newAircraft2, 20);

UAM.getAircraftsForRepairs(100); // [ newAircraft2 ]

*/