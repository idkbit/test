let sliderIndex = 0;
const nextBtn = document.querySelector(".achievements__nextBtn");
const prevBtn = document.querySelector(".achievements__prevBtn");
showSlides(sliderIndex);

nextBtn.addEventListener("click", plusSlides);
prevBtn.addEventListener("click", minusSlides);

function plusSlides() {
	sliderIndex += 1;
	showSlides(sliderIndex);
}

function minusSlides() {
	sliderIndex -= 1;
	showSlides(sliderIndex);
}

function showSlides(n) {
	const slides = document.querySelectorAll(".achievements__slide");
	if (n + 2 > slides.length) {
		nextBtn.setAttribute("disabled", true);
	} else {
		nextBtn.removeAttribute("disabled");
	}

	if (n - 1 < 0) {
		prevBtn.setAttribute("disabled", true);
	} else {
		prevBtn.removeAttribute("disabled");
	}

	for (let slide of slides) {
		slide.classList.remove("achievements__slide_active");
	}
	slides[sliderIndex].classList.add("achievements__slide_active");
}
