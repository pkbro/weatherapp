$(document).ready(function (){
 
//GetCoords function
    function getCoords(city){
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCEQxkNzkdHDvn_yFR9LmXPQZCb9xCGqtM`,

            success: function(data){
                console.log(data);
                getWeatherData(data.results[0].geometry.location);
                getCurrentAddress(data);
            }


        });
    }

    
//GetWeather Function
    function getWeatherData(coords){
            $.ajax({
                url: `https://api.darksky.net/forecast/b7aea5d5306b52279f16f54ef0ed9d5f/${coords.lat},${coords.lng}`,

                jsonp: "callback",

                dataType: "jsonp",

                success: function( data ) {
                    console.log(data);
                    getCurrentWeather(data.currently);
                    getDailyWeather(data.daily.data);
                }
            })
    }

    
//First click function
    $(".enter-button").click(function () {
        $('.first-page-content').fadeOut(100);
        var city_value = $("#city").val();
        getCoords(city_value);
        
        $('.post-input').fadeIn(1000);
    })
    
    
//Second Click function  
    $('.new-button').click(function () {
        $('.daysummary').remove();
        $('.day-temps-min').remove();
        $('.day-temps-max').remove();
        $('.weather-rows').remove();
//      $('.post-weather-fade').fadeOut(100);
//        $('.location-head').remove();
//        $('.current-summary').empty();
//        $('.weather-rows').text("");
        var new_city_value = $("#newCity").val();
        getCoords(new_city_value);
//        $('post-weather-fade').fadeIn(900);
    })

//Get current weather      
    function getCurrentWeather(currently){
        $('.current-summary').text("CURRENT WEATHER: " + currently.temperature + "\xB0F AND " + currently.summary.toUpperCase());
    }
    
    function getDailyWeather(days){

        var iconArray
        days.forEach(function(day){
           
//Switch statement for correct icon
            switch(day.icon){
                case "clear-day":
                    
                    var iconElement = ('<i class="wi wi-day-sunny"></i>');
                    break;
                case "clear-night":
                    var iconElement = ('<i class="wi wi-moon-alt-waxing-crescent-1"></i>');
                    break;
                case "partly-cloudy-day":
                    var iconElement = ('<i class="wi wi-day-cloudy"></i>');
                    break;
                case "partly-cloudy-night":
                    var iconElement = ('<i class="wi wi-night-cloudy"></i>');
                    break;
                case "cloudy":
                    
                    var iconElement = ('<i class="wi wi-cloudy"></i>');
                    break;
                case "rain":
                    var iconElement = ('<i class="wi wi-raindrops"></i>');
                    break;
                case "sleet":
                    var iconElement = ('<i class="wi wi-sleet"></i>');
                    break;
                case "snow":
                    var iconElement = ('<i class="wi wi-snow"></i>');
                    break;
                case "wind":
                    var iconElement = ('<i class="wi wi-strong-wind"></i>');
                    break;
                case "fog":
                    var iconElement = ('<i class="wi wi-fog"></i>');
                    break;
                default:
                    var iconElement = ('<i class="wi wi-na"></i>');
                   
                       }
             
            
            var DailyElement = 
                `<div class="weather-rows">
                <p class="weekday">${moment.unix(day.time).format('dddd')}</p>
                ${iconElement}
                <p class="daysummary">${day.summary}</p>
                <p class="day-temps-min" >MIN: ${day.apparentTemperatureMin}\xB0F</p>
                <p class="day-temps-max">MAX: ${day.apparentTemperatureMax}\xB0F</p>`
            
            $(`.days-weather`).append(DailyElement);
        })
    
    }
    
//Gets address for heading
    function getCurrentAddress(location){
        $('.location-head').text([location.results[0].formatted_address]);
    }
    
   
})