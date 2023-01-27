(function () {
	document.addEventListener('DOMContentLoaded', onDomLoaded);

	let currentSlide = 0;
	let cursorX = 0;
	function onDomLoaded() {
		const slider = document.getElementById('slider');
		const buttons = document.querySelectorAll('.slider-buttons div[data-move]');

		const slidesAmount = slider.querySelectorAll('.slide').length;
		buttons.forEach((el) => {
			el.addEventListener('click', (event) => onButtonClick(event.target, slidesAmount, slider));
		});

		// setInterval(() => {
		// 	goNextSlide(slidesAmount, slider)
		// }, 5000);

		// slider.addEventListener('mousedown', (event) => {
		// 	slider.style.cursor = 'grab';
		// 	cursorX = event.x;
		//
		// 	document.onmousemove = onSliderMouseMove;
		// })
		//
		// document.addEventListener('mouseup', (event) => {
		// 	slider.style.cursor = '';
		//
		// 	if (event.x - cursorX > 40) goPrevSlide(slidesAmount, slider);
		// 	else if (event.x - cursorX < -40) goNextSlide(slidesAmount, slider);
		// 	else moveSliderBySlides(slider, slidesAmount);
		//
		// 	document.onmousemove = null;
		// });
		//
		// function onSliderMouseMove(event) {
		// 	console.log(event.x)
		// 	moveSlideByPx(slider, event.x - cursorX);
		// }
	}

	function onButtonClick(btn, slidesAmount, slider) {
		const isNext = btn.dataset.move === 'next';
		if (isNext) goNextSlide(slidesAmount, slider);
		else goPrevSlide(slidesAmount, slider);
	}

	function goNextSlide(amount, slider) {
		goToSlide(currentSlide + 1, amount, slider);
	}

	function goPrevSlide(amount, slider) {
		goToSlide(currentSlide - 1, amount, slider);
	}

	function goToSlide(next, amount, slider) {
		if (currentSlide < next && next <= amount - 1) {
			currentSlide = next;
			moveSliderBySlides(slider, amount);
		} else if (currentSlide > next && next >= 0) {
			currentSlide = next;
			moveSliderBySlides(slider, amount);
		} else if (currentSlide === 0 && next === -1) {
			currentSlide = amount - 1;
			moveSliderBySlides(slider, amount);
		} else if (currentSlide === amount - 1 && next === amount) {
			currentSlide = 0;
			moveSliderBySlides(slider, amount);
		}
	}

	function moveSliderBySlides(slider, amount) {
		const singleSlideWidth = slider.offsetWidth / amount;
		slider.style.transform = `translateX(-${singleSlideWidth * currentSlide}px)`;
	}

	function moveSlideByPx(slider, px) {
		slider.style.transform = `translateX(${px}px)`;
	}
})()