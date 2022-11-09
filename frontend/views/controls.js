//HTML elements.
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
//Arrays for holding search and list data.
let searchedTracks = [];
let searchedArtists = [];
let listList = [];//List object format {list_name: str, tracks:[{track_id: int, ...}]}
//Arrays for holding selection data (used for adding tracks to lists).
let selectedList = "";
let selectedTracks = [];

//On start-up:
addButtonVisibility();//Clear add button.
loadLists();//Load list data from DB
loadGenres();//Load moving genre list.
//Function for loading list data onto page
function loadLists() {
    listList = [];//CLear load list
    getLists()//Get list data
    .then(data => data.json())
    .then(lists => {
       //For each list
        for (let i = 0; i < lists.length; i++) {
            listList.push({list_name: lists[i].list_name, tracks: []});
            //Get track ids
            getTracks(lists[i].list_name)
            .then(data => data.json())
            .then(tracks => {
                console.log(tracks);
                //For each track id
                for (let j = 0; j < tracks.length; j++) {
                    console.log(tracks[j].track_id);
                    getTrackDetails(tracks[j].track_id)//Get track details
                    .then(data => data.json())
                    .then(track_details => {
                        console.log(track_details);
                        if (track_details[0] !== undefined)
                            listList[i].tracks.push(track_details[0]);//Add track details to complete list
                    });
                }
            });
        }
    });

    clearChildElements(listColumn);//Clear all child elements
    //Pause to make sure all data is loaded.
    setTimeout(()=>{
        console.log("ListList " + JSON.stringify(listList));
    for (let k = 0; k < listList.length; k++) {//Populate UI
        const div = createListDOM(listList[k], listList[k].tracks);
        listColumn.appendChild(div);
    }
    },500);

}
//Function for loading genre data onto page
function loadGenres() {
    getGenres()//Get genre data
    .then(data => data.json())
    .then(genres => {
        let strGenre = "";//String for total genre display
        genres.forEach(genre => {
            strGenre += " ~|~ " + genre.title;
        });
        //Wait to make sure data has arrived
        setTimeout(()=>{
            const nodeGenres = document.createTextNode(strGenre);//Populate UI
            txtGenres.appendChild(nodeGenres);
        }, 100);
    });
}
//Function for getting list data from DB
async function getLists() {
    return await fetch('http://localhost:3000/api/lists');
}
//Function for getting track data from DB
async function getTracks(list_name) {
    const query = decodeURIComponent(`http://localhost:3000/api/lists/tracks/${list_name}`);
    return await fetch(query);
}
//Function for getting track details from DB
async function getTrackDetails(track_id) {
    return await fetch('http://localhost:3000/api/tracks/' + track_id);
}
//Function for getting genre data from DB
async function getGenres() {
    return await fetch('http://localhost:3000/api/genres');
}
//Function for when a user creates a list
function onCreateList() {
    const inputText =  document.getElementById("inputListName").value;//Get user inputted name.

    unCheckRadioButtons();//Clear filters
    //Send new list.
    fetch('http://localhost:3000/api/lists', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'list_name': inputText})
    }).then(res => {
        if (res.status === 201) {//Success
            listList.unshift({list_name: inputText, tracks: []});
            console.log("Success");
            //Clear elements and repopulate with new list data.
            clearChildElements(listColumn);

            for (let k = 0; k < listList.length; k++) {
                const div = createListDOM(listList[k], listList[k].tracks);
                listColumn.appendChild(div);
            }
        } else {//Error, there is a duplicate
            alert('Failure! You already have a list with that name.');
        }
    })
    .catch(function (error) {

    });

}
//Function for when a user presses the "ADD TRACK" button
function onAdd() {
    console.log(selectedList + " " + JSON.stringify(selectedTracks));

    unCheckRadioButtons();
    //Add tracks to DB
    fetch(`http://localhost:3000/api/lists/${selectedList}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'track_ids': selectedTracks})
    }).then(res => {
        if (res.status === 201) {//Success
            console.log("Success");

            selectedList = "";
            selectedTracks = [];

            alert("Successfully added tracks to list " + selectedList);
            //Clear and reload lists and searched items.
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
//Function to decide and set the "ADD TRACK" button's visibility
function addButtonVisibility() {
    if (selectedList.length > 0 && selectedTracks.length > 0) {//All the requirements to add tracks
        document.getElementById("btnAdd").style.visibility='visible';
    } else {
        console.log("Setting invisible");
        document.getElementById("btnAdd").style.visibility='hidden';
    }
}
//Function which runs when the user filters the list items
function onFilterList(rbCode) {
    //Clear selection (filters mess with selection)
    selectedList = "";
    addButtonVisibility();
    //What filter is applied?
    switch (rbCode) {
        case 1://Artist name filter
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
        case 2://Album title
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
        case 3://Track title
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
        case 4://Track duration
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
    //Clear and refresh list UI
    clearChildElements(listColumn);

    for (let k = 0; k < listList.length; k++) {
        const div = createListDOM(listList[k], listList[k].tracks);
        listColumn.appendChild(div);
    }
}
//Function which runs when the user filters the search items
function onFilterSearch(rbCode) {
    //Clear selection
    selectedTracks = [];
    addButtonVisibility();
    
    //Filters both artist and track elements for applicable searches.
    switch (rbCode) {
        case 1://Artist name filter
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
        case 2://Album title
            searchedTracks.sort(function(a,b) {
                let txtA = a.album_title.toUpperCase();
                let txtB = b.album_title.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });
            break;
        case 3://Track title
            searchedTracks.sort(function(a,b) {
                let txtA = a.track_title.toUpperCase();
                let txtB = b.track_title.toUpperCase();
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
            });
            break;
        case 4://Track duration
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
//Function for when users press the search button
function onSearch() {
    //Clear search results
    searchedTracks = [];
    searchedArtists = [];

    unCheckRadioButtons();

    const inputText =  document.getElementById("inputSearch").value;//Get search text

    if (inputText.length > 0) {//Make sure it is not an empty search
        //Get tracks
        const query = `http://localhost:3000/api/tracks?track_title=${inputText}`;
        fetch(query)
        .then((response) => response.json())
        .then((data) => {
            searchResults = data;
            
            clearChildElements(searchColumn);
            //FOr each track
            for (let i = 0; i < searchResults.length; i++) {
                fetch("http://localhost:3000/api/tracks/" + searchResults[i].track_id)//Get track details
                .then((response) => response.json())
                .then((data) => {
                    let track = data[0];
                    searchedTracks.push(track);
                    //Populate UI
                    const div = createTrackDOM(track);
                    searchColumn.appendChild(div);
                })
            }
        })
        .catch(function (error) {

        });
        //Get artists
        fetch("http://localhost:3000/api/artists?artist_name=" + inputText)
        .then((response) => response.json())
        .then((data) => {
            searchResults = data;
            console.log(searchResults);      
            //For each artist
            for (let i = 0; i < searchResults.length; i++) {
                fetch("http://localhost:3000/api/artists/" + searchResults[i].artist_id)//Get artist details
                .then((response) => response.json())
                .then((data) => {
                    let artist = data[0];
                    searchedArtists.push(artist);
                    console.log(artist);
                    //Populate UI
                    const div = createArtistDOM(artist);
                    searchColumn.appendChild(div);
                })
            }
        })
        .catch(function (error) {

        });

    }

}  
//Function for when a user deletes a list
function onDeleteList(list_name) {

    console.log("On Delete");
    const query = decodeURIComponent(`http://localhost:3000/api/lists/${list_name}`);//Delete list
    fetch(query, {
        method: 'DELETE',
    })
    .then(res => {
        console.log("FUCK");
        console.log(res.status);
        if (res.status === 204) {//Delete was a success
            alert("Successfully deleted " + list_name);
            loadLists();
       }
    })
    .catch(function (error) {
        console.log(JSON.stringify(error));
    });
}
//Function for when a user selects a track
function onTrackSelected(track_id) {
    console.log();
    if (!selectedTracks.some(item => item.track_id === track_id)) {//If track is not already selected
        selectedTracks.push({track_id: track_id})
    } else {//It is already selected. Splice out
        for (let i = 0; i < selectedTracks.length; i++) {
            if (selectedTracks[i].track_id === track_id) {
                selectedTracks.splice(i, 1);
            }
        }
    }
    console.log(selectedTracks);

    addButtonVisibility();
}
//Function for when a user selects a list
function onListSelected(list_name, input) {
    if (selectedList === list_name) {//If list is select already, remove selection
        selectedList = "";
    } else if (selectedList === "") {//If list is not alread selected, set selection
        selectedList = list_name;
    } else {//User has tried to select multiple list. Remove selection and warn.
        alert("You can only select one list!");
        input.checked = false;
    }

    addButtonVisibility();//Re calculate add button visibility.
}
//Function which creates a list DOM object
function createListDOM(list, tracks) {
    console.log(list);
    const div = document.createElement('div');
    div.setAttribute("id", "content-box");
    const input = document.createElement('input');
    input.addEventListener('change', () => onListSelected(list.list_name, input));//List checkbox
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

    tracks.forEach(track => {//For all tracks
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
    btnDelete.addEventListener('click', ()=> onDeleteList(list.list_name));//Delete button
    btnDelete.appendChild(txtDelete);

    div.appendChild(btnDelete);

    return div;
}
//Function which creates a track DOM object
function createTrackDOM(track) {
    const div = document.createElement('div');
    div.setAttribute("id", "content-box");
    const input = document.createElement('input');
    input.addEventListener('change', () => onTrackSelected(track.track_id));//Track selected checkbox
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
//Function which creates an artist DOM object
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
//Function which clears radio button selections (clearing filter selection)
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
