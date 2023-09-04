const id = new URLSearchParams(window.location.search).get('id');
const type = new URLSearchParams(window.location.search).get('type');
const sea = new URLSearchParams(window.location.search).get('sea');
const ep = new URLSearchParams(window.location.search).get('ep');
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQyZDUzZWE3ODU2MjlkZDljNWQ3MzE2MDczYTc2MyIsInN1YiI6IjY0ZTdhZWJlMDZmOTg0MDBjYTU0ZGY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6-Fwa8nHbJ3KS7PPwcZzZIHfERO0rpPKxKR30L7fcxs'
    }
  };

var seasonDetails;

var nameBar = document.getElementById("name");
fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
.then(response => response.json())
.then(response => nameBar.innerText += response.title || response.name)
.catch(err => console.error(err));



if (type ==="movie") {
    document.getElementById("dropdowns").style.display = "none";
} else {
    nameBar.innerText += `Season ${sea}, Episode ${ep}: `;
    fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
    .then(response => response.json())
    .then(response => getSeas(response))
    .catch(err => console.error(err));

    getSeas = (data) => {
        seasonDetails = data;
        var seasonDrop = document.getElementById("season");
        for (var i = 1; i <= data.number_of_seasons; i++) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            seasonDrop.appendChild(option);
        }   
        updateDropdown();
    };

    updateDropdown = () => {
        var episodeDrop = document.getElementById("episode");
        var seasonDrop = document.getElementById("season");
        
        var i, L = episodeDrop.options.length - 1;
        for(i = L; i >= 0; i--) {
        episodeDrop.remove(i);
        }
        
        for (var j = 1; j <= seasonDetails.seasons[seasonDrop.value].episode_count; j++) {
            var option = document.createElement("option");
            option.text = j;
            option.value = j;
            episodeDrop.appendChild(option);
        }
        updateEpLink();
    };

    const season = document.getElementById("season");
    season.addEventListener("change", updateDropdown);
}

updateEpLink = () => {
    console.log("run");
    var season = document.getElementById("season").value;
    var episode = document.getElementById("episode").value;
    var button = document.getElementById("watch");
    button.href = `./watch.html?id=${id}&type=${type}&sea=${season}&ep=${episode}`;
};


var episodeDrop = document.getElementById("episode");
episodeDrop.addEventListener("change", updateEpLink);

const video = document.querySelector('.video');
const player = document.createElement('iframe');
player.src = `https://vidsrc.me/embed/${type}?tmdb=${id}&season=${sea}&episode=${ep}`;
player.allowFullscreen = true;

video.appendChild(player);