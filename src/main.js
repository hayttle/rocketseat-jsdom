import "./css/index.css"
import Imask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

const ccNumber = document.querySelector(".cc-number")
const ccHolder = document.querySelector(".cc-holder .value")
const ccExpiration = document.querySelector(".cc-expiration .value")
const ccSecurity = document.querySelector(".cc-security .value")

const form = document.querySelector("form")
const addButton = document.querySelector("#add-card")
const cardHolder = document.querySelector("#card-holder")

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}
const cardNumberMasked = Imask(cardNumber, cardNumberPattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = Imask(expirationDate, expirationDatePattern)

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = Imask(securityCode, securityCodePattern)

addButton.addEventListener("click", (event) => {
  event.preventDefault()
  alert("Cartão adicionado!")
  reset()
})
cardNumber.addEventListener("input", (event) => {
  ccNumber.innerHTML =
    cardNumber.value.length === 0 ? "0000 0000 0000 0000" : cardNumber.value
  const cardType = cardNumberMasked.masked.currentMask.cardType
  setCardType(cardType)
})
cardHolder.addEventListener("input", (event) => {
  ccHolder.innerHTML =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})
expirationDate.addEventListener("input", (event) => {
  ccExpiration.innerHTML =
    expirationDate.value.length === 0 ? "00/00" : expirationDate.value
})
securityCode.addEventListener("input", (event) => {
  ccSecurity.innerHTML =
    securityCode.value.length === 0 ? "000" : securityCode.value
})

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    "american-express": ["#FFF", "#00C0EA"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

function reset() {
  form.reset()
  ccNumber.innerHTML = '0000 0000 0000 0000'
  ccHolder.innerHTML = 'FULANO DA SILVA'
  ccExpiration.innerHTML = '00/00'
  ccSecurity.innerHTML = '000'
}

window.setCardType = setCardType
