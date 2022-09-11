<script context="module">
	import 'ol/css';
	import { faker } from '@faker-js/faker';
	import { GENERATERANDOMNUMBER } from '../lib/necessary_functions';

	export function generateData(numberOfData, definedColl) {
		let data = [];

		for (let i = 0; i < numberOfData; i++) {
			let lat = +faker.address.latitude(20, -20);
			let long = +faker.address.longitude(20, -20);
			let country = faker.address.country();
			// console.log(lat, long);

			let referenceData = {
				tourId: `#${i}tourDetails`,
				tourType: GENERATERANDOMNUMBER([], 0, 2, 'integer') === 0 ? 'Event' : 'Food',
				tourName: `${country} ${faker.lorem.sentence()}`,
				tourDate: `${GENERATERANDOMNUMBER([], 1, 32, 'integer')}/${GENERATERANDOMNUMBER(
					[],
					1,
					12,
					'integer'
				)}/${GENERATERANDOMNUMBER([], 2000, 2023, 'integer')}`,
				tourLocation: {
					coordinates: [lat, long],
					string: [`${country}`]
				},
				imgSrc: ['mime.jpg', 'mime.jpg', 'mime.jpg', 'mime.jpg'],
				price: '$' + GENERATERANDOMNUMBER([], 100, 5000, 'integer'),
				title: `${country}`,
				smallDesc: faker.lorem.lines(1),
				userOppertunity: "What you'll do",
				whatUserDoes: faker.lorem.lines(10),
				keyFeatures: [
					{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' },
					{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' },
					{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' },
					{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' }
				],
				meetUsersHost: {
					hostImg: 'mime.jpg',
					hostName: faker.name.fullName(),
					hostDesc: faker.lorem.lines()
				},
				likes: 0,
				tourLink: `www.${country}.com`
			};

			data.push(referenceData);
		}

		return data;
	}

	export function pointOfInterestGen(data) {
		let markers = [];

		for (let i = 0; i < data.length; i++) {
			// console.log(data[i].tourLocation.coordinates);
			var marker = new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat(data[i].tourLocation.coordinates)),
				type: data[i].tourType,
				name: data[i].tourName,
				id: data[i].tourId
			});

			markers.push(marker);
		}

		return markers;
	}

	export function addBaseLayers(mapRef) {
		const stamenTerrain = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: `https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg`,
				attributions: 'Map tiles by Stamen'
			}),
			visible: false,
			title: 'StamenTerrain'
		});

		const openSM = new ol.layer.Tile({
			source: new ol.source.OSM(),
			visible: true,
			title: 'OpenSM'
		});

		const baseLayerGroup = new ol.layer.Group({
			layers: [openSM, stamenTerrain]
		});

		mapRef.addLayer(baseLayerGroup);

		let radioBtns = document.querySelectorAll(`.mr_1`);
		radioBtns.forEach((elm) => {
			elm.addEventListener('change', (e) => {
				let curValue = elm.value;

				baseLayerGroup.getLayers().forEach((element, index, arr) => {
					let baseTitleLayer = element.get('title');
					if (baseTitleLayer === curValue) {
						element.values_.visible = true;
					} else element.values_.visible = false;
				});
			});
		});
	}

	export function addMarkerLayer(markers, mapRef, currentItemData) {
		var markerCommonStyle = new ol.style.Style({
			image: new ol.style.Circle({
				radius: 10,
				fill: new ol.style.Fill({
					color: 'white'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(0,0,0,1)',
					width: 1
				})
			})
		});

		var markerLayer = new ol.layer.Vector({
			title: 'POI',
			source: new ol.source.Vector({
				features: markers
			}),
			style: markerCommonStyle
		});

		mapRef.addLayer(markerLayer);

		let overlay = document.querySelector(`.map`);

		const overlayLayer = new ol.Overlay({
			element: overlay
		});

		mapRef.addOverlay(overlayLayer);

		const overlayDetails = overlay.querySelectorAll(`.map_att`);

		mapRef.on('click', (e) => {
			overlayLayer.setPosition(undefined);
			mapRef.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
				let coordinate = e.coordinate;
				let featureId = feature.get('id');

				let clickedItem = '';

				for (let i = 0; i < currentItemData.length; i++) {
					if (currentItemData[i].tourId === featureId) {
						clickedItem = currentItemData[i];
						break;
					}
				}

				overlayDetails.forEach((elm, ind) => {
					let elmValue = function () {
						if (ind === 0) return clickedItem.imgSrc[0];
						if (ind === 1) return clickedItem.title;
						if (ind === 2) return clickedItem.smallDesc;
						if (ind === 3) return clickedItem.price;
					};

					elm.innerHTML = elmValue();
				});

				console.log(coordinate, clickedItem);
				overlayLayer.setPosition(coordinate);
			});
		});
	}
</script>
