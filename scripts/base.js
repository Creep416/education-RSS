// function switch_to(class_name) {
// 	let elems = document.getElementByClassName("product-section");
// 	for (var i = elems.length - 1; i >= 0; i--) {
// 		elems[i].classList.remove("active");
// 	}
// 	elems.querrySelector(class_name).classList.add("active");
// }

function burgerToggle() {
	document.querySelector(".burger-menu").classList.toggle("active");
	document.querySelector(".burger-menu-button").classList.toggle("active");
}
