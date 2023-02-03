(function () {
	const slider = document.getElementById('slider');
	const sliderMainParentBlock = slider.closest('.main-big-block');
	const slides = [...slider.querySelectorAll(`.slide`)];
	const buttons = document.querySelectorAll('.slider-buttons div[data-move]');
	const slidesAmount = slider.querySelectorAll('.slide').length;

	let currentSlide = 0;
	const filledSlidesNums = [];
	const skillsBySlides = slides.reduce((acc, slide) => {
		const skills = slide.querySelectorAll(`.skill`);
		acc.push([...skills]);
		return acc;
	}, []);

	assignClickEventsOnButtons(buttons);
	assignScrollEventOnDocument();

	function assignClickEventsOnButtons(buttons) {
		buttons.forEach((el) => {
			el.addEventListener('click', (event) => onButtonClick(event.target, slidesAmount, slider));
		});
	}

	function assignScrollEventOnDocument() {
		document.addEventListener('scroll', () => {
			if (
				!filledSlidesNums.includes(currentSlide) && scrollY + document.documentElement.clientHeight >=
				sliderMainParentBlock.offsetTop + slider.offsetTop + slider.clientHeight
			) {
				filledSlidesNums.push(currentSlide);
				skillsBySlides[currentSlide].forEach((skillParent, index) => {
					fillSkillProgressBar(skillParent, index, 150);
				});
			}
		});
	}

	function fillSkillProgressBar(skillParent, skillIndex, delayMs = 0) {
		const [skillHeading, skillProgress] = skillParent.children;
		const skillProgressBarElement = skillProgress.children[0];
		const skillPercentElement = skillHeading.children[0];
		setTimeout(() => {
			skillProgressBarElement.style.width = skillPercentElement.innerText;
		}, skillIndex * delayMs);
	}
	function onButtonClick(btn, slidesAmount, slider) {
		const isNext = btn.dataset.move === 'next';
		if (isNext) goNextSlide(slidesAmount, slider);
		else goPrevSlide(slidesAmount, slider);
		!filledSlidesNums.includes(currentSlide) && skillsBySlides[currentSlide].forEach((skillParent, index) => {
			fillSkillProgressBar(skillParent, index, 150);
		});
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
})()