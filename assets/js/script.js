const playBtn = document.querySelectorAll(".btn>span>i")[1]
const previousBtn = document.querySelectorAll(".btn>span>i")[0]
const nextBtn = document.querySelectorAll(".btn>span>i")[2]
const img = document.querySelector("img")
const audio = document.querySelector("audio")
const musicName = document.querySelectorAll("figure>figcaption>p")[0]
const singerName = document.querySelectorAll("figure>figcaption>p")[1]
const beforeBg = document.querySelector(".before")
const body = document.querySelector("body")
const playLine = document.querySelector(".play>.line>div")
const playLineFull = document.querySelector(".play>.line>div>div")

const playLineDot = document.querySelector(".play>.line>div>div>span")

const startTimeList = document.querySelectorAll(".play>.line>.start>span")
const endTimeList = document.querySelectorAll(".play>.line>.end>span")

let listNum = 0


const musicList = [{
        musicName: "Ghoftam Ghame To Daram",
        singer: "Mohammad reza Shajryan",
        MusicUrl: "assets/audio/MohammadReza Shajryan – Ghoftam Ghame To Daram (321).mp3",
        imgUrl: "assets/img/شجریان.jpg",
        bgColor: "rgba(194, 194, 194, 0.99)"

    }, {
        musicName: "Moama",
        singer: "Javad Yasari",
        MusicUrl: "assets/audio/javad_yasari_moama\ 128.mp3",
        imgUrl: "assets/img/yasari.jpg",
        bgColor: "rgb(51, 54, 85)"

    },
    {
        musicName: "Khaleg",
        singer: "Moein",
        MusicUrl: "assets/audio/Moein - Khalegh [320].mp3",
        imgUrl: "assets/img/معین-خواننده-ایرانی3.jpg",
        bgColor: "rgba(226, 128, 145, 1)"

    },
    {
        musicName: "Behet Ghol midam",
        singer: "Mohsen Yeganeh",
        MusicUrl: "assets/audio/Mohsen Yeganeh - Behet Ghol Midam (128) (online-audio-converter.com).mp3",
        imgUrl: "assets/img/photo_2017-08-30_19-39-52.jpg",
        bgColor: "rgb(111, 51, 129)"

    },
    {
        musicName: "Navak",
        singer: "Mohsen  chavoshi",
        MusicUrl: "assets/audio/Mohsen.Chavoshi - Arouse_Man_ft._Dj_Abed [128] (2).mp3",
        imgUrl: "assets/img/پلی-لیست-چاووشی-390x390.png",
        bgColor: "rgb(221, 140, 59)"
    },
    {
        musicName: "Yeki hast",
        singer: "Morteza Pashaei",
        MusicUrl: "assets/audio/Morteza Pashaei - Gerye Kon (321).mp3",
        imgUrl: "assets/img/Screenshot-2023-12-02-094024پاشایی.jpg",
        bgColor: "blue"

    }

]

playMusicByArray(listNum)

////////play and pause button///
playBtn.addEventListener("click", (e) => {
    if (playBtn.className == "bi bi-pause-fill") {
        audio.pause()
        playBtn.className = "bi bi-play-fill"
    } else {
        audio.play()
        playBtn.className = "bi bi-pause-fill"
    }
})
////////
//////keyboard logic////
window.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        if (playBtn.className == "bi bi-pause-fill") {
            audio.pause()
            playBtn.className = "bi bi-play-fill"
        } else {
            audio.play()
            playBtn.className = "bi bi-pause-fill"
        }
    }
    if (e.code == "ArrowLeft") {
        listNum--
        if (listNum < 0) listNum = 5
        playMusicByArray(listNum)
        playBtn.className = "bi bi-pause-fill"
    }
    if (e.code == "ArrowRight") {
        listNum++
        if (listNum > musicList.length - 1) listNum = 0
        playMusicByArray(listNum)
        playBtn.className = "bi bi-pause-fill"
    }


})
/////////////////////////////
///////next and privious  button
nextBtn.addEventListener("click", (e) => {
    listNum++
    if (listNum > musicList.length - 1) listNum = 0
    playMusicByArray(listNum)
    playBtn.className = "bi bi-pause-fill"

})
previousBtn.addEventListener("click", (e) => {
    listNum--
    if (listNum < 0) listNum = 5
    playMusicByArray(listNum)
    playBtn.className = "bi bi-pause-fill"

})
//////////////
////////////////play line ///////////////


playLine.addEventListener("click", (e) => {
    let leftElement = playLine.getBoundingClientRect().left
    let pxLeft = e.clientX - leftElement
    let resulrPersent = (100 * pxLeft) / playLine.clientWidth
    // let resulrPersentSec = 100 * 
    playLineDot.style.left = resulrPersent + "%"
    audio.currentTime = (resulrPersent * audio.duration) / 100
    ///////////////////////

    playLineFull.style.width = resulrPersent + "%"
    console.log(resulrPersent + "%");

})


////////////////////
/////////////playLineDot//////////////



//////////////////
/////////setInterval time////////
let sec = 0
setInterval(() => {
    if (audio.currentTime >= audio.duration - 2) {
        listNum++
        if (listNum > musicList.length - 1) listNum = 0;
        playMusicByArray(listNum)
        console.log("golog");


    };

    let result = (100 * audio.currentTime) / audio.duration
    playLineDot.style.left = result + "%"
    playLineFull.style.width = result + "%"
    let second = Math.floor(audio.currentTime)
    let endSec = Math.floor(audio.duration)
    let endResMin = Math.floor((endSec / 60) - ((second / 60)))
    let endResSec = (endSec - second) % 60

    ////start/////
    if (String(Math.floor(second / 60)).length < 2) {
        startTimeList[0].innerHTML = "0" + Math.floor(second / 60)
    } else {
        startTimeList[0].innerHTML = Math.floor(second / 60)
    }

    if (String(Math.floor(second % 60)).length < 2) {
        startTimeList[2].innerHTML = "0" + Math.floor(second % 60)
    } else {
        startTimeList[2].innerHTML = Math.floor(second % 60)
    }
    //////
    ///////end///////
    if (isNaN(endResMin)) {
        endResMin = 0
    } else {
        if (String(endResMin).length < 2) {
            endTimeList[0].innerHTML = "0" + endResMin
        } else {
            endTimeList[0].innerHTML = endResMin
        }
    }


    // if (endResSec == 60) {
    //     endResSec = 0
    // }
    if (isNaN(endResSec)) {
        endResSec = 0

    } else {
        if (String(endResSec).length < 2) {
            endTimeList[2].innerHTML = "0" + endResSec
        } else {
            endTimeList[2].innerHTML = endResSec
        }
    }
    console.log(endResSec);

    //////////////
}, 1000)




/////////////
//////////////////////array play function//////
function playMusicByArray(listNum) {
    img.src = musicList[listNum].imgUrl
    beforeBg.style.backgroundImage = `url(${musicList[listNum].imgUrl})`
    body.style.backgroundColor = musicList[listNum].bgColor
    musicName.innerHTML = musicList[listNum].musicName
    singerName.innerHTML = musicList[listNum].singer
    ////////////////////////////////////////////
    audio.src = musicList[listNum].MusicUrl
    audio.load()
    ///////////////////////////
    audio.play()
}
