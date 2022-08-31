<script>
	import 'ol/css';
	import { onMount } from 'svelte';
	import Nav from '../lib/nav.svelte';
	import Tour from '../lib/tour.svelte';
	import Tourpage from '../lib/tourpage.svelte';
	import LoadBar from '../lib/loadbar.svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import Map from '../lib/map.svelte';
	import Mapoptions from '../lib/mapoptions.svelte';

	let mapOptions = [
		{ title: 'OpenSM', value: 'OpenSM' },
		{ title: 'StamenTerrain', value: 'StamenTerrain' }
	];

	let currentNavLinks = [
		{ imgSrc: 'calendar.svg', linkName: 'Events' },
		{ imgSrc: 'food.svg', linkName: 'Foods' },
		{ imgSrc: 'offer.svg', linkName: 'Offers' },
		{ imgSrc: 'settings.svg', linkName: 'Services' }
	];

	let currentOptions = [
		{ type: 'date', name: 'Date' },
		{ type: 'normal', name: 'Resturants' }
	];

	let currentItemData = [
		{
			tourId: '#001tourDetails',
			tourType: 'Event',
			tourName: 'France',
			tourDate: '',
			tourLocation: {
				coordinates: [],
				string: []
			},
			imgSrc: ['mime.jpg', 'mime.jpg', 'mime.jpg', 'mime.jpg'],
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			userOppertunity: "What you'll do",
			whatUserDoes: 'lorem',
			keyFeatures: [
				{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' },
				{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' },
				{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' },
				{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' }
			],
			meetUsersHost: {
				hostImg: 'mime.jpg',
				hostName: 'Alenka kutros',
				hostDesc: 'Hello lorem'
			},
			likes: 0,
			tourLink: 'www.rand.com'
		},
		{
			tourId: '#002tourDetails',
			tourType: 'Event',
			tourName: 'France',
			tourDate: '',
			tourLocation: {
				coordinates: [],
				string: []
			},
			imgSrc: ['mime.jpg', 'mime.jpg', 'mime.jpg', 'mime.jpg'],
			price: '343',
			title: 'The Darkest Secrets of Paris',
			smallDesc: 'asf',
			userOppertunity: "What you'll do",
			whatUserDoes: 'lorem',
			keyFeatures: [{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' }],
			meetUsersHost: {
				hostImg: '',
				hostName: '',
				hostDesc: ''
			},
			likes: 0,
			tourLink: `www.thedarkestparis.com`
		}
	];

	let catagories = [[], [], [], []];

	let activeCatagory = [];
	let activeHead = '';
	let activeTour = currentItemData[0];
	let tourPageShown = false;
	let widthMain = '100%';
	let loadBarMain = { width: '0', opacity: '0' };

	let mapLayerLogics = {
		mapRadioValue: ''
	};

	onMount(() => {
		const iconFeature = new ol.Feature({
			geometry: new ol.geom.Point([261349.18986250658, 6250072.354477512]), //This marker will not move.
			name: 'Somewhere'
		});

		const map = new ol.Map({
			target: 'map',
			// layers: [
			// 	new ol.layer.Tile({
			// 		source: new ol.source.OSM()
			// 	}),
			// 	new ol.layer.Vector({
			// 		source: new ol.source.Vector({
			// 			features: [iconFeature]
			// 		}),
			// 		style: new ol.style.Style({
			// 			image: new ol.style.Icon({
			// 				anchor: [2.349014, 48.864716],
			// 				anchorXUnits: 'fraction',
			// 				anchorYUnits: 'pixels',
			// 				src: 'mappin.svg'
			// 			})
			// 		})
			// 	})
			// ],
			view: new ol.View({
				center: ol.proj.fromLonLat([2.349014, 48.864716]),
				zoom: 12,
				minZoom: 4
			})
		});

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
		// map.addLayer(stamenTerrain);	https://tile.openstreetmap.org/${z}/${x}/${y}.png

		const baseLayerGroup = new ol.layer.Group({
			layers: [openSM, stamenTerrain]
		});

		map.addLayer(baseLayerGroup);

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

		map.on('click', (e) => {
			console.log(e.coordinate);
		});
	});

	animation01Start('66.66%');

	function animation01Start(passedWidth) {
		loadBarMain.opacity = '0';

		setTimeout(() => {
			widthMain = passedWidth;
			loadBarMain.width = '100%';
			loadBarMain.opacity = '1';
			// console.log(widthMain);
		}, 200);

		setTimeout(() => {
			loadBarMain.opacity = '0';
		}, 1000);

		setTimeout(() => {
			loadBarMain.width = '0';
		}, 1600);
	}

	function changeAnimationParam() {
		widthMain = '100%';
		animation01Start(widthMain);
	}

	function populateCatagories() {
		currentItemData.forEach((elm) => {
			if (elm.tourType === 'Event') {
				catagories[0].push(elm);
			} else if (elm.tourType === 'Food') {
				catagories[1].push(elm);
			} else if (elm.tourType === 'Offer') {
				catagories[2].push(elm);
			} else catagories[3].push(elm);
		});
	}

	function handleCatagoryChange(event) {
		let activeID = event.detail.text;

		activeCatagory = catagories[activeID];
		activeHead = event.detail.head;
	}

	function invokeViewPage(event) {
		console.log(event.detail.text);
		setTimeout(() => {
			tourPageShown = true;
			changeAnimationParam();
		}, 300);
	}

	//init calls
	populateCatagories();
	activeCatagory = catagories[0];
	activeHead = 'Events';
</script>

<div class="h-screen w-screen overflow-x-hidden">
	<Nav on:message={handleCatagoryChange} navLinks={currentNavLinks} />

	<LoadBar loadBar={loadBarMain} />

	<div class="h-[650px] w-full flex mt-[92px]">
		<div
			class="transition_custom01 h-full overflow-y-auto shadow-2xl  absolute bg-white z-20"
			style="width:{widthMain};"
		>
			{#if !tourPageShown}
				<div
					class="h-screen  w-full  flex flex-col [&>*]:my-3 pl-9 animate-upFit "
					transition:fade={{ duration: 1300 }}
				>
					<h1 class="text-xl px-9">{activeCatagory.length} {activeHead} near you</h1>

					<div class="flex flex-wrap px-9">
						{#each currentOptions as option}
							{#if option.type === 'selective'}
								<select class="option-common" name="option" id={option.name}>
									{#each option.options as options}
										<option value={options}>options</option>
									{/each}
								</select>
							{:else if option.type === 'date'}
								<input class="option-common" type="date" placeholder={option.name} />
							{:else}
								<div class="option-common">{option.name}</div>
							{/if}
						{/each}
					</div>

					<div class="flex flex-wrap justify-between p-6 px-8 max-w-[720px]">
						{#each activeCatagory as item}
							<Tour on:message={invokeViewPage} {item} />
						{/each}
					</div>
				</div>
			{:else}
				<Tourpage activePath={activeHead} tour={activeTour} />
			{/if}
		</div>

		<Mapoptions options={mapOptions} />

		<Map />
	</div>
</div>
