'use strict'

//          Valitsee pelaajat
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

//          Valitsee pisteet
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')

//          Valitsee nykyisen pelaajan
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

//          Valitsee nopan
const diceEl = document.querySelector('.dice')

//          Valitsee uusi peli painikkeen
const btnNew = document.querySelector('.btn--new')

//          Valitsee Heitä painikkeen
const btnRoll = document.querySelector('.btn--roll')

//          Valitsee Pidä painikkeen
const btnHold = document.querySelector('.btn--hold')

//          Esittää kyseessä olevat nimet
let pisteet, nykyisetPisteet, aktiivinenPelaaja, pelaamassa

//          Pelin alkutilanne / Pelin nollaus / Määrittää alussa olevat pistemäärät, nimen ja pelaajan.
//          nollaa pelin sekä jakaa aloitusvuoron pelaajalle 1.
const init = function () {
  pisteet = [0, 0]
  nykyisetPisteet = 0
  aktiivinenPelaaja = 0
  pelaamassa = true

  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  diceEl.classList.add('hidden')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
}
init()

//        Näyttää aktiivisen pelaajan sekä vaihtaa pelaajan.
const switchPlayer = function () {
  document.getElementById(`current--${aktiivinenPelaaja}`).textContent = 0
  nykyisetPisteet = 0
  //        Vaihtaa seuraavan pelaajan jos pelaaja heittää luvun 1
  aktiivinenPelaaja = aktiivinenPelaaja === 0 ? 1 : 0
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

//        Heittää noppaa sekä arpoo luvun 1-6 välillä
btnRoll.addEventListener('click', function () {
  if (pelaamassa) {
    const dice = Math.trunc(Math.random() * 6) + 1

    //        Piilottaa nykyisen nopan
    diceEl.classList.remove('hidden')

    //        Näyttää uuden heitetyn nopan luvun sekä vaihtaa noppakuvan vastaamaan heitettyä numeroa
    diceEl.src = `noppa-${dice}.png`

    //        Jos noppa ei heitä lukua 1 niin pisteet plussataan aiempien pisteiden päälle
    if (dice !== 1) {
      nykyisetPisteet += dice
      document.getElementById(`current--${aktiivinenPelaaja}`).textContent =
        nykyisetPisteet

      //        Jos noppa kuitenkin on luku 1 niin pelaaja vaihtuu
    } else {
      switchPlayer()
    }
  }
})

//      Hakee aktiivisen pelaajan aiemmat pisteet ja laskee uudet pisteet
btnHold.addEventListener('click', function () {
  if (pelaamassa) {
    pisteet[aktiivinenPelaaja] += nykyisetPisteet

    document.getElementById(`score--${aktiivinenPelaaja}`).textContent =
      pisteet[aktiivinenPelaaja]

    //      Jos pisteet ovat suuremmat kuin 100, piilottaa nopan, ilmoittaa että pelaaja ei pelaa
    if (pisteet[aktiivinenPelaaja] >= 100) {
      pelaamassa = false
      diceEl.classList.add('hidden')

      //      Ilmoittaa voittajan
      document
        .querySelector(`.player--${aktiivinenPelaaja}`)
        .classList.add('player--winner')

      //      Poistaa pelaajan aktiivisuuden
      document
        .querySelector(`.player--${aktiivinenPelaaja}`)
        .classList.remove('player--active')

      //      Muussa tapauksessa vaihtaa pelaajaa
    } else {
      switchPlayer()
    }
  }
})
//      Uusi peli painike. Suorittaa init komennon joka resettaa pelin alkutilaan
btnNew.addEventListener('click', init)
