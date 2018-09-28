const FlightDetail = require('./model/flightDetailModel');
var flightResult = {};
const fnf = {"error": "Flights not found for selected date"};

exports.searchFlights= function(req, res){
    flightResult = {"departureFlights":[], "returnFlights": []};
    let { fromCity , toCity , departureDate, returnDate, travellers , maxPrice  } = req.query;
    departureDate = departureDate.substring(4,15);
    let query = {fromCity, toCity, departureDate};

    FlightDetail.find(query, function(err, result){
        if(err){
            res.status(422).send({errors: [{title:'Internal Error', detail:'Not able to fetch data'}]});
        }
        if(result.length === 0){
           flightResult.departureFlights.push(fnf);
        }
        flightResult.departureFlights.push(...result);
        if(returnDate){
            returnDate = returnDate.substring(4,15);
            [fromCity, toCity] =[toCity, fromCity];
            departureDate = returnDate;
            queryR = {fromCity, toCity, departureDate};
            
            FlightDetail.find(queryR, function(err, result){
                if(err){
                    res.status(422).send({errors: [{title:'Internal Error', detail:'Not able to fetch data'}]});
                }if(result.length===0){
                    flightResult.returnFlights.push(fnf);
                    return res.json(flightResult);
                }else{
                    flightResult.returnFlights.push(...result);
                    return res.json(flightResult) ;
                }
            });
        }else{
            return res.json(flightResult) ;
        }
    
    });
     
}
