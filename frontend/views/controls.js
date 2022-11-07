const btnSearch = document.getElementById("btnSearch").addEventListener("click", () => onSearch());
const searchColumn = document.getElementById("searchColumn");
const rdArtist = document.getElementById("rdArtist").addEventListener("change", () => onFilter(1));
const rdAlbum = document.getElementById("rdAlbum").addEventListener("change", () => onFilter(2));;
const rdTrack = document.getElementById("rdTrack").addEventListener("change", () => onFilter(3));
const rdLength = document.getElementById("rdLength").addEventListener("change", () => onFilter(4));

let searchedTracks = [];
let searchedArtists = [];

function onFilter(rbCode) {
    switch (rbCode) {
        case 1:
            searchedTracks.sort(function(a,b) {
                let txtA = a.artist_name.toUpperCase();
                let txtB = b.artist_name.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });

            searchedArtists.sort(function(a,b) {
                let txtA = a.artist_name.toUpperCase();
                let txtB = b.artist_name.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });

            break;
        case 2:
            searchedTracks.sort(function(a,b) {
                let txtA = a.album_title.toUpperCase();
                let txtB = b.album_title.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });

            break;
        case 3:

            searchedTracks.sort(function(a,b) {
                let txtA = a.track_title.toUpperCase();
                let txtB = b.track_title.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });

            break;
        case 4:

            searchedTracks.sort(function(a,b) {
                let txtA = a.track_duration.toUpperCase();
                let txtB = b.track_duration.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });
            break;
        
    }

    clearChildElements(searchColumn);
    searchedTracks.forEach(track => {
        const div = createTrackDOM(track);
        searchColumn.appendChild(div);
    });
    searchedArtists.forEach(artist => {
        const div = createArtistDOM(artist);
        searchColumn.appendChild(div);
    });
}

function onSearch() {
    searchedTracks = [];
    searchedArtists = [];

    const inputText =  document.getElementById("inputSearch").value;

    fetch("http://localhost:3000/api/tracks?track_title=" + inputText)
    .then((response) => response.json())
    .then((data) => {
        searchResults = data;
          
        clearChildElements(searchColumn);

        // const hTitle = document.createElement('h3');
        // const txtTitle = document.createTextNode("Results:");
        // hTitle.appendChild(txtTitle);
        // searchColumn.appendChild(hTitle);

        for (let i = 0; i < searchResults.length; i++) {
            fetch("http://localhost:3000/api/tracks/" + searchResults[i].track_id)
             .then((response) => response.json())
             .then((data) => {
                let track = data[0];
                searchedTracks.push(track);

                const div = createTrackDOM(track);
                searchColumn.appendChild(div);
             })
        }
    })
    .catch(function (error) {

    });

    fetch("http://localhost:3000/api/artists?artist_name=" + inputText)
    .then((response) => response.json())
    .then((data) => {
        searchResults = data;
        console.log(searchResults);      

        for (let i = 0; i < searchResults.length; i++) {
            fetch("http://localhost:3000/api/artists/" + searchResults[i].artist_id)
             .then((response) => response.json())
             .then((data) => {
                let artist = data[0];
                searchedArtists.push(artist);
                console.log(artist);
                
                const div = createArtistDOM(artist);
                searchColumn.appendChild(div);
             })
        }
    })
    .catch(function (error) {

    });

}   

function createTrackDOM(track) {
    const div = document.createElement('div');
    div.setAttribute("id", "content-box");
    const input = document.createElement('input');
    input.setAttribute("class", "checkbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "cb " + track.track_id);

    const div2 = document.createElement('div');
    div2.setAttribute("class", "track-box");

    const pDetails = document.createElement('p');
    const txtDetails = document.createTextNode(track.track_title + " - " + track.artist_name + " - " + track.album_title);
    pDetails.appendChild(txtDetails);

    const pTime = document.createElement('p');
    const txtTime = document.createTextNode(track.track_duration);
    pTime.appendChild(txtTime);

    div2.appendChild(pDetails);
    div2.appendChild(pTime);

    div.appendChild(input);
    div.appendChild(div2);

    return div;

}

function createArtistDOM(artist) {
    const div = document.createElement('div');
    div.setAttribute("id", "content-box");

    const hArtistName = document.createElement('h3');
    const txtArtistName = document.createTextNode(artist.artist_name);
    hArtistName.appendChild(txtArtistName);

    const pArtistMembers = document.createElement('p');
    const txtArtistMembers = document.createTextNode("Artist Members: " + artist.artist_members + " " + artist.artist_id);
    pArtistMembers.appendChild(txtArtistMembers);

    let artistEnd = artist.artist_active_year_end;

    if (artistEnd === null) 
        artistEnd = "Present";

    const pArtistActive = document.createElement('p');
    const txtArtistActive = document.createTextNode("Active: " + artist.artist_active_year_begin + " to " + artistEnd);
    pArtistActive.appendChild(txtArtistActive);

    div.append(hArtistName);
    div.append(pArtistMembers);
    div.append(pArtistActive);

    return div;
}

//Function for remove all child elements of search list.
function clearChildElements(root) {
    while (root.firstChild) {//While there are still elements to remove, remove them.
        root.removeChild(root.lastChild);
    }
}
