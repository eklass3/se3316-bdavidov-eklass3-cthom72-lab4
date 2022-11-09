const btnSearch = document.getElementById("btnSearch").addEventListener("click", () => onSearch());
const btnCreate = document.getElementById("btnCreateList").addEventListener("click", () => onCreateList());
const searchColumn = document.getElementById("searchColumn");
const listColumn = document.getElementById("listColumn");
const btnAdd = document.getElementById("btnAdd").addEventListener("click", ()=> onAdd());
const txtGenres = document.getElementById("txtGenres");
const rdArtist = document.getElementById("rdArtist").addEventListener("change", () => onFilterSearch(1));
const rdAlbum = document.getElementById("rdAlbum").addEventListener("change", () => onFilterSearch(2));;
const rdTrack = document.getElementById("rdTrack").addEventListener("change", () => onFilterSearch(3));
const rdLength = document.getElementById("rdLength").addEventListener("change", () => onFilterSearch(4));
const rdArtistList = document.getElementById("rdListArtist").addEventListener("change", () => onFilterList(1));
const rdAlbumList = document.getElementById("rdListAlbum").addEventListener("change", () => onFilterList(2));;
const rdTrackList = document.getElementById("rdListTrack").addEventListener("change", () => onFilterList(3));
const rdLengthList = document.getElementById("rdListLength").addEventListener("change", () => onFilterList(4));

let searchedTracks = [];
let searchedArtists = [];
let listList = [];

let selectedList = "";
let selectedTracks = [];

addButtonVisibility();
loadLists();
loadGenres();

function loadLists() {
    listList = [];
    getLists()
    .then(data => data.json())
    .then(lists => {
       
        for (let i = 0; i < lists.length; i++) {
            listList.push({list_name: lists[i].list_name, tracks: []});
    
            getTracks(lists[i].list_name)
            .then(data => data.json())
            .then(tracks => {
                console.log(tracks);
    
                for (let j = 0; j < tracks.length; j++) {
                    console.log(tracks[j].track_id);
                    getTrackDetails(tracks[j].track_id)
                    .then(data => data.json())
                    .then(track_details => {
                        console.log(track_details);
                        if (track_details[0] !== undefined)
                            listList[i].tracks.push(track_details[0]);
                    });
                }
            });
        }
    });

    clearChildElements(listColumn);
    
    setTimeout(()=>{
        console.log("ListList " + JSON.stringify(listList));
    for (let k = 0; k < listList.length; k++) {
        const div = createListDOM(listList[k], listList[k].tracks);
        listColumn.appendChild(div);
    }
    },500);

}

function loadGenres() {
    getGenres()
    .then(data => data.json())
    .then(genres => {
        let strGenre = "";
        genres.forEach(genre => {
            strGenre += " ~|~ " + genre.title;
        });

        setTimeout(()=>{
            const nodeGenres = document.createTextNode(strGenre);
            txtGenres.appendChild(nodeGenres);
        }, 100);
    });
}

async function getLists() {
    return await fetch('http://localhost:3000/api/lists');
}

async function getTracks(list_name) {
    const query = decodeURIComponent(`http://localhost:3000/api/lists/tracks/${list_name}`);
    return await fetch(query);
}

async function getTrackDetails(track_id) {
    return await fetch('http://localhost:3000/api/tracks/' + track_id);
}

async function getGenres() {
    return await fetch('http://localhost:3000/api/genres');
}

function onCreateList() {
    const inputText =  document.getElementById("inputListName").value;

    unCheckRadioButtons();

    fetch('http://localhost:3000/api/lists', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'list_name': inputText})
    }).then(res => {
        if (res.status === 201) {
            listList.unshift({list_name: inputText, tracks: []});
            console.log("Success");

            clearChildElements(listColumn);

            for (let k = 0; k < listList.length; k++) {
                const div = createListDOM(listList[k], listList[k].tracks);
                listColumn.appendChild(div);
            }
        } else {
            alert('Failure! You already have a list with that name.');
        }
    })
    .catch(function (error) {

    });

}

function onAdd() {
    console.log(selectedList + " " + JSON.stringify(selectedTracks));

    unCheckRadioButtons();

    fetch(`http://localhost:3000/api/lists/${selectedList}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'track_ids': selectedTracks})
    }).then(res => {
        if (res.status === 201) {
            console.log("Success");

            selectedList = "";
            selectedTracks = [];

            alert("Successfully added tracks to list " + selectedList);

            clearChildElements(searchColumn);

            loadLists();

            searchedTracks.forEach(track => {
                const div = createTrackDOM(track);
                searchColumn.appendChild(div);
            });

            addButtonVisibility();
           
        }
    })
    .catch(function (error) {

    });

}

function addButtonVisibility() {
    if (selectedList.length > 0 && selectedTracks.length > 0) {
        document.getElementById("btnAdd").style.visibility='visible';
    } else {
        console.log("Setting invisible");
        document.getElementById("btnAdd").style.visibility='hidden';
    }
}

function onFilterList(rbCode) {
    selectedList = "";
    addButtonVisibility();

    switch (rbCode) {
        case 1:

            for (let i = 0; i < listList.length; i++) {
                if (listList[i].tracks.length > 0) {
                    listList[i].tracks.sort(function(a,b) {
                        let txtA = a.artist_name.toUpperCase();
                        let txtB = b.artist_name.toUpperCase();
                        return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
                    });
                }
            }

            break;
        case 2:

            for (let i = 0; i < listList.length; i++) {
                if (listList[i].tracks.length > 0) {
                    listList[i].tracks.sort(function(a,b) {
                        let txtA = a.album_title.toUpperCase();
                        let txtB = b.album_title.toUpperCase();
                        return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
                    });
                }
            }

            break;
        case 3:

            for (let i = 0; i < listList.length; i++) {
                if (listList[i].tracks.length > 0) {
                    listList[i].tracks.sort(function(a,b) {
                        let txtA = a.track_title.toUpperCase();
                        let txtB = b.track_title.toUpperCase();
                        return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
                    });
                }
            }

            break;
        case 4:

            for (let i = 0; i < listList.length; i++) {
                if (listList[i].tracks.length > 0) {
                    listList[i].tracks.sort(function(a,b) {
                        let txtA = a.track_duration.toUpperCase();
                        let txtB = b.track_duration.toUpperCase();
                        return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
                    });
                }
            }

            break;
        
    }

    clearChildElements(listColumn);

    for (let k = 0; k < listList.length; k++) {
        const div = createListDOM(listList[k], listList[k].tracks);
        listColumn.appendChild(div);
    }
}

function onFilterSearch(rbCode) {
    selectedTracks = [];
    addButtonVisibility();
    
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

    unCheckRadioButtons();

    const inputText =  document.getElementById("inputSearch").value;

    fetch("http://localhost:3000/api/tracks?track_title=" + inputText)
    .then((response) => response.json())
    .then((data) => {
        searchResults = data;
          
        clearChildElements(searchColumn);

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

function onDeleteList(list_name) {

    console.log("On Delete");
    const query = decodeURIComponent(`http://localhost:3000/api/lists/${list_name}`);
    fetch(query, {
        method: 'DELETE',
    })
    .then(res => {
        console.log("FUCK");
        console.log(res.status);
        if (res.status === 204) {
            alert("Successfully deleted " + list_name);
            loadLists();
       }
    })
    .catch(function (error) {
        console.log(JSON.stringify(error));
    });
}

function onTrackSelected(track_id) {
    console.log();
    if (!selectedTracks.some(item => item.track_id === track_id)) {
        selectedTracks.push({track_id: track_id})
    } else {
        for (let i = 0; i < selectedTracks.length; i++) {
            if (selectedTracks[i].track_id === track_id) {
                selectedTracks.splice(i, 1);
            }
        }
    }
    console.log(selectedTracks);

    addButtonVisibility();
}

function onListSelected(list_name, input) {
    if (selectedList === list_name) {
        selectedList = "";
    } else if (selectedList === "") {
        selectedList = list_name;
    } else {
        alert("You can only select one list!");
        input.checked = false;
    }

    addButtonVisibility();
}

function createListDOM(list, tracks) {
    console.log(list);
    const div = document.createElement('div');
    div.setAttribute("id", "content-box");
    const input = document.createElement('input');
    input.addEventListener('change', () => onListSelected(list.list_name, input));
    input.setAttribute("class", "checkbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "cb " + list.list_name);

    const divRow = document.createElement('div');
    divRow.setAttribute("class", "row");
    const hListName = document.createElement('h3');
    const txtListName = document.createTextNode(list.list_name);
    hListName.appendChild(txtListName);
    divRow.appendChild(hListName);

    div.appendChild(input);
    div.appendChild(divRow);

    tracks.forEach(track => {
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

        div.appendChild(div2);
    });

    const btnDelete = document.createElement('button');
    const txtDelete = document.createTextNode('Delete List');
    btnDelete.addEventListener('click', ()=> onDeleteList(list.list_name));
    btnDelete.appendChild(txtDelete);

    div.appendChild(btnDelete);

    return div;
}

function createTrackDOM(track) {
    const div = document.createElement('div');
    div.setAttribute("id", "content-box");
    const input = document.createElement('input');
    input.addEventListener('change', () => onTrackSelected(track.track_id));
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

    div.append(hArtistName);

    if (artist.artist_members !== null) {
        const pArtistMembers = document.createElement('p');
        const txtArtistMembers = document.createTextNode("Artist Members: " + artist.artist_members);
        pArtistMembers.appendChild(txtArtistMembers);

        div.append(pArtistMembers);
    }

    let artistEnd = artist.artist_active_year_end;

    if (artistEnd === null) 
        artistEnd = "Present";

    if (artist.artist_active_year_begin !== null) {
        const pArtistActive = document.createElement('p');
        const txtArtistActive = document.createTextNode("Active: " + artist.artist_active_year_begin + " to " + artistEnd);
        pArtistActive.appendChild(txtArtistActive);

        div.append(pArtistActive);
    }

    return div;
}

function unCheckRadioButtons() {
    if (document.querySelector('input[type="radio"]:checked') !== null)
        document.querySelector('input[type="radio"]:checked').checked = false;
}

//Function for remove all child elements of search list.
function clearChildElements(root) {
    while (root.firstChild) {//While there are still elements to remove, remove them.
        root.removeChild(root.lastChild);
    }
}
