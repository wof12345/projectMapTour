<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let navLinks = [];

	let activeID = 0;

	function clickListenerDispatcher(itemID) {
		activeID = itemID;
		let header = '';
		if (itemID === 0) {
			header = 'Events';
		} else if (itemID === 1) {
			header = 'Foods';
		} else if (itemID === 2) {
			header = 'Offers';
		} else {
			header = 'Services';
		}
		dispatch('message', {
			text: itemID,
			head: header
		});
	}
</script>

<nav class="flex items-center justify-between p-6 pl-8 pr-8 shadow-md fixed z-30 w-screen bg-white">
	<logo class="flex items-center">
		<img class="head_image" src="logo.svg" alt="" />
		<p class="font-bold">Waive</p>
	</logo>

	<navLinks class="w-max flex items-center justify-between">
		{#each navLinks as link, index}
			<button
				class="p-5 pt-2 pb-2 flex items-center {activeID === index ? 'text-blue-500' : ''}"
				on:click={clickListenerDispatcher.bind(this, index)}
			>
				<img class="head_image" src={link.imgSrc} alt="" />
				<p class="text-sm">{link.linkName}</p>
			</button>
		{/each}
	</navLinks>

	<userpart class="flex items-center">
		<language>
			<select name="" id="">
				<option value="en">En</option>
				<option value="ru">Ru</option>
			</select>
		</language>

		<div class="bg-black rounded-full aspect-square w-11 ml-2">
			<img src="" alt="" />
		</div>
	</userpart>
</nav>
