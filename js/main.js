// foursquare variables
var id = '0BHZAIIOAXUE54TFXJX2HHDG0WZV0H1WRTVBZUQLDSLU3MDX'
var secret = 'MWLQZUTQT3TKORJELDYA0CSVJPVR5I21IGAVOE5O424XP3EJ'
var url = 'https://api.foursquare.com/v2/venues/explore'

var lat
var long

function getPos(lat, long){
    navigator.geolocation.getCurrentPosition(function(p){
        lat = p.coords.latitude; long = p.coords.longitude;
    }, function(e,m) { 
        console.dir(e); console.log(m); }
    )
}
