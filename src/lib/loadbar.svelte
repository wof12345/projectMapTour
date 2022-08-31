<script>
	export let loadBar = { width: '0', opacity: '0' };
</script>

<div class="w-screen h-0.5 fixed top-[92px] z-30 ">
	<div
		class="transition_custom01 h-full bg-blue-600 "
		style="width:{loadBar.width}; opacity:{loadBar.opacity}"
	/>
</div>
