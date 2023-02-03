(function () {
	main();
	function main() {
		const hobbiesBlocks = document.querySelectorAll('.hobbies-wrapper > div:not(.hobby-main)');
		const hobbyMainBlock = document.querySelector('.hobbies-wrapper > div.hobby-main');

		hobbiesBlocks.forEach((block) => {
			block.addEventListener('click', (event) => onHobbyClick(event, hobbyMainBlock));
		});
	}

	function onHobbyClick(event, mainBlock) {
		const target = event.currentTarget;
		target.style.animationName = 'bounce';

		setTimeout(() => {
			const temp = mainBlock.innerHTML;
			mainBlock.innerHTML = target.innerHTML;
			target.innerHTML = temp;
			target.style.animationName = '';
		}, 400);
	}
})();