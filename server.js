var koa = require('koa');
var app = koa();
var _ = require('koa-route');
var request = require('koa-request');
app.use(require('koa-static')('.'));

app.use(_.get('/weather/day/:lat/:lon', function *(lat, lon){
  var response = yield request(`https://api.forecast.io/forecast/${process.env.FORECAST_API_KEY}/${lat},${lon}?units=si`)
  var data = JSON.parse(response.body);
  var hourly = data.hourly.data; 
  var today = data.daily.data[0];
  this.body = {
    offset:data.offset,
    sunrise:today.sunriseTime, 
    sunset:today.sunsetTime,
    hourly:hourly.filter((_,i)=>i<24)
  };
}));

app.use(_.get('/weather/week/:lat/:lon', function *(lat, lon){
  var response = yield request(`https://api.forecast.io/forecast/${process.env.FORECAST_API_KEY}/${lat},${lon}?units=si`)
  var data = JSON.parse(response.body);
  this.body = data.daily.data.filter((_,i)=>i<7);
}));

app.listen(3000);
