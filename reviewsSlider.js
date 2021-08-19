const swiper = new Swiper(".swiper-container", {
	// Optional parameters
	direction: "horizontal",
	loop: false,
	slidesPerView: 2,
	spaceBetween: 30,
	breakpoints: {
		0: {
			slidesPerView: 1,
			spaceBetween: 15,
		},
		1150: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1660: {
			slidesPerView: 3,
		},
	},

	// Navigation arrows
	navigation: {
		nextEl: ".reviews__nextBtn",
		prevEl: ".reviews__prevBtn",
	},
});
