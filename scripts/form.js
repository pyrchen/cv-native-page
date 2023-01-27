document.addEventListener('DOMContentLoaded', onDomLoaded);

function onDomLoaded() {
	const form = document.getElementById('reach-me');
	const formInputs = Array.from(
		form.querySelectorAll('.input-field input, .input-field textarea')
	);
	const submitBtn = form.querySelector('button[type=submit]');

	const requiredFieldsAmount = formInputs.reduce((acc, el) => {
		if (!isOptional(el)) acc++;
		return acc;
	}, 0);

	const filledFields = [];

	form.addEventListener('submit', onFormSubmit);
	formInputs.forEach((el) => {
		el.addEventListener('input', (event) => onTextInput(event, submitBtn, requiredFieldsAmount, filledFields));
	});
}

function onFormSubmit(event) {
	event.preventDefault();
}

function onTextInput(event, submitBtn, requiredAmount, filledFields) {
	const target = event.target;
	const targetParent = target.closest('.input-field');

	if (target.value.trim()) {
		targetParent.classList.add('filled');

		if (!filledFields.includes(target) && !isOptional(target)) {
			filledFields.push(target);
		}
	} else {
		targetParent.classList.remove('filled');

		if (filledFields.includes(target)) {
			filledFields = filledFields.filter((el) => el !== target);
		}
	}

	if (filledFields.length === requiredAmount) {
		submitBtn.disabled = false;
	} else {
		submitBtn.disabled = true;
	}
}

function isOptional(el) {
	return el && el.dataset && 'optional' in el.dataset;
}