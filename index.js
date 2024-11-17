const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const VIDEOS = [
  'media/videos/EDIT.MOV',
  'media/videos/EDIT2.MOV',
  'media/videos/lifeXD.MP4',
  'media/videos/minions.MP4',
]

const FILE_DOWNLOADS = [
  'media/images/BNYX.jpg',
  'media/images/caluski.PNG',
  'media/images/EMO.PNG',
  'media/images/EMO_BOY.PNG',
  'media/images/gnom.jpg',
  'media/images/harry_pothed.jpg',
  'media/images/idk.PNG',
  'media/images/kamil_kamil_78.PNG',
  'media/images/lekcja.JPG',
  'media/images/lekcja_nr2.JPG',
  'media/images/lodzik.JPG',
  'media/images/maja.PNG',
  'media/images/mcquenn.PNG',
  'media/images/modlitwa.PNG',
  'media/images/na_pieska.JPG',
  'media/images/na_pieska_v2.PNG',
  'media/images/O_o.jpg',
  'media/images/pazurki.PNG',
  'media/images/sebus.JPG',
  'media/images/shrek.PNG',
  'media/images/stoopki.JPG',
  'media/images/ugly_face.PNG',
  'media/images/Victoria.PNG',
  'media/images/zadymiarz.JPG',
]

/**
 * Animating the URL with emojis
 * See: https://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/
 */
function animateUrlWithEmojis () {
    if (window.ApplePaySession) {
      // Safari doesn't show the full URL anyway, so we can't animate it
      return
    }
    const rand = Math.random()
    if (rand < 0.33) {
      animateUrlWithBabies()
    } else if (rand < 0.67) {
      animateUrlWithWave()
    } else {
      animateUrlWithMoons()
    }
  
    function animateUrlWithBabies () {
      const e = ['🏻', '🏼', '🏽', '🏾', '🏿']
  
      setInterval(() => {
        let s = ''
        let i; let m
  
        for (i = 0; i < 10; i++) {
          m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
          s += '👶' + e[m]
        }
  
        window.location.hash = s
      }, 100)
    }
  
    function animateUrlWithWave () {
      setInterval(() => {
        let i; let n; let s = ''
  
        for (i = 0; i < 10; i++) {
          n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4
  
          s += String.fromCharCode(0x2581 + n)
        }
  
        window.location.hash = s
      }, 100)
    }
  
    function animateUrlWithMoons () {
      const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
      const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let m = 0
  
      setInterval(() => {
        let s = ''
        let x = 0
  
        if (!m) {
          while (d[x] === 4) {
            x++
          }
  
          if (x >= d.length) m = 1
          else {
            d[x]++
          }
        } else {
          while (d[x] === 0) {
            x++
          }
  
          if (x >= d.length) m = 0
          else {
            d[x]++
  
            if (d[x] === 8) d[x] = 0
          }
        }
  
        d.forEach(function (n) {
          s += f[n]
        })
  
        window.location.hash = s
      }, 100)
    }
  }
  

  /**
 * Trigger a file download immediately. One file download is allowed *without* user
 * interaction. Further file downloads should happen in response to a user-initiated
 * event or they will be blocked.
 */
function triggerFileDownload () {
    const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
    const a = document.createElement('a')
    a.href = fileName
    a.download = fileName
    a.click()
  }

  /**
 * Start an annoying theramin that changes pitch and volume depending on
 * the mouse position. Uses a Web Audio oscillator. Reauires user-initiated
 * event.
 * Based on https://github.com/feross/TheAnnoyingSite.com/pull/2
 */
function startTheramin () {
    const audioContext = new AudioContext()
    const oscillatorNode = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
  
    const pitchBase = 50
    const pitchRange = 4000
  
    const wave = audioContext.createPeriodicWave(
      Array(10).fill(0).map((v, i) => Math.cos(i)),
      Array(10).fill(0).map((v, i) => Math.sin(i))
    )
  
    oscillatorNode.setPeriodicWave(wave)
  
    oscillatorNode.connect(gainNode)
    gainNode.connect(audioContext.destination)
  
    oscillatorNode.start(0)
  
    const oscillator = ({ pitch, volume }) => {
      oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
      gainNode.gain.value = volume * 3
    }
  
    document.body.addEventListener('mousemove', event => {
      const { clientX, clientY } = event
      const { clientWidth, clientHeight } = document.body
      const pitch = (clientX - clientWidth / 2) / clientWidth
      const volume = (clientY - clientHeight / 2) / clientHeight
      oscillator({ pitch, volume })
    })
  }

  
  /**
 * Move the window around the screen and bounce off of the screen edges.
 */
function moveWindowBounce () {
    let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
    let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  
    setInterval(() => {
      const x = window.screenX
      const y = window.screenY
      const width = window.outerWidth
      const height = window.outerHeight
  
      if (x < MARGIN) vx = Math.abs(vx)
      if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
      if (y < MARGIN + 20) vy = Math.abs(vy)
      if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)
  
      window.moveBy(vx, vy)
    }, TICK_LENGTH)
  }

  
  /**
 * Show a random troll video in the window.
 */
function startVideo () {
    const video = document.createElement('video')
  
    video.src = getRandomArrayEntry(VIDEOS)
    video.autoplay = true
    video.loop = true
    video.style = 'width: 100%; height: 100%;'
  
    document.body.appendChild(video)
  }
  
  /**
   * When a child window closes, notify the parent window so it can remove it from
   * the list of child windows.
   */
  function detectWindowClose () {
    window.addEventListener('unload', () => {
      if (!window.opener.closed) window.opener.onCloseWindow(window)
    })
  }
  

  /**
 * Disable the back button. If the user goes back, send them one page forward ;-)
 */
function blockBackButton () {
    window.addEventListener('popstate', () => {
      window.history.forward()
    })
  }
  /**
 * Fill the history with extra entries for this site, to make it harder to find
 * the previous site in the back button's dropdown menu.
 */
function fillHistory () {
    for (let i = 1; i < 20; i++) {
      window.history.pushState({}, '', window.location.pathname + '?q=' + i)
    }
    // Set location back to the initial location, so user does not notice
    window.history.pushState({}, '', window.location.pathname)
  }
  