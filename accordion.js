const acc = document.querySelectorAll(".faq__accordion");

for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("faq__accordion_active");
		const panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.marginBottom = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
			panel.style.marginBottom = panel.scrollHeight + "px";
		}
	});
}
