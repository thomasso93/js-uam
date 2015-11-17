clearAircraftList = function(listId) {
    var aircraftList = document.getElementById(listId);
    while (aircraftList.firstChild) {
        aircraftList.removeChild(aircraftList.firstChild);
    }
};

showAircrafts = function(aircrafts) {
    clearAircraftList("aircraftList");
    
	for (var i=0; aircrafts.length; i++) {
		var aircraft = document.createElement('li');
		if (aircrafts[i] != undefined) {
			aircraft.textContent = aircrafts[i].code;
            var list = document.getElementById("aircraftList");
			list.appendChild(aircraft)
		}
		else return;
	}

};

showServicedAircrafts = function(aircrafts) {
    clearAircraftList("servicedAircraftList");
    
	for (var i=0; aircrafts.length; i++) {
		var aircraft = document.createElement('li');
		if (aircrafts[i] != undefined) {
			aircraft.textContent = aircrafts[i].code;
            var list = document.getElementById("servicedAircraftList");
			list.appendChild(aircraft)
		}
		else return;
	}
};

window.onload = function() {
    var addAircraftButton = document.getElementById("addAircraftButton");
    
    addAircraftButton.addEventListener("click", function() { 
        var code = document.getElementById("aircraftCode").value;
        UAM.addAircraft(code);
        showAircrafts(UAM.aircrafts);
    });

    findAircraft = function(code) {
        var length = UAM.aircrafts.length;
        for (var i=0; i<length; i++) {
            var aircraft = UAM.aircrafts[i];
            if (aircraft.code == code) {
                return aircraft;
            }
        }
        return;
    }
    
    var removeAircraftButton = document.getElementById("removeAircraftButton");
    
    removeAircraftButton.addEventListener("click",  function() {
        var code = document.getElementById("aircraftCode").value;
        var aircraft = findAircraft(code);
        UAM.removeAircraft(aircraft);
        showAircrafts(UAM.aircrafts);
    });
    
    var showServiceButton = document.getElementById("showServiceButton");
    
    showServiceButton.addEventListener("click", function() {
       var time = document.getElementById("maxServiceTime").value;
        var servicedAircrafts;
        if (time > 0 ) {
            servicedAircrafts = UAM.getAircraftsForRepairs(time);
        }
        else {
            servicedAircrafts = UAM.getAircraftsForRepairs(99999);
        }
            
//       var servicedAircrafts = UAM.getAircraftsForRepairs(time); 
       showServicedAircrafts(servicedAircrafts); 
    });
    
    var addWorkButton = document.getElementById("addWorkButton");
    
    addWorkButton.addEventListener("click", function() {
        var time = document.getElementById("serviceTime").value;
        var code = document.getElementById("aircraftServiceCode").value;
        var name = document.getElementById("serviceName").value;
        
        var aircraft = findAircraft(code);
        UAM.addWorkToAircraft(aircraft, name, time);
    });
    
    var reduceTimeButton = document.getElementById("reduceTimeButton");
    
    reduceTimeButton.addEventListener("click", function() {
        var time = document.getElementById("serviceTime").value;
        var code = document.getElementById("aircraftServiceCode").value;
        var aircraft = findAircraft(code);
        
        UAM.reduceTimeToExecute(aircraft, time);
    });
};


