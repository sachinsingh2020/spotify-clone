console.log("Welcome to Spotify")

// intializing the variables 
let songIndex = 0
let audioElement = new Audio("./songs/1.mp3")
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"))
let number
let minute = 0;
let songs = [
    { songName: "Ek Tarfa Reprise", filePath: "./songs/1.mp3", coverPath: "./covers/1.png", timeDuration: "03:56" },
    { songName: "Ek Vari Aa", filePath: "./songs/2.mp3", coverPath: "./covers/2.png", timeDuration: "04:34" },
    { songName: "Phir Wahi", filePath: "./songs/3.mp3", coverPath: "./covers/3.png", timeDuration: "04:13" },
    { songName: "Qaafirana", filePath: "./songs/4.mp3", coverPath: "./covers/4.png", timeDuration: "05:41" },
    { songName: "Sau Aasman", filePath: "./songs/5.mp3", coverPath: "./covers/5.png", timeDuration: "03:54" },
    { songName: "Tenu Na Bol Pawaan", filePath: "./songs/6.mp3", coverPath: "./covers/6.png", timeDuration: "04:55" },
    { songName: "Mere Liye Tum Kafi Ho", filePath: "./songs/7.mp3", coverPath: "./covers/7.png", timeDuration: "02:12" },
]
const addIndex = () => {
    let i = 0;
    songItemPlay.forEach((element) => {
        element.id = i;
        i += 1;
    })

}
addIndex()
songItemPlay.forEach((e) => {
    let cname = e.id;
    console.log(cname)
})

for (let k = 0; k < 7; k++) {
    document.getElementById(`t${k}`).innerText = songs[k].timeDuration
}
// audioElement.play()
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
let lock = 0;
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-pause')) {
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            audioElement.pause()
            gif.style.opacity = 0;

        }
        else {
            makeAllPlays()
            for (let k = 0; k < 7; k++) {
                document.getElementById(`t${k}`).innerText = songs[k].timeDuration
            }
            masterSongName.innerText = songs[songIndex].songName
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity = 1;
        }
    })
})

// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        document.getElementById(songIndex).classList.remove('fa-circle-play')
        document.getElementById(songIndex).classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        document.getElementById(songIndex).classList.remove('fa-circle-pause')
        document.getElementById(songIndex).classList.add('fa-circle-play')
        gif.style.opacity = 0;

    }
})


// Listen to Events 

audioElement.addEventListener('timeupdate', () => {
    // console.log("timeupdate")
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    // let newTimeDuration = parseInt(audioElement.currentTime)
    // console.log(typeof newTimeDuration)  
    // let text=numTimeDuration.toString()
    // String s=Float.toString(newTimeDuration)
    // console.log(s)

    // document.getElementById(`t${songIndex}`).innerText = (newTimeDuration / 60).toFixed(2)
    myProgressBar.value = progress;
    if (progress == 100) {
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
    }
})


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

document.getElementById('previous').addEventListener('click', () => {
    let previousIndex = songIndex

    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1
    }
    for (let k = 0; k < 7; k++) {
        document.getElementById(`t${k}`).innerText = songs[k].timeDuration
    }
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    document.getElementById(previousIndex).classList.remove('fa-circle-pause')
    document.getElementById(previousIndex).classList.add('fa-circle-play')
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById(songIndex).classList.add('fa-circle-pause')
})
document.getElementById('next').addEventListener('click', () => {
    let previousIndex = songIndex

    if (songIndex >= 6) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    for (let k = 0; k < 7; k++) {
        document.getElementById(`t${k}`).innerText = songs[k].timeDuration
    }
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    document.getElementById(previousIndex).classList.remove('fa-circle-pause')
    document.getElementById(previousIndex).classList.add('fa-circle-play')
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById(songIndex).classList.add('fa-circle-pause')
})