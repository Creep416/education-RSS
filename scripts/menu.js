function replaceMenu(categ)
{
	let j = 0;
	for (var i = 0, top = menuObjs.length; i < top; i++) {
		if (menuObjs[i].category == categ)
		{
			let divBlock;
			if (j<4){
				divBlock = `
				<div onclick="productCard.open(${i})" class="good-container">
					<div class="img" style=" background-image: url(${menuObjs[i].imgSrc});"></div>
					<div class="description">
						<div class="textblock">
							<div class="text s24">${menuObjs[i].name}</div>
							<div class="text s16">${menuObjs[i].description}</div>
						</div>
						<div class="price text s24">$${menuObjs[i].price}</div>
					</div>
				</div>
				`
			} else {
				divBlock = `
				<div onclick="productCard.open(${i})" class="good-container mobile-display-none">
					<div class="img" style=" background-image: url(${menuObjs[i].imgSrc});"></div>
					<div class="description">
						<div class="textblock">
							<div class="text s24">${menuObjs[i].name}</div>
							<div class="text s16">${menuObjs[i].description}</div>
						</div>
						<div class="price text s24">$${menuObjs[i].price}</div>
					</div>
				</div>
				`
			}
			priceListElem.insertAdjacentHTML("beforeend", divBlock);
			j+=1;
		}
	}
}

var buttonsList = ["coffee", "tea", "dessert"];

function menuSwitchTo(argument) {
	const menuList = document.getElementsByClassName('good-container');
	for (var i = menuList.length - 1; i >= 0; i--) {
		menuList[i].remove();
	}
	document.querySelectorAll(".menu-switch > div").forEach(el => el.classList.remove("active"));
	document.querySelector(".menu-switch > div."+buttonsList[argument]).classList.add("active");
	replaceMenu(buttonsList[argument]);
	if (document.querySelectorAll('.price-list > .mobile-display-none').length > 0) {
		document.querySelector(".refresh").classList.remove("display-none");
	} else {
		document.querySelector(".refresh").classList.add("display-none");
	}
}

function refreshButton() {
	const menuList = document.querySelectorAll('.mobile-display-none');
	for (var i = menuList.length - 1; i >= 0; i--) {
		menuList[i].classList.remove("mobile-display-none");
	}
	document.querySelector(".refresh").classList.add("display-none");
}

class ProductCard {
	constructor(){
		this.num = 0;
		this.imgSrc;
		this.name;
		this.desc;
		this.sizeArr;
		this.size = 0;							// Active additives
		this.additivesArr;
		this.additives = [false, false, false]	// List of active additives
		this.priceMain = 0;
		this.priceTotal = 0;

		this.sizeList = [];
	}
	
	open(num){
		this.element;
		this.close();
		this.num = num;
		this.imgSrc = menuObjs[num].imgSrc;
		this.name = menuObjs[num].name;
		this.desc = menuObjs[num].description;
		this.sizeArr = menuObjs[num].sizes;
		this.size = 0;
		this.additivesArr = menuObjs[num].additives
		this.priceMain = Number(menuObjs[num].price)
		this.priceTotal = 0;

		var i = 0;
		for (var index in menuObjs[num].sizes) {
			this.sizeList[i]=index;
			i++;
		}

		this.insert();

		this.element = document.querySelector(".openProductCard");

		this.countTotal()
	}

	setSize(s)	//TOTEST: not tested
	{
		this.size = s;
		this.countTotal();
	}

	toggleAdditive(n)	//TOTEST: not tested
	{
		this.additives[n]= !this.additives[n];
		this.countTotal();
	}

	countTotal()	//TOTEST: not tested
	{
		this.priceTotal = this.priceMain + Number(menuObjs[this.num].sizes[this.sizeList[this.size]]["add-price"]);
		for (var i = this.additivesArr.length - 1; i >= 0; i--) {
			if(this.additives[i])
			{
				this.priceTotal += Number(menuObjs[this.num].additives[i]["add-price"]);
			}
		}
		this.reDraw();
	}

	reDraw(){
		let settings = this.element.querySelectorAll(".order-setting");
		this.element.querySelectorAll(".setting").forEach(sett => sett.classList.remove("active"));
		// setsize
		settings[0].querySelectorAll(".setting")[this.size].classList.add("active");

		let addSet = settings[1].querySelectorAll(".setting")
		for (var i = 2; i >= 0; i--) {
			if (this.additives[i])
				addSet[i].classList.add("active");
		}
		this.element.querySelector(".price > .price").innerHTML = "$" + this.priceTotal.toFixed(2);
		// settings[1].querySelectorAll(".setting")[].classList.add("active");
	}

	insert(){
		let settingBlock = ['',''];
		
		let i = 0;
		for (var index in menuObjs[this.num].sizes){
			settingBlock[0] += `
			<div onclick="productCard.setSize('${i}')" class="setting">
				<div class="letter">
					${index.toUpperCase()}
				</div>
				<div class="volume">${menuObjs[this.num].sizes[index].size}</div>
			</div>
			`
			i++;
		}


		for (var index in menuObjs[this.num].additives){
			settingBlock[1] += `
			<div onclick="productCard.toggleAdditive('${index}')" class="setting">
				<div class="letter">
					${Number(index)+1}
				</div>
				<div class="volume">${menuObjs[this.num].additives[index].name}</div>
			</div>
			`
		}

		let divBlock = 
		`
		<div class="openProductCard text dark">
			<img src="${this.imgSrc}" class="img"></img>
			<div class="desc">
				<div class="description">
					<div class="name text s24">${this.name}</div>
					<div class="description text s16">${this.desc}</div>
				</div>
				<div class="order-setting sizes">
					<div class="text s16">Size</div>
					<div class="settings-block text s16" style="font-weight: 600;">
						${settingBlock[0]}
					</div>
				</div>
				<div class="order-setting aditivies">
					<div class="text s16">Additives</div>
					<div class="settings-block text s16" style="font-weight: 600;">
						${settingBlock[1]}
					</div>
				</div>
				<div class="price text s24">
					<div class="text">Total</div>
					<div class="price">$${this.priceTotal.toFixed(2)}</div>
				</div>
				<div class="info">
					<div class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<g clip-path="url(#clip0_268_9737)">
								<path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
							</g>
							<defs>
								<clipPath id="clip0_268_9737">
								<rect width="16" height="16" fill="white"/>
								</clipPath>
							</defs>
						</svg>
					</div>
					<div class="text s10">
						The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
					</div>
				</div>
				<div onclick="productCard.close()" class="close-button text s16">Close</div>
			</div>
		</div>
		`;

		document.querySelector(".header").insertAdjacentHTML("afterbegin", divBlock);
		document.querySelector(".header").insertAdjacentHTML("afterbegin", "<div onClick='productCard.close()' class='shadowBox'></div>");
	
		document.querySelector(".settings-block > .setting").classList.add("active");
		document.querySelector("body").style.overflowY = "hidden";
	}

	close(){
		// delete others opened product cards
		let toDelete = document.querySelector(".openProductCard")
		if (toDelete != null){
			toDelete.remove();
			document.querySelector(".shadowBox").remove()
			document.querySelector("body").style.overflowY = "inherit";
		}
		this.size = 0;
		this.additives = [false, false, false]
	}
}

var productCard = new ProductCard

var menuElems = document.querySelectorAll(".good-container");
var priceListElem = document.querySelector(".price-list");

var request = new XMLHttpRequest();
request.open("GET", "../json/products.json");
request.responseType = "json";
request.send();

request.onload = function () {
	menuObjs = request.response;
	replaceMenu("coffee");
}