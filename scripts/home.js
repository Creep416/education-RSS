// carousel repeat function

var timerId;

function carouselRestart()
{
	// if (timerId != undefined) {}
	clearInterval(timerId);
	timerId = setInterval(() => slider_slide('r'), 5000);
}

function replaceCoffee(n)
{
	slideElem.querySelector(".slide>img").src = sliderObj[n].imgSrc;

	slideElem.querySelector(".slide-desc>.name").innerHTML = sliderObj[n].name;

	slideElem.querySelector(".slide-desc>.comment").innerHTML = sliderObj[n].description;

	slideElem.querySelector(".slide-desc>.price").innerHTML = ('$'+sliderObj[n].price);
}



var request = new XMLHttpRequest();
request.open("GET", "../json/carousel.json");
request.responseType = "json";
request.send();

request.onload = function () {
	sliderObj = request.response;
	replaceCoffee(0);
	carouselRestart();
}

// slideElem
var slideElem = document.querySelector("div.slide");

var controlPanel = document.querySelectorAll('.control-panel > div');

var controlPanelActive = 0;
controlPanel[controlPanelActive].classList.add("active");


function slider_slide(direction) {
	carouselRestart();
	// controlPanel = document.getElementsByClassName('control');
	switch(direction){
	case 'l':

		slideElem.classList.add("right");
		if (controlPanelActive == 0) {
			controlPanelActive = 2;
		} else {
			controlPanelActive-=1;
		}
		setTimeout(() => {
			replaceCoffee(controlPanelActive)
			slideElem.classList.remove("right");
			slideElem.style.transition = "0s";
			slideElem.classList.add("left");
			setTimeout(() => {
				slideElem.style.transition = "0.5s";
				slideElem.classList.remove("left");
			}, 10);
		}, 200)
		break;
	case 'r':
		slideElem.classList.add("left");

		if (controlPanelActive == 2) {
			controlPanelActive = 0;
		} else {
			controlPanelActive+=1;
		}
		setTimeout(() => {
			replaceCoffee(controlPanelActive)
			slideElem.classList.remove("left");
			slideElem.style.transition = "0s";
			slideElem.classList.add("right");
			setTimeout(() => {
				slideElem.style.transition = "0.5s";
				slideElem.classList.remove("right");
			}, 10);
		}, 200)
		break;
	}
	
	// setTimeout(() => {
	// 	replaceCoffee(controlPanelActive)
	// 	slideElem.classList.remove("left");
	// 	slideElem.classList.remove("right");
	// }, 500)
	


	for (let elem of controlPanel) {
		elem.classList.remove("active");
	}
	controlPanel[controlPanelActive].classList.add("active");
}
