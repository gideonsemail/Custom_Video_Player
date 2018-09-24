// Get our Elements

let player = document.querySelector('.player')
let video = player.querySelector('.viewer')
let progress = player.querySelector('.progress')
let progressBar = player.querySelector('.progress__filled')
let toggle = player.querySelector('.toggle')
let skipButtons = player.querySelectorAll('[data-skip]')
let ranges = player.querySelectorAll('.player__slider')

// Build our Functions

// this is the first function we built. "video.paused is an actual method native to the video."
function togglePlay () {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}
// this updates the button to pause/play
function updateButton () {
  let icon = this.paused ? '►' : '❚ ❚'
  console.log(icon)
  toggle.textContent = icon
}

function skip () {
  console.log(this.dataset)
  // "parseFloat" converts this string intoa true number
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate () {
  // add functionality for the name and volume values below
  video[this.name] = this.value
  // console.log(this.value)
  // console.log(this.name)
}
// functionality to set progress bar. Its based on the flex-basis property seen once we inspect the element.
function handleProgress () {
  let percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

// Finally, we need to make it such that when a user clicks anywhere on progress bar, they're taken to that portion of the video. Scrub is what he's calling it.

function scrub (e) {
  // calculate based on the "offsetX value we see when we click anywhere on the video for progress(was 280 for example)".
  let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  // update the video accordingly.
  video.currentTime = scrubTime
  //  console.log(e)
}

// Hook up Our Event Listeners
// want to find a way to pause the video and change the text. Logic below.
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click', togglePlay)
// we need to listen for when the video emits these predefined events to update the progress abr accordingly
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(button => button.addEventListener('click', skip))
// listen to the changes on the volume and range sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
// duplicate the above and listen for a mousemove event
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

// create a flag variable similar tot he canvas exercies
let mousedown = false
// functionality to listen for a click, then run function scrub.
progress.addEventListener('click', scrub)
// listen for a mousemove for when someone clicks and drags it
// it will first check the "let mousedown = false" variable. If it's true, it will move on to the "scrub" portion. If it's false, will just return false and not do anything.
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
