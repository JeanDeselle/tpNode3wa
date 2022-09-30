window.addEventListener('DOMContentLoaded', (e) => {
	const inputFirstname = document.querySelector('#fname');
	const inputLastname = document.querySelector('#lname');
	const inputEmail = document.querySelector('#email');
	const inputPassword = document.querySelector('#psw');
	const inputConfirmPsw = document.querySelector('#confirmedpsw');
	const btn = document.querySelector('.button');

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		if (
			verifinputTxt(inputFirstname) &&
			verifinputTxt(inputLastname) &&
			verifmail(inputEmail) &&
			verifPass(inputPassword, inputConfirmPsw)
		) {
			document.querySelector('#form').submit();
		}
	});
});

function showErr(msg) {
	const spanErr = document.querySelector('#error');
	spanErr.textContent = msg;
}
function verifinputTxt(input) {
	const { value } = input;
	if (value.length > 0) {
		return true;
	}
	showErr(`Please don't forget to put your fullname !`);
	return false;
}
function verifmail(input) {
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (input.value.match(mailformat)) {
		return true;
	}
	showErr(`Invalid Email`);
	return false;
}
function verifPass(input, verifInput) {
	const { value } = input;

	if (validatePassword(value)) {
		if (value === verifInput.value) {
			return true;
		} else {
			showErr(
				`The password's confirmation isn't the same as your password`
			);
		}
	} else {
		showErr(`Your Password need to contain at least 1 lowercase Letter, 1 Capital Letter, 1 special caracters, a number and need to be between 8 and 25 caracters long`);
		return false;
	}
}

const validatePassword = (password) => {
	return String(password).match(
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,25})$/
	);
};
