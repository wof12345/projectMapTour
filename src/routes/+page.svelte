<script>
	import 'ol/ol.css';
	import { Map, View } from 'ol';
	import OSM from 'ol/source/OSM';
	import { Tile as TileLayer, Group } from 'ol/layer';
	import { fromLonLat } from 'ol/proj';
	import { onMount } from 'svelte';
	import Nav from '../lib/nav.svelte';
	import Tour from '../lib/tour.svelte';

	let currentNavLinks = [
		{ imgSrc: '', linkName: 'Events' },
		{ imgSrc: '', linkName: 'Events' },
		{ imgSrc: '', linkName: 'Events' },
		{ imgSrc: '', linkName: 'Events' }
	];
	let currentOptions = [
		{ type: 'date', name: 'Date' },
		{ type: 'normal', name: 'Resturants' }
	];
	let currentItemData = [
		{
			imgSrc: 'mime.jpg',
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			likes: 0
		},
		{
			imgSrc: 'mime.jpg',
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			likes: 0
		},
		{
			imgSrc: 'mime.jpg',
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			likes: 0
		},
		{
			imgSrc: 'mime.jpg',
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			likes: 0
		},
		{
			imgSrc: 'mime.jpg',
			price: '343',
			title: 'rand',
			smallDesc: 'asf',
			likes: 0
		}
	];

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

	function invokeViewPage() {}
</script>

<div class="h-screen w-screen overflow-x-hidden">
	<Nav navLinks={currentNavLinks} />

	<div class="h-[650px] w-full flex mt-[92px]">
		<div
			class="main_cont h-full w-2/3  overflow-y-auto shadow-2xl animate-slideFit absolute bg-white z-10"
		>
			<div class="h-screen  w-full  flex flex-col [&>*]:my-3 pl-9 animate-upFit">
				<h1 class="text-xl px-9">{currentItemData.length} Events near you</h1>

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
					{#each currentItemData as item}
						<Tour {item} />
					{/each}
				</div>
			</div>
		</div>

		<div class="h-full w-4/12 absolute  right-0 " id="map" />
	</div>
</div>
