let photosFolder = ""
let commonName = ""
let startPhotoNumber = 0
let endPhotoNumber = 0
let currentPhotoNumber = 0
let pathName = `${photosFolder}/${commonName}${currentPhotoNumber}.jpg`
let refresh

let jsonFiles = []
let currentJsonFile = 0
let isImg = true

function main() {
    document.getElementById("load-photos").addEventListener("click", function() {
        isImg = true 
        loadImage()}
        )
    document.getElementById("load-JSON").addEventListener("click", function() {
        isImg = false
        loadJSON()}
        )

    document.getElementById("Previous-Photo").addEventListener("click", prevImg)
    document.getElementById("main-img").addEventListener("click", nextImg)
    document.getElementById("Next-Photo").addEventListener("click", nextImg)
    document.getElementById("First-Photo").addEventListener("click", firstImg)
    document.getElementById("Last-Photo").addEventListener("click", lastImg)
    document.getElementById("SlideShow").addEventListener("click", slideShow)
    document.getElementById("RandomSlideShow").addEventListener("click", randomSlideShow)
    document.getElementById("StopSlideShow").addEventListener("click", stopSlideShow)
}

function loader() {
    pathName = `${photosFolder}${commonName}${currentPhotoNumber}.jpg`
    document.getElementById("main-img").src = pathName
    document.getElementById("textbox").value = pathName
    document.getElementById("status-text").innerHTML = "Photo Viewer System"
    document.getElementById("main-img").alt = "Path does not exist"
}

function loaderError() {
    document.getElementById("status-text").innerHTML = "Error: Invalid Range"
    document.getElementById("main-img").alt = "Path does not exist"
}

function loadImage() {
    photosFolder = document.getElementById("textbox1").value
    commonName = document.getElementById("textbox2").value
    startPhotoNumber = parseInt(document.getElementById("textbox3").value)
    endPhotoNumber = parseInt(document.getElementById("textbox4").value)

    if(startPhotoNumber > endPhotoNumber) {
        loaderError()
    } else {
        currentPhotoNumber = startPhotoNumber
        loader()
    }
}

function prevImg() {
    if(currentPhotoNumber == startPhotoNumber){
        currentPhotoNumber = endPhotoNumber  
    } else{
        currentPhotoNumber--;
    }
    loader()
}

function nextImg() {
    if(isImg) {
        if(currentPhotoNumber == endPhotoNumber){
            currentPhotoNumber = startPhotoNumber  
        } else{
            currentPhotoNumber++;
        }
        loader()
    } else {
        nextImgJ()
    }
}

function firstImg() {
    if(isImg){
        currentPhotoNumber = startPhotoNumber
        loader()
    } else {
        firstImgJ()
    }
}

function lastImg() {
    if(isImg) {
        currentPhotoNumber = endPhotoNumber
        loader()
    } else {
        lastImgJ()
    }
}

function randomImg() {
    if(isImg){
        currentPhotoNumber = Math.floor((Math.random() * endPhotoNumber) + startPhotoNumber);
        loader()    
    } else{
        randomImgJ()
    }
}

function slideShow() {
    if(isImg){
        refresh = setInterval(nextImg, 1000)
    } else {
        slideShowJ()
    }
}

function randomSlideShow() {
    if(isImg){
        refresh = setInterval(randomImg, 1000)
    } else{
        randomSlideShowJ()
    }
}

function stopSlideShow() {
    if(isImg) {
        clearInterval(refresh)
    } else {
        stopSlideShowJ()
    }
}

function loadJSON() {
    let jsonFile = document.getElementById("textbox5").value

    fetch(jsonFile)
    .then(response => {
      return response.json();
    })
    .then((output) => {
        for (let prop in output.images) {
            jsonFiles.push(output["images"][prop]["imageURL"])
        }
        currentJsonFile = 0
        loaderJ()
    })
    .catch(err => console.error(err));
}

function loaderJ() {
    pathName = jsonFiles[currentJsonFile]
    document.getElementById("main-img").src = pathName
    document.getElementById("textbox").value = pathName
    document.getElementById("status-text").innerHTML = "Photo Viewer System"
    document.getElementById("main-img").alt = "Path does not exist"
}

function prevImgJ() {
    if(currentJsonFile == 0){
        currentJsonFile = jsonFiles.length - 1
    } else{
        currentJsonFile--;
    }
    loaderJ()
}

function nextImgJ() {
    if(currentJsonFile == jsonFiles.length - 1){
        currentJsonFile = 0
    } else{
        currentJsonFile++;
    }
    loaderJ()
}

function firstImgJ() {
    currentJsonFile = 0
    loaderJ()
}

function lastImgJ() {
    currentJsonFile = jsonFiles.length - 1
    loaderJ()
}

function randomImgJ() {
    currentJsonFile = Math.floor((Math.random() * jsonFiles.length));
    loaderJ()
}

function slideShowJ() {
    refresh = setInterval(nextImgJ, 1000)
}

function randomSlideShowJ() {
    refresh = setInterval(randomImgJ, 1000)
}

function stopSlideShowJ() {
    clearInterval(refresh)
}

window.onload = main;