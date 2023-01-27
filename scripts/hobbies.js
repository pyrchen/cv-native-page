(function () {
	const hobbiesBlocks = document.querySelectorAll('.hobbies-wrapper > div:not(.hobby-main)');
	const hobbyMainBlock = document.querySelector('.hobbies-wrapper > div.hobby-main');

	hobbiesBlocks.forEach((block) => {
		block.addEventListener('click', onHobbyClick);
	})

	function onHobbyClick(event) {
		const target = event.currentTarget;
		target.style.animationName = 'bounce';

		setTimeout(() => {
			const temp = hobbyMainBlock.innerHTML;
			hobbyMainBlock.innerHTML = target.innerHTML;
			target.innerHTML = temp;
			target.style.animationName = '';
		}, 400);
	}
})()