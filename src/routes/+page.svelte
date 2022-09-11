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
	import {
		generateData,
		pointOfInterestGen,
		addBaseLayers,
		addMarkerLayer
	} from '../lib/additionalfunctionality.svelte';

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

	let demoTour = {
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
	};
	let currentItemData = [];

	let catagories = [[], [], [], []];

	let activeCatagory = [];
	let activeHead = '';
	let activeTour = currentItemData[0];
	let tourPageShown = false;
	let widthMain = '100%';
	let loadBarMain = { width: '0', opacity: '0' };

	let mainMap = 'visible';

	let mapLayerLogics = {
		mapRadioValue: ''
	};

	//init calls
	populateCatagories();
	activeCatagory = catagories[0];
	activeHead = 'Events';

	onMount(() => {
		currentItemData = generateData(10);
		let currentMarkerFeatures = pointOfInterestGen(currentItemData);
		populateCatagories();
		activeCatagory = catagories[0];

		const map = new ol.Map({
			target: 'map',
			view: new ol.View({
				center: ol.proj.fromLonLat([21.4225, 39.8262]),
				zoom: 2,
				minZoom: 1
			})
		});

		addBaseLayers(map);

		addMarkerLayer(currentMarkerFeatures, map, currentItemData);
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

	function changeAnimationParam(passedWidth) {
		widthMain = passedWidth;
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
		let eventType = event.detail.text;
		console.log(eventType);

		if (eventType) {
			activeTour = undefined;
			for (let i = 0; i < currentItemData.length; i++) {
				if (currentItemData[i].tourId === eventType) {
					activeTour = currentItemData[i];
					break;
				}
			}

			setTimeout(() => {
				tourPageShown = true;
				changeAnimationParam('100%');
				mainMap = 'hidden';
			}, 300);
		} else {
			tourPageShown = false;
			changeAnimationParam('66.66%');
			mainMap = 'visible';
		}
	}
</script>

<div class="h-screen w-screen overflow-x-hidden">
	<Nav on:message={handleCatagoryChange} navLinks={currentNavLinks} />

	<LoadBar loadBar={loadBarMain} />

	<div class="main_cont h-[650px] w-full flex mt-[92px]">
		<div
			class="transition_custom01 h-full overflow-y-auto shadow-2xl  absolute bg-white z-20"
			style="width:{widthMain};"
		>
			{#if !tourPageShown}
				<div
					class="h-screen  w-full  flex flex-col [&>*]:my-3 pl-9 animate-upFit "
					in:fade={{ duration: 1300 }}
					out:fade={{ duration: 1300 }}
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

					<div class="flex flex-wrap justify-between p-6 px-8 max-w-[720px] h-">
						{#each activeCatagory as item}
							<Tour on:message={invokeViewPage} {item} type={'map'} />
						{/each}
					</div>
				</div>
			{:else}
				<Tourpage
					on:message={invokeViewPage}
					activePath={activeHead}
					tour={activeTour}
					mainMap={'visible relative h-80 w-2/3 m-auto mt-20'}
				/>
			{/if}
		</div>

		<Mapoptions options={mapOptions} />

		<Tour on:message={invokeViewPage} item={demoTour} type={'map'} />

		<Map visible={mainMap} />
	</div>
</div>
