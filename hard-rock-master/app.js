//load the song from API using async ,await way
// const searchSongs = async() =>{
//     const searchField = document.getElementById('input-field').value;
//     //console.log(searchField);
//     document.getElementById('input-field').value = '';
//     const url = `https://api.lyrics.ovh/suggest/${searchField}`;
//     //console.log(url);
//     //load data
//     const res =await fetch(url)
//     const data =await res.json()
//     displaySongs(data.data)
// }

//load the song from API
function searchSongs() {
    const searchField = document.getElementById('input-field').value;
    //console.log(searchField);
    document.getElementById('input-field').value = '';
    const url = `https://api.lyrics.ovh/suggest/${searchField}`;
    //console.log(url);
    //load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('something went wrong !!! pleaser try again later'))
}



const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    //clear the history of searched song
    songContainer.innerHTML = '';
    // console.log(songs);
    songs.forEach(song => {

        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.album.title}</span></p>
                    <p class="author lead">Artist Name <span>${song.artist.name}</span></p>
                    <audio controls>
                        <source src="${song.preview}" type="audio/ogg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
        `;
        songContainer.appendChild(songDiv);

        //console.log(song);
        // console.log(song.title);
        // console.log(song.artist.name);
        // console.log(song.album.title);
    });
}
//get the lyrics in async , await way

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res =await fetch(url)
    const data =await res.json()
    displayLyrics(data.lyrics)
    }
    catch{
        displayError('I failed to reload your lyrics !!! please try again later')
    }  
}

//get the lyrics
// const getLyrics = (artist,title) =>{
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
// }

const displayLyrics = lyrics => {
    //console.log(lyrics);
    const lyricsDiv = document.getElementById('single-lyrics');
    lyricsDiv.innerText = lyrics;
}
const displayError = error =>{
    const showError = document.getElementById('error');
    showError.innerText = error;
}
