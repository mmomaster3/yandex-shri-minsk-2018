(function(root){
	var main = {};

	function getArrFromJSON(callback){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myArr = JSON.parse(this.responseText);
				callback.call(myArr);
			}	
		};
		xmlhttp.open("GET", "cities.json", true);
		xmlhttp.send();
	}

	getArrFromJSON(function(){
		main.citiesArr = this;
		document.querySelector('#enter').addEventListener('click', function(){
			main.play(main.citiesArr)
		});
		printAllCities(main.citiesArr);
	});
	function printAllCities(citiesArr){
		for (var i = 0; i < citiesArr.length; i++) {
			element('p', citiesArr[i], '.all-cities');
		}
	}

	function element(type, text, selector){
		var currEl = document.createElement(type);
		currEl.innerHTML = text;
		document.querySelector(selector).appendChild(currEl);
	}


	Array.prototype.equals = function(array) {
		if (this.length != array.length) {
			return false;
		}
		for (var i = 0; i < this.length; i++) {
			if (this[i] != array[i]) {
				return false
			}
		}
		return true;
	};

	main.responses = []
	main.play = function(citiesArr, cInputVal){
		var cInputVal = cInputVal || document.querySelector('.city-input').value.trim();
		cInputVal = cInputVal.toUpperCase();
		function getRespLastCh(){
			if (main.responses.length != 0) {
				var lastCh = main.responses[main.responses.length-1].slice(-1);
				var deleLastCh = (lastCh == 'ь' || lastCh == 'ъ') ?
				main.responses[main.responses.length-1].slice(-2, -1) :
				lastCh;
				return deleLastCh.toUpperCase()
			}
		}

		function noChanceToWin(letter){
			function getSelectedCitites(array){
				return array.filter(function(curr){
					if (letter.toUpperCase() == curr.slice(0,1).toUpperCase()) {
						return curr;
					}
				})
			}
			var selectedAllCities = getSelectedCitites(citiesArr);
			var selectedRespCitites = getSelectedCitites(main.responses);

			return selectedRespCitites.equals(selectedAllCities) == true ? true : false;
		}

		function printResponses(el, isHuman, callback){
			element('p', el, '.responses');
			main.responses.push(el);
			callback(el, isHuman);
		}

		if (cInputVal == 0) {alert('Введите что-нибудь'); return 0;}

		for (var i = 0; i < citiesArr.length; i++) {
			if (cInputVal === citiesArr[i].toUpperCase()) { 
				for (var j = 0; j < main.responses.length; j++) {
					if (cInputVal === main.responses[j].toUpperCase()) {
						alert('Этот город уже был')
						return 0
					}
				}
				if (main.responses.length == 0 || cInputVal.slice(0,1) === getRespLastCh()) {
					printResponses(citiesArr[i], true, markCity)
					var robAnsw = citiesArr.find(function(x){
						if (x.slice(0,1).toUpperCase() == getRespLastCh()){
							if (main.responses.indexOf(x) == -1) {
								return x;

							}	
						}
					})
					if (robAnsw === undefined) {
						if (confirm('Человек выйграл! перезагрузить страницу?') === true){
							location.reload() 
						}
						return 0;
					}
					printResponses(robAnsw, false, markCity)
					if (noChanceToWin(getRespLastCh())) {
						if (confirm('Компьютер выйграл! перезагрузить страницу?') === true){
							location.reload() 
						}
					}
					return 0
				}
				else{
					alert('Неправильно');
					return 0;
				}
			}
		}
		alert('Такой город не найден!'); 
	}

	var markCity;
	ymaps.ready(init);
	var map;
	function init(){
		map = new ymaps.Map("map",{
			center: [53.8, 27.5],
			zoom:2,
			behaviors: ['default', 'scrollZoom']
		});

		markCity = function(city, isHuman){
			ymaps.geocode(city, {results: 1 })
			.then(function(res){			
				var currGeoObjects = res.geoObjects.get(0);
				if (currGeoObjects == null) {
					alert(city + ' не найден на карте!')
					return 0;
				}
				var coords = currGeoObjects.geometry.getCoordinates();
				var wrap;
				if(isHuman == true){
					wrap = 'twirl#greenStretchyIcon'
				}else{
					wrap = 'twirl#redStretchyIcon'
				}
				console.log(coords)
				map.geoObjects.add(
					new ymaps.Placemark(coords,
						{iconContent: city},
						{preset: wrap}
						)
					);
			}, function(err){
				console.log(err)
			})
		}
	}

	root.MAIN = main;
	root.MAIN.getArrFromJSON = getArrFromJSON;
})(this);