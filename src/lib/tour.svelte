<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let item = {};

	function inputListener(itemID) {
		dispatch('message', {
			text: itemID
		});
	}
</script>

<div
	class="h-max w-72 [&>*]:my-1 hover:bg-slate-300 p-2 hover:cursor-pointer transition ease-in-out delay-75 rounded-lg relative"
>
	<img class="max-h-36 w-full rounded-lg" src={item.imgSrc} alt="" />
	<img class="absolute bg-black aspect-square top-7 right-7 w-5" src="" alt="" />

	<h2 class="text-xl font-semibold px-3  hover:text-blue-600">{item.title}</h2>
	<p class="text-sm text-gray-400 px-3">{item.smallDesc}</p>
	<p class="absolute rounded-xl p-0.5 shadow-sm px-3 left-4 top-1/2 z-10 text-[10px] bg-white">
		{item.price}
	</p>
</div>
