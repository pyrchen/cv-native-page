(function() {
	class LanguagesSetup {
		static init() {
			const langs = LanguagesSetup.getLanguagesElements();
			LanguagesSetup.setLangsEventListeners(langs);
		}

		static getLanguagesElements() {
			return [...document.querySelectorAll('.cv-languages div[data-lang]')];
		}

		/**
		 * @param {HTMLDivElement[]} langs
		 */
		static setLangsEventListeners(langs) {
			langs.forEach((langEl) => {
				langEl.addEventListener('click', (event) => {
					if ('active' in event.target.dataset) return;
					event.target.dataset.active = '';
					langs.forEach((element) => {
						if (element === event.target) return;
						delete element.dataset.active;
					});
				});
			});
		}
	}

	LanguagesSetup.Language = class {
		constructor(element, lang, isActive) {
			this.element = element;
			this.lang = lang;
			this.active = isActive;
		}
	}

	class ThemeSetup {
		static isDark = false;
		static init() {
			const themeSwitchEl = ThemeSetup.getThemeElement();

			if (LS.get(LS_NAMES.THEME) === 'dark') {
				ThemeSetup.isDark = true;
				themeSwitchEl.checked = ThemeSetup.isDark;
				ThemeSetup.changeBodyThemeClass();
			}

			ThemeSetup.setThemeSwitchEventListener(themeSwitchEl);
		}

		static getThemeElement() {
			return document.querySelector('.cv-theme input[type=checkbox]');
		}

		static setThemeSwitchEventListener(inputEl) {
			inputEl && inputEl.addEventListener('change', (event) => {
				ThemeSetup.isDark = !ThemeSetup.isDark;
				event.target.checked = ThemeSetup.isDark;
				ThemeSetup.isDark ? LS.set(LS_NAMES.THEME, 'dark') : LS.remove(LS_NAMES.THEME);
				ThemeSetup.changeBodyThemeClass();
			});
		}

		static changeBodyThemeClass() {
			document.body.classList[ThemeSetup.isDark ? 'add' : 'remove']('dark');
		}
	}

	LanguagesSetup.init();
	ThemeSetup.init();
})();