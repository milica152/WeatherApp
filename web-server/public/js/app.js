console.log("Im here");
const form = document.getElementById('form');
const button = document.getElementById('searchBtn');
var location1 = document.getElementById('location');
var message = document.getElementById('result');
const input = document.getElementById('address');

button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const address = input.value;
    fetch("/weather?address=" + address).then((response) => {
        response.json().then((data) => {
            console.log(response);    
            if(data.error){
                location1.innerHTML = '';
                message.innerHTML = data.error
            } else{
                location1.innerHTML = data.location;
                message.innerHTML = data.forecast;
            }
        });
    });
});