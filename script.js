function updateClock() {
    let now = new Date;
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    let day = now.getDate().toString().padStart(2, '0');
    let month = now.getMonth().toString().padStart(2, '0');
    let year = now.getFullYear();

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monOfYr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dayOfWeek = daysOfWeek[now.getDay()];
    let mon = monOfYr[now.getMonth()];

    document.getElementById("clock").innerText = `Time:${hours}:${minutes}:${seconds}`;
    document.getElementById("date").innerText = `Today's Date:${day}-${mon}-${year}`;
    document.getElementById("day").innerText = `Day:${dayOfWeek}`;

    getweather();
}

async function getweather() {
    let city = document.getElementById("cityInput").value;
    if (city === "") return;

    let apiKey = "dded6d36a9eda9a878b5c3f0b1fd8e40";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.cod === 200) {
            document.getElementById("weatherResult").innerHTML = `Temperature: ${data.main.temp} °C <br> Condition: ${data.weather[0].description}`;

            // Change background based on weather condition
            let weatherCondition = data.weather[0].main.toLowerCase(); // Get main weather condition
            let body = document.body;

            // Remove all existing weather classes
            body.classList.remove("clear-sky", "cloudy", "rainy", "snowy");

            // Add relevant class for animation
            if (weatherCondition.includes("clear")) {
                body.classList.add("clear-sky");
            } else if (weatherCondition.includes("cloud")) {
                body.classList.add("cloudy");
            } else if (weatherCondition.includes("rain")) {
                body.classList.add("rainy");
            } else if (weatherCondition.includes("snow")) {
                body.classList.add("snowy");
            } else {
                body.style.backgroundColor = "#808080"; // Default fallback
            }
        } else {
            document.getElementById("weatherResult").innerHTML = "Location not Found!";
        }
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Errors in fetching";
    }
}



setInterval(updateClock, 1000);
updateClock();