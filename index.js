const formEl = document.querySelector("form");
const completeFormEl = document.getElementById('completeForm');

const numberCardOutputEl = document.getElementById("number-card");
const numberCardInputEl = document.getElementById("number");
const numberErrorEl = document.getElementById("number-error");

const nameCardOutputEl = document.getElementById("name-card");
const nameCardInputEl = document.getElementById("name");
const nameErrorEl = document.getElementById("name-error");

const cvcCardOutputEl = document.getElementById("cvc-card");
const cvcCardInputEl = document.getElementById("cvc");
const cvcErrorEl = document.getElementById("cvc-error");

const yearCardOutputEl = document.getElementById("yy-exp-card");
const yearCardInputEl = document.getElementById("exp-year");
const expErrorEl = document.getElementById("exp-error");

const monthCardOutputEl = document.getElementById("mm-exp-card");
const monthCardInputEl = document.getElementById("exp-month");

const pattern = /[a-z]/gim;

class Input {
	constructor(
		inputElement,
		outputElement,
		errorTextContainer,
		defaultText,
		isAnyMaxCharacters = false,
		max = 0,
		onlyContainsNumbers = false,
		correction = true
	) {
		this.inputElement = inputElement;
		this.outputElement = outputElement;
		this.isAnyMaxCharacters = isAnyMaxCharacters;
		this.defaultText = defaultText;
		this.max = max;
		this.track();
		this.onlyContainsNumbers = onlyContainsNumbers;
		this.errorTextContainer = errorTextContainer;
		this.correction = correction;
	}
	track() {
		window.addEventListener("keyup", (e) => {

			let patternTest = pattern.test(this.inputElement.value);

			if (
				this.max >= this.inputElement.value.length ||
				this.isAnyMaxCharacters === false
			) {
				if (
					e.target.id === this.inputElement.id &&
					this.inputElement.value.length !== 0
				) {
					this.outputElement.innerText = this.inputElement.value;

				}
			} else {
				while (this.max < this.inputElement.value.length) {
					this.inputElement.value = this.inputElement.value.substring(
						0,
						this.inputElement.value.length - 1
					);
				}

			}

			if (this.inputElement.value.length === 0) {
				this.outputElement.innerText = this.defaultText;
			}

			if (
				this.correction &&
				((this.onlyContainsNumbers && patternTest) ||
					this.inputElement.value.length === 0)
			) {
				this.inputElement.style.borderColor = "hsl(0, 100%, 66%)";
				if (patternTest) {
					this.errorTextContainer.innerText = "Wrong format, only numbers";
				} else if (this.inputElement.value.length === 0) {
					this.errorTextContainer.innerText = "Can't be blank";
				}
			} else {
				this.inputElement.style.borderColor = "";
				this.errorTextContainer.innerText = " ";
			}

		});
	}
}

const number = new Input(
	numberCardInputEl,
	numberCardOutputEl,
	numberErrorEl,
	"0000 0000 0000 0000",
	true,
	19,
	true
);
const name = new Input(
	nameCardInputEl,
	nameCardOutputEl,
	nameErrorEl,
	"Jane Appleseed",
	false
);
const cvc = new Input(
	cvcCardInputEl,
	cvcCardOutputEl,
	cvcErrorEl,
	"123",
	true,
	3,
	true
);

const year = new Input(
	yearCardInputEl,
	yearCardOutputEl,
	expErrorEl,
	"00",
	true,
	2,
	false,
	false
);
const month = new Input(
	monthCardInputEl,
	monthCardOutputEl,
	expErrorEl,
	"00",
	true,
	2,
	false,
	false
);

window.addEventListener("keypress", (e) => {
	if (
		(number.inputElement.value.length + 1) % 5 == 0 &&
		number.inputElement.value.length != 0 &&
		e.target.matches("#" + number.inputElement.id) &&
		e.code != "Backspace"
	) {
		number.inputElement.value += " ";
	}


});
window.addEventListener("keyup", (e) => {
	if (
		e.target.matches("#" + year.inputElement.id) ||
		e.target.matches("#" + month.inputElement.id)
	) {
		if (year.inputElement.value === "" || month.inputElement.value === "") {
			setTimeout(() => {
				year.errorTextContainer.innerText = "Can't be blank";
				if (year.inputElement.value === "")
					year.inputElement.style.borderColor = "hsl(0, 100%, 66%)";
				if (month.inputElement.value === "")
					month.inputElement.style.borderColor = "hsl(0, 100%, 66%)";
			}, 2);
		}

		setTimeout(() => {
			if (pattern.test(month.inputElement.value)) {
				year.errorTextContainer.innerText = "Wrong format, only numbers";
				month.inputElement.style.borderColor = "hsl(0, 100%, 66%)";
			}

			if (pattern.test(year.inputElement.value)) {
				year.errorTextContainer.innerText = "Wrong format, only numbers";
				year.inputElement.style.borderColor = "hsl(0, 100%, 66%)";
			}

		}, 10);
	}
})

formEl.addEventListener("submit", (e) => {
	e.preventDefault()
	formEl.style.display = "none"
	completeFormEl.style.display = "flex"
});
