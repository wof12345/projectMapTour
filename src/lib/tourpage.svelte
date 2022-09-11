<script>
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import Map from '../lib/map.svelte';
	import { onMount } from 'svelte';
	import { addBaseLayers, addMarkerLayer } from '../lib/additionalfunctionality.svelte';

	const dispatch = createEventDispatcher();

	export let tour = {};
	export let activePath = '';
	export let mainMap = 'hidden';
	// console.log('Passed tour', tour);

	let saved = {
		state: false,
		sign: '\u2661'
	};

	function clickListenerDispatcher(msg) {
		dispatch('message', {
			text: msg
		});
	}
	onMount(() => {
		console.log(tour.tourLocation.coordinates);

		const map = new ol.Map({
			target: 'map',
			view: new ol.View({
				center: ol.proj.fromLonLat(tour.tourLocation.coordinates),
				zoom: 12,
				minZoom: 1
			})
		});

		addBaseLayers(map);

		var marker = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat(tour.tourLocation.coordinates)),
			type: tour.tourType,
			name: tour.tourName,
			id: tour.tourId
		});

		addMarkerLayer([marker], map, [tour]);
	});
</script>

<div
	class="transition_custom01 bg-white w-full h-full animate-upFit"
	in:fly={{ duration: 1300 }}
	out:fly={{ y: 400, duration: 1300 }}
>
	<div class="p-4 bg-white h-52 w-[80%] m-auto">
		<div class="path flex justify-between items-center min-w-[300px]">
			<div class="text-sm font-semibold hover:cursor-pointer flex">
				<p class="hover:text-blue-600" on:click={clickListenerDispatcher.bind(this, undefined)}>
					{activePath}
				</p>
				<span class="text-sm text-gray-600">&nbsp;&nbsp; > &nbsp;&nbsp; {tour.title}</span>
			</div>

			<button
				class="save flex justify-center items-center rounded-lg hover:bg-slate-400 hover:opacity-60 hover:text-white text-blue-400 px-2"
				><p class="pr-2 text-[20px]">{saved.sign}</p>
				Save</button
			>
		</div>

		<div
			class="images grid grid-cols-4 grid-rows-2 auto-cols-max gap-2 mt-5 h-64 rounded-lg overflow-hidden relative"
		>
			{#each tour.imgSrc as tourImg, index (tour.tourId + `${index}`)}
				<img
					class="w-full h-full {index === 0 ? ' col-span-2' : ''}
					{index === 0 || index === 2 ? 'row-span-2' : ''} object-cover hover:scale-90 hover:cursor-pointer"
					animate:flip={{ duration: 1000 }}
					src={tourImg}
					alt=""
				/>
			{/each}
			<p class="absolute rounded-xl p-0.5 shadow-sm px-3 left-7 bottom-7 z-11 text-[10px] bg-white">
				{tour.price}
			</p>
		</div>

		<div class="header_tour_outer flex justify-between items-center flex-wrap">
			<div class="header_tour py-7">
				<h2 class="font-bold text-2xl ">{tour.title}</h2>
				<p class="font-extralight text-sm text-gray-400">{tour.tourName}</p>
			</div>

			<div class="flex items-center justify-center p-2 px-3 rounded-3xl shadow-md ">
				<img class="aspect-square w-5 mr-9" src="link.svg" alt="" />
				<a class="text-blue-400 text-sm pb-1" href="http://${tour.tourLink}">{tour.tourLink}</a>
			</div>
		</div>

		<div class="user_does mt-9">
			<h4 class="mb-4 font-bold text-base">{tour.userOppertunity}</h4>
			<div class="doing_desc text-sm">
				{tour.whatUserDoes}
			</div>
		</div>

		<div class="features mt-14">
			<h4 class="mb-9 font-bold text-base">Key features</h4>
			<div class="features flex justify-between items-center px-10 max-w-xl flex-wrap">
				{#each tour.keyFeatures as feature}
					<feature class="flex flex-col items-center">
						<img class="aspect-square w-12 mb-7" src={feature.featureImg} alt="" />
						<p class="text-sm">{feature.featureDesc}</p>
					</feature>
				{/each}
			</div>
		</div>

		<div class="meet_host mt-12">
			<h4 class="mb-9 font-bold text-base">Meet your host</h4>
			<div class="host_desc text-sm relative">
				<div class="bg-black rounded-full absolute aspect-square w-16 left-20 top-0">
					<img src="" alt="" />
				</div>

				<div class="desc [&>*]:my-2 ml-40 ">
					<h5 class="font-bold text-sm">{tour.meetUsersHost.hostName}</h5>
					<p class="text-xs text-gray-500">Host</p>
					<p>{tour.meetUsersHost.hostDesc}</p>
				</div>
			</div>
		</div>

		<Map visible={mainMap} />
	</div>
</div>
