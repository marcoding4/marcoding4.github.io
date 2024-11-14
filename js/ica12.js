
function fetchData() {
    let apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json(); 
            } else {
                alert("Failed to fetch joke.");
                return;
            }
        })
        .then(function(data) {
            let jokeText;

            if (data.joke) {
                jokeText = data.joke;
            } else if (data.setup && data.delivery) {
                jokeText = `${data.setup} - ${data.delivery}`;
            } else {
                jokeText = "Couldn't find a joke, try again!";
            }

            
            document.getElementById("joke").innerText = jokeText;
        })
  

