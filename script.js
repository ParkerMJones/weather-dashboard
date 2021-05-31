var today = document.getElementById("today");

var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");

fiveDayHeader = document.getElementById("5dayheader");
document.getElementById("5dayheader").style.visibility = 'hidden'; 

searchButton = document.getElementById("search-button");

dt = luxon.DateTime.now();
console.log(dt);

// autocomplete code taken from tutorialspoint.com
function autocomplete(searchEle, arr) {
    var currentFocus;
    searchEle.addEventListener("input", function(e) {
       var divCreate,
       b,
       i,
       fieldVal = this.value;
       closeAllLists();
       if (!fieldVal) {
          return false;
       }
       currentFocus = -1;
       divCreate = document.createElement("DIV");
       divCreate.setAttribute("id", this.id + "autocomplete-list");
       divCreate.setAttribute("class", "autocomplete-items");
       this.parentNode.appendChild(divCreate);
       for (i = 0; i <arr.length; i++) {
          if ( arr[i].substr(0, fieldVal.length).toUpperCase() == fieldVal.toUpperCase() ) {
             b = document.createElement("DIV");
             b.innerHTML = "<strong>" + arr[i].substr(0, fieldVal.length) + "</strong>";
             b.innerHTML += arr[i].substr(fieldVal.length);
             b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
             b.addEventListener("click", function(e) {
                searchEle.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
             });
             divCreate.appendChild(b);
          }
       }
    });
    searchEle.addEventListener("keydown", function(e) {
       var autocompleteList = document.getElementById(
          this.id + "autocomplete-list"
       );
       if (autocompleteList)
          autocompleteList = autocompleteList.getElementsByTagName("div");
       if (e.keyCode == 40) {
          currentFocus++;
          addActive(autocompleteList);
       }
       else if (e.keyCode == 38) {
          //up
          currentFocus--;
          addActive(autocompleteList);
       }
       else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
             if (autocompleteList) autocompleteList[currentFocus].click();
          }
       }
    });
    function addActive(autocompleteList) {
       if (!autocompleteList) return false;
          removeActive(autocompleteList);
       if (currentFocus >= autocompleteList.length) currentFocus = 0;
       if (currentFocus < 0) currentFocus = autocompleteList.length - 1;
       autocompleteList[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(autocompleteList) {
       for (var i = 0; i < autocompleteList.length; i++) {
          autocompleteList[i].classList.remove("autocomplete-active");
       }
    }
    function closeAllLists(elmnt) {
       var autocompleteList = document.getElementsByClassName(
          "autocomplete-items"
       );
       for (var i = 0; i < autocompleteList.length; i++) {
          if (elmnt != autocompleteList[i] && elmnt != searchEle) {
             autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
          }
       }
    }
    document.addEventListener("click", function(e) {
       closeAllLists(e.target);
    });
 }


 var citiesArray = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
 autocomplete(document.getElementById("cityName"), citiesArray);



searchButton.addEventListener('click', function() {
document.getElementById("5dayheader").style.visibility = 'visible'; 
console.log(cityName.value);
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName.value + "&appid=2bf17073b305273232e18de9ad5d534c")
    .then(function(response) {
        return response.json();
    })

    .then(function (response) {
        console.log(response);

        var todayHeader = document.createElement("h2");
        todayHeader.textContent = response.name + " " + dt.toLocaleString();
        today.appendChild(todayHeader);

        var temp = document.createElement("p");
        temp.textContent = "Temp: " + response.main.temp;
        today.appendChild(temp);

        var wind = document.createElement("p");
        wind.textContent = "Wind: " + response.wind.speed + " MPH";
        today.appendChild(wind);

        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + response.main.humidity + "%";
        today.appendChild(humidity);
    })

    // 5 day forecast
    fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + cityName.value + "&appid=2bf17073b305273232e18de9ad5d534c")
    .then(function(response2) {
    return response2.json();
})

.then(function (response2) {
    console.log(response2);
        var day1Temp = document.createElement("p");
            day1Temp.textContent = "Temp: " + response2.list[8].main.temp;
            day1.appendChild(day1Temp);
        var day1Wind = document.createElement('p');
            day1Wind.textContent = "Wind: " + response2.list[8].wind.speed + " MPH";
            day1.appendChild(day1Wind);
        var day1Humidity = document.createElement('p');
            day1Humidity.textContent = "Humidity: " + response2.list[8].main.humidity + "%";
            day1.appendChild(day1Humidity);

        var day2Temp = document.createElement("p");
            day2Temp.textContent = "Temp: " + response2.list[16].main.temp;
            day2.appendChild(day2Temp);
        var day2Wind = document.createElement('p');
            day2Wind.textContent = "Wind: " + response2.list[16].wind.speed + " MPH";
            day2.appendChild(day2Wind);
        var day2Humidity = document.createElement('p');
            day2Humidity.textContent = "Humidity: " + response2.list[16].main.humidity + "%";
            day2.appendChild(day2Humidity);

        var day3Temp = document.createElement("p");
            day3Temp.textContent = "Temp: " + response2.list[24].main.temp;
            day3.appendChild(day3Temp);
        var day3Wind = document.createElement('p');
            day3Wind.textContent = "Wind: " + response2.list[24].wind.speed + " MPH";
            day3.appendChild(day3Wind);
        var day3Humidity = document.createElement('p');
            day3Humidity.textContent = "Humidity: " + response2.list[24].main.humidity + "%";
            day3.appendChild(day3Humidity);

        var day4Temp = document.createElement("p");
            day4Temp.textContent = "Temp: " + response2.list[32].main.temp;
            day4.appendChild(day4Temp);
        var day4Wind = document.createElement('p');
            day4Wind.textContent = "Wind: " + response2.list[32].wind.speed + " MPH";
            day4.appendChild(day4Wind);
        var day4Humidity = document.createElement('p');
            day4Humidity.textContent = "Humidity: " + response2.list[32].main.humidity + "%";
            day4.appendChild(day4Humidity);

        var day5Temp = document.createElement("p");
            day5Temp.textContent = "Temp: " + response2.list[39].main.temp;
            day5.appendChild(day5Temp);
        var day5Wind = document.createElement('p');
            day5Wind.textContent = "Wind: " + + response2.list[39].wind.speed + " MPH";
            day5.appendChild(day5Wind);
        var day5Humidity = document.createElement('p');
            day5Humidity.textContent = "Humidity: " + response2.list[39].main.humidity + "%";
            day5.appendChild(day5Humidity);
});
});



