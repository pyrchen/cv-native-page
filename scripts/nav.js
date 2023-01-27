(function () {
	const menuWrapper = document.querySelector('.menu-wrapper');
	const blocks = [...document.querySelectorAll('header, .main-big-block')];
	const nav = document.querySelector('nav.menu-wrapper');
	const navBlocksElements = [...nav.querySelectorAll('.menu-content ul > li')];
	const navLine = nav.querySelector('.menu-content .line-inner');

	let filledNavElements = 0;

	menuWrapper && menuWrapper.addEventListener('click', (event) => {
		const target = event.target;
		if (target.className.includes('menu-holder') || target.className.includes('menu-btn')) {
			menuWrapper.classList.toggle('active');
		}
	});

	const { scrollHeight, clientHeight } = document.documentElement;

	// fillNavLine(toPercents(scrollY + clientHeight, scrollHeight));

	document.addEventListener('scroll', onBodyScroll);

	let filledElements = 0;
	function onBodyScroll() {
		const goPercents = toPercents(scrollY + clientHeight, scrollHeight);
		const onePartPercents = toPercents(1, navBlocksElements.length);

		blocks.forEach((block, index) => {
			const appropriateEl = navBlocksElements.find((el) => el.dataset.nav === block.id);
			if (!appropriateEl) return;
			if (index === 0) return makeElementFilled(appropriateEl);
			if (scrollY + 1 >= block.offsetTop) makeElementFilled(appropriateEl);
			else unmakeElementFilled(appropriateEl);
		});

		if (Math.ceil(scrollY + clientHeight) >= scrollHeight) {
			makeElementFilled(navBlocksElements[navBlocksElements.length - 1]);
		} else {
			unmakeElementFilled(navBlocksElements[navBlocksElements.length - 1]);
		}

		const filledElements = navBlocksElements.reduce((acc, el) => {
			if (el.classList.contains('filled')) acc++;
			return acc;
		}, 0);

		fillNavLine(toPercents(filledElements - 1, navBlocksElements.length - 1));
	}

	startSmoothScrolling();
	function startSmoothScrolling() {
		navBlocksElements.forEach((el) => {
			el.addEventListener('click', () => {
				const appropriateBlock = blocks.find((block) => block.id === el.dataset.nav);
				if (!appropriateBlock) return;
				appropriateBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
			})
		});
	}

	function fillNavLine(percents) {
		navLine.style.height = `${percents}%`;
	}

	function makeElementFilled(el) {
		el.classList.add('filled');
	}

	function unmakeElementFilled(el) {
		el.classList.remove('filled');
	}

	function toPercents(num1, num2) {
		return num1 / num2 * 100;
	}
})()