(function() {
	const header = document.querySelector('header');
	const menuWrapper = document.querySelector('.menu-wrapper');
	const blocks = [...document.querySelectorAll('header, .main-big-block')];
	const superBlocks = document.querySelectorAll('.super-block');
	const nav = document.querySelector('nav.menu-wrapper');
	const navBlocksElements = [...nav.querySelectorAll('.menu-content ul > li')];
	const navLine = nav.querySelector('.menu-content .line-inner');

	let menuWrapperWasOpened = false;
	const { clientHeight } = document.documentElement;

	const makeElementFilled = addElementClass('filled');
	const makeElementActive = addElementClass('active');
	const makeElementInView = addElementClass('in-view');
	const makeElementUnfilled = removeElementClass('filled');
	const makeElementNotInView = removeElementClass('in-view');

	onScriptLoad();
	startSmoothScrolling();
	openMenuOnScrollHeight();
	assignScrollEventOnDocument();
	assignSuperBlocksScrollInterceptors();
	assignClickEventOnMenuBtn();

	function onScriptLoad() {
		setTimeout(() => {
			removeElementClass('d-none')(menuWrapper);
		}, 0);
	}

	function assignClickEventOnMenuBtn() {
		menuWrapper.addEventListener('click', (event) => {
			const target = event.target;
			if (target.className.includes('menu-holder') || target.className.includes('menu-btn')) {
				if (!menuWrapperWasOpened && menuWrapper.classList.contains('active')) {
					menuWrapperWasOpened = true;
				}
				menuWrapper.classList.toggle('active');
			}
		});
	}

	function assignSuperBlocksScrollInterceptors() {
		const callback = (entries) => {
			if (scrollY + clientHeight >= entries[0].boundingClientRect.top) {
				makeElementInView(entries[0].target);
			}
		};
		superBlocks.forEach((superBlock) => {
			const observer = new IntersectionObserver(callback, {
				root: null,
				rootMargin: '0px',
				threshold: 0.5,
			});
			observer.observe(superBlock);
		});
	}
	function assignScrollEventOnDocument() {
		document.addEventListener('scroll', onBodyScroll);
	}
	function onBodyScroll() {
		blocks.forEach((block, index) => {
			const appropriateEl = navBlocksElements.find((el) => el.dataset.nav === block.id);
			if (!appropriateEl) return;
			if (index === 0 || scrollY >= block.offsetTop - clientHeight / 2) {
				makeElementFilled(appropriateEl);
				makeElementInView(block);
			} else {
				makeElementUnfilled(appropriateEl)
				makeElementNotInView(block);
			}
		});

		if (Math.ceil(scrollY + clientHeight) >= document.documentElement.scrollHeight) {
			navBlocksElements.forEach((navEl) => {
				if (!navEl.classList.contains('filled')) makeElementFilled(navEl);
			});
		}

		const filledElements = navBlocksElements.reduce((acc, el) => {
			if (el.classList.contains('filled')) acc++;
			return acc;
		}, 0);

		openMenuOnScrollHeight();
		fillNavLine(toPercents(filledElements - 1, navBlocksElements.length - 1));
	}

	function openMenuOnScrollHeight() {
		if (!menuWrapperWasOpened && scrollY >= header.clientHeight) {
			menuWrapperWasOpened = true;
			setTimeout(() => {
				makeElementActive(menuWrapper);
			}, 200);
		}
	}
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

	function addElementClass(className) {
		return function (el) {
			el.classList.add(className);
		}
	}

	function removeElementClass(className) {
		return function (el) {
			el.classList.remove(className);
		}
	}

	function toPercents(num1, num2) {
		return num1 / num2 * 100;
	}
})();