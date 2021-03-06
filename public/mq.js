//Key: PS1Bq1cbgnnXfVOA1t1s6FOOR4NSUi9r

//GET:
//http://www.mapquestapi.com/directions/v2/route

var key = 'PS1Bq1cbgnnXfVOA1t1s6FOOR4NSUi9r';

var currentRow = "";
var houseCount = 0;
var distanceString = "";
var latLngString = "";
var hasError = false;
var timeToTrain = "";
var myStation = "";

function getNewYorkTime(station, trainTime) {
	var trainInt = parseInt(trainTime.substr(3,2)) + 60 * parseInt(trainTime.substr(0,2)) //Gets time in minutes
	var additionalTime = 0;
	switch (station) {
		case "Aberdeen-Matawan":
			additionalTime = 63;
			break;
		case "Allenhurst":
			additionalTime = 106;
			break;
		case "Asbury Park":
			additionalTime = 110;
			break;
		case "Avenel":
			additionalTime = 57;
			break;
		case "Basking Ridge":
			additionalTime = 79;
			break;
		case "Berkeley Heights":
			additionalTime = 62;
			break;
		case "Bound Brook":
			additionalTime = 89;
			break;
		case "Brick Church":
			additionalTime = 28;
			break;
		case "Bridgewater":
			additionalTime = 92;
			break;
		case "Chatham":
			additionalTime = 49;
			break;
		case "Convent Station":
			additionalTime = 58;
			break;
		case "Cranford":
			additionalTime = 59;
			break;
		case "Dunellen":
			additionalTime = 83;
			break;
		case "East Orange":
			additionalTime = 43;
			break;
		case "Edison":
			additionalTime = 52;
			break;
		case "Elberon":
			additionalTime = 102;
			break;
		case "Elizabeth":
			additionalTime = 35;
			break;
		case "Fanwood":
			additionalTime = 71;
			break;
		case "Garwood":
			additionalTime = 62;
			break;
		case "Gillette":
			additionalTime = 66;
			break;
		case "Hazlet":
			additionalTime = 67;
			break;
		case "Highland Avenue":
			additionalTime = 51;
			break;
		case "Hoboken Terminal":
			additionalTime = 10;
			break;
		case "Jersey Avenue":
			additionalTime = 62;
			break;
		case "Linden":
			additionalTime = 43;
			break;
		case "Little Silver":
			additionalTime = 84;
			break;
		case "Long Branch":
			additionalTime = 90;
			break;
		case "Lyons":
			additionalTime = 76;
			break;
		case "Madison":
			additionalTime = 54;
			break;
		case "Maplewood":
			additionalTime = 38;
			break;
		case "Metropark Station":
			additionalTime = 39;
			break;
		case "Metuchen":
			additionalTime = 45;
			break;
		case "Middletown":
			additionalTime = 73;
			break;
		case "Millburn":
			additionalTime = 35;
			break;
		case "Millington":
			additionalTime = 72;
			break;
		case "Monmouth Park":
			additionalTime = 60000;
			break;
		case "Morristown":
			additionalTime = 62;
			break;
		case "Mountain Station":
			additionalTime = 53;
			break;
		case "Murray Hill":
			additionalTime = 57;
			break;
		case "Netherwood":
			additionalTime = 75;
			break;
		case "New Brunswick":
			additionalTime = 55;
			break;
		case "New Providence":
			additionalTime = 54;
			break;
		case "Newark Broad Street":
			additionalTime = 22;
			break;
		case "North Elizabeth":
			additionalTime = 32;
			break;
		case "Orange":
			additionalTime = 48;
			break;
		case "Penn Station (Newark)":
			additionalTime = 21;
			break;
		case "Perth Amboy":
			additionalTime = 66;
			break;
		case "Plainfield":
			additionalTime = 78;
			break;
		case "Rahway":
			additionalTime = 48;
			break;
		case "Raritan":
			additionalTime = 100;
			break;
		case "Red Bank":
			additionalTime = 80;
			break;
		case "Roselle Park":
			additionalTime = 53;
			break;
		case "Seacaucus Junction":
			additionalTime = 13;
			break;
		case "Short Hills":
			additionalTime = 44;
			break;
		case "Somerville":
			additionalTime = 97;
			break;
		case "South Amboy":
			additionalTime = 71;
			break;
		case "South Orange":
			additionalTime = 33;
			break;
		case "Stirling":
			additionalTime = 69;
			break;
		case "Summit":
			additionalTime = 45;
			break;
		case "Union":
			additionalTime = 48;
			break;
		case "Westfield":
			additionalTime = 65;
			break;
		case "Woodbridge":
			additionalTime = 60;
			break;		
	}
	console.log("station = " + station);
	console.log("trainTime = " + trainTime);
	console.log("trainInt = " + trainInt);
	console.log("additionalTime = " + additionalTime);
	var totalInt = trainInt + additionalTime;
	var hours = Math.floor(totalInt / 60);
	var minutes = (totalInt % 60);
	var formattedHours = ("0" + hours).slice(-2);
	var formattedMinutes = ("0" + minutes).slice(-2);
	if (hours == 0) {
		return formattedMinutes + ":" + "00";
	}
	return ( formattedHours + ":" + formattedMinutes + ":00");
}

function fixDistance(dist) {
    if (dist[1] == '0') {
        return dist.substr(3, 5);
    } else {
        return dist.substr(1, 7);
    }
}

function distance(lat1,lng1,lat2,lng2) {
    var xMiles;
    var yMiles;
    var zMiles;
    yMiles = 68.941 * (lat1 - lat2);
    xMiles = 52.811 * (lng1 - lng2);
    zMiles = Math.sqrt((xMiles * xMiles) + (yMiles * yMiles));
    return zMiles;
}

function closestStation(lat, lng) {
    var minDistance;
    var currDistance;
    var minStation;
    //Aberdeen Matawan: 40.419746, -74.222053
    currDistance = distance(lat,lng,40.419746, -74.222053);
    minStation = "Aberdeen-Matawan";
    minDistance = currDistance;
    latLngString = "40.419746,-74.222053";
    //Allenhurst
    currDistance = distance(lat,lng,40.237628, -74.0066);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Allenhurst";
        latLngString = "40.237628,-74.0066";
    }
    currDistance = distance(lat,lng,40.216298,-74.014546);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Asbury Park";
        latLngString = "40.216298,-74.014546";
    }
    currDistance = distance(lat,lng,40.577703,-74.277419);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Avenel";
        latLngString = "40.577703,-74.277419";
    }
    currDistance = distance(lat,lng,40.711378,-74.55527);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Basking Ridge";
        latLngString = "40.711378,-74.55527";
    }
    currDistance = distance(lat,lng,40.682445,-74.442705);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Berkeley Heights";
        latLngString = "40.682445,-74.442705";
    }
    currDistance = distance(lat,lng,40.560929,-74.530617);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Bound Brook";
        latLngString = "40.560929,-74.530617";
    }
    currDistance = distance(lat,lng,40.765134,-74.218612);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Brick Church";
        latLngString = "40.765134,-74.218612";
    }
    currDistance = distance(lat,lng,40.559906,-74.551741);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Bridgewater";
        latLngString = "40.559906,-74.551741";
    }
    currDistance = distance(lat,lng,40.740096,-74.385083);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Chatham";
        latLngString = "40.740096,-74.385083";
    }
    currDistance = distance(lat,lng,40.778922,-74.443463);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Convent Station";
        latLngString = "40.778922,-74.443463";
    }
    currDistance = distance(lat,lng,40.655283,-74.302792);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Cranford";
        latLngString = "40.655283,-74.302792";
    }
    currDistance = distance(lat,lng,40.590765,-74.462922);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Dunellen";
        latLngString = "40.590765,-74.462922";
    }
    currDistance = distance(lat,lng,40.761335,-74.210954);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "East Orange";
        latLngString = "40.761335,-74.210954";
    }
    currDistance = distance(lat,lng,40.519079,-74.41084);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Edison";
        latLngString = "40.519079,-74.41084";
    }
    currDistance = distance(lat,lng,40.265292,-73.99762);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Elberon";
        latLngString = "40.265292,-73.99762";
    }
    currDistance = distance(lat,lng,40.6668,-74.215761);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Elizabeth";
        latLngString = "40.6668,-74.215761";
    }
    currDistance = distance(lat,lng,40.640799,-74.385402);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Fanwood";
        latLngString = "40.640799,-74.385402";
    }
    currDistance = distance(lat,lng,40.652612,-74.324939);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Garwood";
        latLngString = "40.652612,-74.324939";
    }
    currDistance = distance(lat,lng,40.678253,-74.468317);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Gillette";
        latLngString = "40.678253,-74.468317";
    }
    currDistance = distance(lat,lng,40.415385,-74.190393);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Hazlet";
        latLngString = "40.415385,-74.190393";
    }
    currDistance = distance(lat,lng,40.766796,-74.243618);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Highland Avenue";
        latLngString = "40.766796,-74.243618";
    }
    currDistance = distance(lat,lng,40.734853,-74.02859);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Hoboken Terminal";
        latLngString = "40.734853,-74.02859";
    }
    currDistance = distance(lat,lng,40.476476,-74.467926);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Jersey Avenue";
        latLngString = "40.476476,-74.467926";
    }
    currDistance = distance(lat,lng,40.629779,-74.250908);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Linden";
        latLngString = "40.629779,-74.250908";
    }
    currDistance = distance(lat,lng,40.326715,-74.041054);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Little Silver";
        latLngString = "40.326715,-74.041054";
    }
    currDistance = distance(lat,lng,40.29704,-73.988288);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Long Branch";
        latLngString = "40.29704,-73.988288";
    }
    currDistance = distance(lat,lng,40.684844,-74.54947);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Lyons";
        latLngString = "40.684844,-74.54947";
    }
    currDistance = distance(lat,lng,40.757186,-74.415125);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Madison";
        latLngString = "40.757186,-74.415125";
    }
    currDistance = distance(lat,lng,40.731149,-74.275427);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Maplewood";
        latLngString = "40.731149,-74.275427";
    }
    currDistance = distance(lat,lng,40.56812,-74.329657);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Metropark Station";
        latLngString = "40.56812,-74.329657";
    }
    currDistance = distance(lat,lng,40.540698,-74.360329);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Metuchen";
        latLngString = "40.540698,-74.360329";
    }
    currDistance = distance(lat,lng,40.390795,-74.116939);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Middletown";
        latLngString = "40.390795,-74.116939";
    }
    currDistance = distance(lat,lng,40.725744,-74.303736);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Millburn";
        latLngString = "40.725744,-74.303736";
    }
    currDistance = distance(lat,lng,40.673608,-74.52348);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Millington";
        latLngString = "40.673608,-74.52348";
    }
    currDistance = distance(lat,lng,40.797113,-74.474086);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Morristown";
        latLngString = "40.797113,-74.474086";
    }
    currDistance = distance(lat,lng,40.755367,-74.253024);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Mountain Station";
        latLngString = "40.755367,-74.253024";
    }
    currDistance = distance(lat,lng,40.694963,-74.403196);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Murray Hill";
        latLngString = "40.694963,-74.403196";
    }
    currDistance = distance(lat,lng,40.629148,-74.403455);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Netherwood";
        latLngString = "40.629148,-74.403455";
    }
    currDistance = distance(lat,lng,40.496654,-74.446092);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "New Brunswick";
        latLngString = "40.496654,-74.446092";
    }
    currDistance = distance(lat,lng,40.712022,-74.386501);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "New Providence";
        latLngString = "40.712022,-74.386501";
    }
    currDistance = distance(lat,lng,40.747445,-74.17193);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Newark Broad Street";
        latLngString = "40.747445,-74.17193";
    }
    currDistance = distance(lat,lng,40.680931,-74.205608);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "North Elizabeth";
        latLngString = "40.680931,-74.205608";
    }
    currDistance = distance(lat,lng,40.771773,-74.233301);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Orange";
        latLngString = "40.771773,-74.233301";
    }
    currDistance = distance(lat,lng,40.734361,-74.164157);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Penn Station (Newark)";
        latLngString = "40.734361,-74.164157";
    }
    currDistance = distance(lat,lng,40.509326,-74.273569);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Perth Amboy";
        latLngString = "40.509326,-74.273569";
    }
    currDistance = distance(lat,lng,40.618233,-74.420234);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Plainfield";
        latLngString = "40.618233,-74.420234";
    }
    currDistance = distance(lat,lng,40.606023,-74.277078);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Rahway";
        latLngString = "40.606023,-74.277078";
    }
    currDistance = distance(lat,lng,40.570957,-74.634401);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Raritan";
        latLngString = "40.570957,-74.634401";
    }
    currDistance = distance(lat,lng,40.348341,-74.074262);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Red Bank";
        latLngString = "40.348341,-74.074262";
    }
    currDistance = distance(lat,lng,40.667152,-74.26632);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Roselle Park";
        latLngString = "40.667152,-74.26632";
    }
    currDistance = distance(lat,lng,40.761331,-74.075923);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Secaucus Junction";
        latLngString = "40.761331,-74.075923";
    }
    currDistance = distance(lat,lng,40.725153,-74.323781);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Short Hills";
        latLngString = "40.725153,-74.323781";
    }
    currDistance = distance(lat,lng,40.566072,-74.613939);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Somerville";
        latLngString = "40.566072,-74.613939";
    }
    currDistance = distance(lat,lng,40.483239,-74.279181);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "South Amboy";
        latLngString = "40.483239,-74.279181";
    }
    currDistance = distance(lat,lng,40.745893,-74.260431);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "South Orange";
        latLngString = "40.745893,-74.260431";
    }
    currDistance = distance(lat,lng,40.674581,-74.493723);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Stirling";
        latLngString = "40.674581,-74.493723";
    }
    currDistance = distance(lat,lng,40.716698,-74.357716);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Summit";
        latLngString = "40.716698,-74.357716";
    }
    currDistance = distance(lat,lng,40.683663,-74.238605);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Union";
        latLngString = "40.683663,-74.238605";
    }
    currDistance = distance(lat,lng,40.649277,-74.347611);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Westfield";
        latLngString = "40.649277,-74.347611";
    }
    currDistance = distance(lat,lng,40.556537,-74.277794);
    if (currDistance < minDistance) {
        minDistance = currDistance;
        minStation = "Woodbridge";
        latLngString = "40.556537,-74.277794";
    }
    
    return minStation;
}

function getDistance(add1, add2) {
	$.ajax({
		url: 'http://www.mapquestapi.com/directions/v2/route?key=' + key + '&from=' + add1 + '&to=' + add2,
		type: "GET", 
        async: false,
		//dataType: "jsonp",
		//jsonpCallback: 'jsonp_callback',
		contentType: 'application/json',
		success: function (result) {
            if (result.info.statuscode == 500) {
                alert("Mapquest Unknown Error");
                hasError = true;
                console.log(result.info.messages);
            }
            if (!hasError) {
                console.log("Successful API Call");
                console.log(result.route.formattedTime);
                distanceString = fixDistance(result.route.formattedTime);
                currentRow = currentRow + "<td>" + distanceString + "</td>";	
                console.log("Time from " + add1 + " and " + add2 + " is " + result.route.formattedTime);
                houseCount++;
                if (houseCount == 3) {
					myStation = closestStation(result.route.locations[0].latLng.lat, result.route.locations[0].latLng.lng);
                    currentRow = currentRow + "<td>" + myStation + "</td>";                
                } else if (houseCount == 4) {
					//Add New York Time
					timeToTrain = result.route.formattedTime;
					currentRow = currentRow + "<td>" + getNewYorkTime(myStation, timeToTrain) + "</td>"; 
                    currentRow = currentRow + "</tr>";
                    $('#results tr:last').after(currentRow);
                    houseCount = 0;
                    currentRow = "";					
                }
            }
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("error");
			alert(xhr.status);
			alert(thrownError);
		}
	});
}

$(document).ready(function(){
	$("#fetch").click(function(){
        hasError = false;
		currentRow = currentRow + "<tr>" + "<td class='addressCell'>" + $("#add").val() + "</td>";
        if (!hasError) {
            getDistance($("#add").val(), "606 Main St, Belmar, NJ 07719");
        }
        if (!hasError) {
            getDistance($("#add").val(), "1154 US Highway 22, Mountainside, NJ 07092");
        }
        if (!hasError) {
            getDistance($("#add").val(), "948 Yellowbank Rd, Toms River, NJ 08753");
        }
        if (!hasError) {
            getDistance($("#add").val(), latLngString);
        }
		console.log(currentRow);
	});
});