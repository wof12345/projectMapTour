<script>
	export let options;
	export let userSelected = options[0].value;
</script>

<div class="map_controls rounded-md absolute z-10 w-max h-max p-2 bg-white right-0 top-52">
	{#each options as option, ind}
		<div class="radio_cont">
			<input
				class="mr_1 mr-1 mt-1"
				type="radio"
				name="layerRadio"
				value={option.value}
				bind:group={userSelected}
			/><label for="layerRadio">{option.title}</label>
		</div>
	{/each}
</div>
