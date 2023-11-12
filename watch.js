const id = new URLSearchParams(window.location.search).get('id');
const type = new URLSearchParams(window.location.search).get('type');
const sea = new URLSearchParams(window.location.search).get('sea');
const ep = new URLSearchParams(window.location.search).get('ep');

var seasonDetails;

var nameBar = document.getElementById("name");
fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
.then(response => response.json())
.then(response => {
    if (type === "movie") {
        nameBar.innerText += `${response.title} (${response.release_date.slice(0,4)})`;
        document.title = `${response.title} | ethanw.online`;
    } else {
        nameBar.innerText += ` ${response.name}`;
        document.title = `${response.name} - S${sea} Ep ${ep} | ethanw.online`;
    }
})
.catch(err => console.error(err));



getSeas = (data) => {
    seasonDetails = data;
    var seasonDrop = document.getElementById("season");
    for (var i = 1; i <= data.number_of_seasons; i++) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        seasonDrop.appendChild(option);
        
        if (i == sea) {
            seasonDrop.selectedIndex = i - 1;
        }   
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
        
        if (j == ep) {
            episodeDrop.selectedIndex = j - 1;
        }
    }
    updateEpLink();
    updateNextEp();
    
};

updateNextEp = () => {
    var dropdowns = document.getElementById("dropdowns");
    if (ep < seasonDetails.seasons[sea].episode_count && document.getElementsByClassName("nextBtn").length === 0) {
        var next = document.createElement("a");
        next.classList.add("button", "nextBtn");
        next.href = `./watch.html?id=${id}&type=${type}&sea=${sea}&ep=${parseInt(ep) + 1}`;
        next.innerText = "Next Episode";
        dropdowns.appendChild(next);
        
    } else if (sea < seasonDetails.number_of_seasons && document.getElementsByClassName("nextBtn").length === 0) {
        var next = document.createElement("a");
        next.classList.add("button", "nextBtn");
        next.href = `./watch.html?id=${id}&type=${type}&sea=${parseInt(sea) + 1}&ep=1`;
        next.innerText = "Next Season";
        dropdowns.appendChild(next);
    };
};

updateEpLink = () => {
    var season = document.getElementById("season").value;
    var episode = document.getElementById("episode").value;
    var button = document.getElementById("watch");
    button.href = `./watch.html?id=${id}&type=${type}&sea=${season}&ep=${episode}`;
};


if (type === "movie") {
    document.getElementById("dropdowns").style.display = "none";
} else {
    nameBar.innerText += `Season ${sea}, Episode ${ep}: `;
    fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
    .then(response => response.json())
    .then(response => getSeas(response))
    .catch(err => console.error(err));
    
    const season = document.getElementById("season");
    season.addEventListener("change", updateDropdown);
    
}

var episodeDrop = document.getElementById("episode");
episodeDrop.addEventListener("change", updateEpLink);

const video = document.querySelector('.video');
const player = document.createElement('iframe');
player.src = `https://vidsrc.me/embed/${type}?tmdb=${id}&season=${sea}&episode=${ep}`;
player.allowFullscreen = true;
video.appendChild(player);


var startTime = new Date().getTime();
window.onbeforeunload = function() {
    var endTime = new Date().getTime();
    if (endTime - startTime > 300000) {
        document.cookie = `${id}=${type},${sea},${ep}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
    }
};
