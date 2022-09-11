<script>
	import { createEventDispatcher } from 'svelte';
	import { fly, fade, slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	let liked = {
		state: false,
		sign: '\u2661'
	};

	export let item = {};
	export let type = '';

	// console.log(type);

	function clickListenerDispatcher(itemID) {
		dispatch('message', {
			text: itemID
		});
	}

	function likedSwitch() {
		if (!liked.state) {
			liked.state = true;
			liked.sign = '\u2665';
			console.log(liked.sign);
			return;
		}

		liked.state = false;
		liked.sign = '\u2661';
	}
</script>

<div
	class="{type} h-max w-72 [&>*]:my-1 hover:bg-slate-300 p-2 hover:cursor-pointer rounded-lg relative bg-white"
	id={item.tourId}
	transition:fade={{ duration: 700 }}
>
	<img class="map_att max-h-36 w-full rounded-xl" src={item.imgSrc[0]} alt="" />
	<p
		class="absolute text-white text-3xl h-7 top-5 right-7 w-7 hover:bg-gray-500 hover:bg-opacity-60 p-1 rounded-full flex items-center"
		on:click={likedSwitch}
	>
		{liked.sign}
	</p>

	<h2
		class="map_att text-xl font-semibold px-3  hover:text-blue-600"
		on:click={clickListenerDispatcher.bind(this, item.tourId)}
	>
		{item.title}
	</h2>
	<p class="map_att text-sm text-gray-400 px-3">{item.smallDesc}</p>
	<p
		class="map_att absolute rounded-xl p-0.5 shadow-sm px-3 left-4 top-28 z-11 text-[10px] bg-white"
	>
		{item.price}
	</p>
</div>
