(function() {
	const siteLoader = document.querySelector('.site-loader');
	const siteLoaderInner = siteLoader.querySelector('.site-loader-text');
	const siteElements = siteLoader.querySelector('.site-elements');
	const header = document.querySelector('header');
	const headerInfo = header.querySelector('.header__info');
	const refreshBtn = header.querySelector('.btn-refresh-animation');

	onScriptLoad();
	assignBasicListeners();

	function onScriptLoad() {
		if (LS.get(LS_NAMES.WAS_PLAYED) === 1) {
			siteLoader.remove();
			header.classList.add('loader-already-played');
		} else {
			toggleBodyOverflow(true);
			assignAnimationListeners();
		}

		setTimeout(() => {
			siteLoader.classList.remove('d-none');
		}, 0);
	}

	function assignAnimationListeners() {
		siteLoaderInner.addEventListener('animationend', () => {
			siteLoaderInner.classList.add('first-animation-end');

			siteElements.classList.add('pulled');
			siteElements.children[1].addEventListener('transitionend', () => {
				siteElements.classList.add('spinning');
				siteElements.classList.contains('unpulled') && siteElements.classList.add('bounce-last');
			});

			siteElements.children[2].addEventListener('animationend', () => {
				siteLoaderInner.classList.add('before-finish');
				setTimeout(() => {
					siteLoaderInner.style.opacity = '0';
					siteElements.remove();
					siteLoader.classList.add('end');
				}, 400);
			});
		});

		siteLoaderInner.addEventListener('transitionend', () => {
			if (siteLoader.classList.contains('end')) {
				headerShowStart();
				end(120);
			}
		});

		siteElements.addEventListener('animationend', () => {
			siteElements.classList.add('unpulled');
			[...siteElements.children].forEach((element) => {
				element.addEventListener('transitionend', (event) => {
					event.target.classList.add('d-none');
				});
			});
		});
	}

	function assignBasicListeners() {
		refreshBtn.addEventListener('click', () => {
			refresh();
		});
	}

	function refresh() {
		LS.remove(LS_NAMES.WAS_PLAYED);
		window.location.reload();
	}

	function headerShowStart() {
		siteLoader.remove();
		headerInfo.style.opacity = '1';
		headerInfo.style.transform = 'scale(1)';
		window.scrollTo({ top: 0 });
	}
	function end(ms) {
		setTimeout(() => {
			header.style.height = '40vh';
			toggleBodyOverflow(false);
			LS.set(LS_NAMES.WAS_PLAYED, 1);
		}, ms);
	}

	function toggleBodyOverflow(hide) {
		if (hide) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';
	}
})();