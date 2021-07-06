const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    
    // const cityDets = data.cityDetails;
    // const weather = data.weather;

    //destructuring
    const { cityDets, weather} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    localStorage.setItem('city', cityDets.EnglishName);

    //update the night/day $icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none') ){
        card.classList.remove('d-none');
    }
};  

const updateUIError = () => {
    //update details template
    details.innerHTML = `
    <h5 class="my-3">Error 404</h5>
        <div class="my-3">City you typed was not found</div>
        <div class="display-4 my-4">
            <span></span>
        </div>
       
    `;
    const timeSrc = 'https://s4.koustavwifi.in/2020/11/Error-404.png' 
    icon.setAttribute('src', '');


     //remove the d-none class if present
     if(card.classList.contains('d-none') ){
        card.classList.remove('d-none');
    }
}

cityForm.addEventListener('submit', e => {
    //prevent the default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with new city
    forecast.updateCity(city)
    .then( data => updateUI(data))
    .catch(err => updateUIError());

});

if(localStorage.city){
    forecast.updateCity(localStorage.city)
    .then( data => updateUI(data))
    .catch(err => updateUIError());
}