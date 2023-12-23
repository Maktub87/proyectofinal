let lon;
let lat;
let temperatura = document.querySelector(".temp")
let descripcion = document.querySelector(".descripcion")
let ubicacion = document.querySelector(".ubicacion")
let icon = document.querySelector(".icon")
const kelvin = 273.15



window.addEventListener("load", () => {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;


            const api_id = "8c0ca59c06c46b5681f72c91d920abc5";

            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_id}`;


            fetch(url_base)
                .then((response) => {
                    console.log("Esta e la respuesta");
                    return response.json();
                })
                .then((data) => {
                    console.log("esta es la data")
                    console.log(data);

                    temperatura.textContent =
                        Math.floor(data.main.temp - kelvin) + "°C";
                    descripcion.textContent = data.weather[`0`].description;
                    ubicacion.textContent = data.name + "," + data.sys.country;
                })

        }
        );

    };
});
