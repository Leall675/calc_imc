// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

//Elementos
const imcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcTable = document.querySelector("#imc-table")
const form = document.querySelector("#imc-form")
const alturaInput = document.querySelector("#altura")
const pesoInput = document.querySelector("#peso")
const btnCalcular = document.querySelector("#calcular")
const btnLimpar = document.querySelector("#limpar")
const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info span")
const backBtn = document.querySelector("#back-btn")

// Funcoes
const createTable = (data) => {
  data.forEach((item) => {
    const div = document.createElement("div")
    div.classList.add("table-data")

    const classification = document.createElement("p")
    const info = document.createElement("p")
    const obesity = document.createElement("p")
    classification.innerText = item.classification
    info.innerText = item.info
    obesity.innerText = item.obesity

    div.appendChild(classification)
    div.appendChild(info)
    div.appendChild(obesity)

    imcTable.appendChild(div)
  })
}

const checkInputs = (text) => {
  return text.replace(/[^0-9,]/g,"");
};

const clearInputs = () => {
  alturaInput.value = ""
  pesoInput.value = ""
  imcNumber.classList = ""
  imcInfo.classList = ""
}

const calcImc = (peso, altura) => {
  return (peso / (altura * altura)).toFixed(1)
}

const resultado = () => {
  imcContainer.classList.toggle("hide")
  resultContainer.classList.toggle("hide")
}

//Inicializacao
createTable(data)


//Eventos
alturaInput.addEventListener("input", (e) => {
  const updateAltura = checkInputs(e.target.value)
    e.target.value = updateAltura
})
pesoInput.addEventListener("input", (e) => {
  const updatePeso = checkInputs(e.target.value)
    e.target.value = updatePeso
})

btnLimpar.addEventListener("click", (e) => {
  e.preventDefault()
  clearInputs()
})

btnCalcular.addEventListener("click", (e) => {
  e.preventDefault()
  const peso = +pesoInput.value.replace(",", ".")
  const altura = +alturaInput.value.replace(",", ".")
  if (!peso || !altura) return
  const imc = calcImc(peso, altura)

  let info
  data.forEach((item) => {
    if(imc >= item.min && imc <= item.max)
      info = item.info
  })
  if(!info) return
  imcNumber.innerText = imc
  imcInfo.innerText = info
  resultado()
  switch(info) {
    case "Magreza":
      imcNumber.classList.add("low")
      imcInfo.classList.add("low")
      break
    case "Normal":
      imcNumber.classList.add("good")
      imcInfo.classList.add("good")
      break
    case "Sobrepeso":
      imcNumber.classList.add("low")
      imcInfo.classList.add("low")
      break
    case "Obesidade":
      imcNumber.classList.add("medium")
      imcInfo.classList.add("medium")
      break
    case "Obesidade grave":
      imcNumber.classList.add("high")
      imcInfo.classList.add("high")
      break
  }
})

backBtn.addEventListener("click", (e) => {
  e.preventDefault()
  clearInputs()
  resultado()
})