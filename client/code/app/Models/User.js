
// this model will keep a current record of price data from various sources
var PriceData = Backbone.Model.extend({

  initialize: function() {

    var self = this

    self.sources = ['bitstamp', 'bitpay']

    self.sources.forEach(function(source){

      var price_update = 'latest_price:' + source

      ss.event.on(price_update, function(price){

        self.set(source, price)

      })

    })

  },

  current_price: function(){




  }

})



var Price = Backbone.Model.extend({

  initialize: function() {

    
  }

})



var Commission = Backbone.Model.extend({

  initialize: function() {


  }

})







module.exports = Backbone.Model.extend({

  initialize: function() {

    //

    var self = this

    self.price_data = new PriceData()

    ss.rpc('user.fetch', this.authenticate.bind(this))


    self.on('change:price', function(){

      ss.rpc('update.price', self.get('price'), function(err, res){

      })


    })




    //self.authenticate()


  },

  authenticate: function(err, user){

    var self = this

    if (err) {
      console.log(err)
    }

    if (user != null) {

      self.set(user)
      self.set({authenticated: true})

    } else {
      
      self.set({authenticated: false})

    }
  }
  
})

