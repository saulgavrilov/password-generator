// DOM
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;

  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy password to clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

// Generate Password
function generatePassword(lower, upper, number, symbol, length) {
  let genPassword = "";

  const typesCount = upper + lower + number + symbol;

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      genPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = genPassword.slice(0, length);

  return finalPassword;
}

// Generator functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
