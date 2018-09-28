const Flight = require('./model/flightDetailModel');

class FlightData{
    constructor(){
        this.flights = [{
            fromCity: "Pune",
            toCity: "Delhi",
            departureTime: "10:45 AM",
            arrivalTime: "1:00 PM",
            availableSeats: 20,
            price: 3375,
            carrier: "Air India",
            flightCode: "AI-222",
            departureDate: "Oct 11 2018"
    
        },
        {
            fromCity: "Delhi",
            toCity: "Pune",
            departureTime: "2:00 PM",
            arrivalTime: "4:15 PM",
            availableSeats: 20,
            price: 3375,
            carrier: "Air India",
            flightCode: "AI-212",
            departureDate: "Oct 17 2018"
        },
        {
            fromCity: "Pune",
            toCity: "Delhi",
            departureTime: "7:45 AM",
            arrivalTime: "10:00 AM",
            availableSeats: 20,
            price: 5000,
            carrier: "Air India",
            flightCode: "AI-322",
            departureDate: "Oct 11 2018"
        },
        {
            fromCity: "Delhi",
            toCity: "Pune",
            departureTime: "11:45 AM",
            arrivalTime: "1:15 PM",
            availableSeats: 20,
            price: 5000,
            carrier: "Air India",
            flightCode: "AI-312",
            departureDate: "Oct 17 2018"
        },
        {
            fromCity: "Pune",
            toCity: "Delhi",
            departureTime: "5:45 PM",
            arrivalTime: "8:00 PM",
            availableSeats: 20,
            price: 8235,
            carrier: "Air India",
            flightCode: "AI-422",
            departureDate: "Oct 11 2018"
        },
        {
            fromCity: "Delhi",
            toCity: "Pune",
            departureTime: "8:45 PM",
            arrivalTime: "11:00 PM",
            availableSeats: 20,
            price: 9235,
            carrier: "Air India",
            flightCode: "AI-412",
            departureDate: "Oct 17 2018"
        },

    ]
    }
async cleanDb(){
    await Flight.remove({})
}

pushFlightsToDb(){
    this.flights.forEach((flight)=>{
        const newFlight = new Flight(flight);
        newFlight.save();
    })
}

seedDb(){
    this.cleanDb();
    this.pushFlightsToDb();
}
}

module.exports = FlightData;