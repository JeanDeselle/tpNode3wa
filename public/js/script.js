window.addEventListener('DOMContentLoaded', (e) => {
	const inputFirstname = document.querySelector('#fname');
	const inputLastname = document.querySelector('#lname');
	const inputEmail = document.querySelector('#email');
	const inputPassword = document.querySelector('#psw');
	const btn = document.querySelector('.button');

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		if (
			verifinputTxt(inputFirstname) &&
			verifinputTxt(inputLastname) &&
			verifmail(inputEmail) &&
			verifPass(inputPassword)
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
function verifPass(input) {
	const { value } = input;
	if (value.length > 6) {
		return true;
	}
	showErr(`Please enter at least a 6 caracters password`);
	return false;
}