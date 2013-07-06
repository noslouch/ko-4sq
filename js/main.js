
function Venue(name, tips, phrasesArray){
    self.name = name
    self.tips = tips
    self.phrases = []
    
    try {
        for (var i = 0; i< phrasesArray.length; i++){
            self.phrases.push(phrasesArray[i].phrase)
        }
    } catch (e) { console.log(self.name + ' doesn\'t have any phrases') }
}

function VenueViewModel(secret){
    var self = this
    self.venueList = ko.observableArray()
    self.location = ko.observable()
    self.url = 'https://api.foursquare.com/v2/venues/explore'
    self.secret = secret
    self.id = '0BHZAIIOAXUE54TFXJX2HHDG0WZV0H1WRTVBZUQLDSLU3MDX'
    self.geoReady = ko.observable(false)
    self.loading = ko.observable(true)
    self.lat;
    self.long;

    self.getVenues = function(){
        self.loading(true)
        self.venueList.removeAll()
        $.ajax({
            url : self.url, 
            data : {
                client_id: self.id,
                client_secret: self.secret,
                ll: self.location() ? undefined : self.lat +','+self.long,
                near : self.location() ? self.location() : undefined
            },
            success : function(d){
                var venues = d.response.groups[0].items
                console.dir(venues)
                for (var i = 0; i < venues.length; i++){
                    self.venueList.push(new Venue(venues[i].venue.name, venues[i].tips[0], venues[i].phrases))
                }
                self.loading(false)
            },
            error : function(x,t,e) {
                console.dir(x.responseText)
                self.loading(false)
            }
        })
    }

    self.init = function(){
        navigator.geolocation.getCurrentPosition(function(p){
                self.lat = p.coords.latitude
                self.long = p.coords.longitude
                self.geoReady(true)
                self.loading(false)
            }, function(e,m) { 
                console.dir(e); console.log(m);
        })
    }
    
    self.init()
}

ko.applyBindings(new VenueViewModel(secret))
