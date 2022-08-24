<script>
	import 'ol/ol.css';
	import { Map, View } from 'ol';
	import OSM from 'ol/source/OSM';
	import { Tile as TileLayer, Group } from 'ol/layer';
	import { fromLonLat } from 'ol/proj';
	import { onMount } from 'svelte';
	import Nav from '../lib/nav.svelte';
	import Tour from '../lib/tour.svelte';
	import TourPage from '../lib/tourpage.svelte';
	import Tourpage from '../lib/tourpage.svelte';

	let currentNavLinks = [
		{ imgSrc: '', linkName: 'Events' },
		{ imgSrc: '', linkName: 'Foods' },
		{ imgSrc: '', linkName: 'Offers' },
		{ imgSrc: '', linkName: 'Services' }
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
			imgSrc: ['mime.jpg', 'mime.jpg'],
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			whatUserDoes: 'lorem',
			keyFeatures: [{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' }],
			meetUsersHost: {
				hostImg: '',
				hostName: '',
				hostDesc: ''
			},
			likes: 0
		},
		{
			tourId: '#001tourDetails',
			tourType: 'Event',
			tourName: 'France',
			tourDate: '',
			tourLocation: {
				coordinates: [],
				string: []
			},
			imgSrc: ['mime.jpg', 'mime.jpg'],
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			whatUserDoes: 'lorem',
			keyFeatures: [{ featureName: 'feature1', featureImg: 'mime.jpg', featureDesc: 'lorem' }],
			meetUsersHost: {
				hostImg: '',
				hostName: '',
				hostDesc: ''
			},
			likes: 0
		}
	];

	let catagories = [[], [], [], []];

	let activeCatagory = [];
	let activeHead = '';
	let activeTour = currentItemData[0];
	let tourPageShown = false;
	let animationParamLoadTop = 'fitFull';
	let animationParamLoadMain = 'slideFit';

	onMount(() => {
		const map = new Map({
			layers: [
				new Group({
					layers: [
						new TileLayer({
							source: new OSM()
						})
					]
				})
			],
			target: 'map',
			view: new View({
				center: fromLonLat([45, 43.2951]),
				zoom: 11
			})
		});
		const source = OSM();
		map.setView(
			new View({
				center: [0, 0],
				zoom: 11
			})
		);
		const cusLayer = new TileLayer({ source: source });
		map.addLayer(cusLayer);
	});

	function changeAnimationParam() {
		animationParamLoadTop = 'fitFull';
		animationParamLoadMain = 'fitFull';
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
		animationParamLoadTop = '';
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
	<div class="w-screen h-0.5  absolute  mt-[92px] z-30 ">
		{#if animationParamLoadTop === 'fitFull'}
			<div class="w-full opacity-0  h-full bg-blue-400 animate-{animationParamLoadTop}">1</div>
		{/if}
	</div>

	<div class="h-[650px] w-full flex mt-[92px]">
		<div
			class="main_cont h-full w-2/3  overflow-y-auto shadow-2xl animate-{animationParamLoadMain} absolute bg-white z-10"
		>
			<div class="h-screen  w-full  flex flex-col [&>*]:my-3 pl-9 animate-upFit">
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
		</div>

		<div class="h-full w-2/6 absolute  right-0 " id="map" />
	</div>

	{#if tourPageShown}
		<Tourpage tour={activeTour} />
	{/if}
</div>
