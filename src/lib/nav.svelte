<script>
	export let navLinks = [];
</script>

<nav class="flex items-center justify-between p-6 pl-8 pr-8 shadow-md fixed z-20 w-screen bg-white">
	<logo>
		<img src="" alt="" />
		<p>Waive</p>
	</logo>

	<navLinks class="w-max flex items-center justify-between">
		{#each navLinks as link}
			<button class="p-5 pt-2 pb-2">
				<img src={link.imgSrc} alt="" />
				<p>{link.linkName}</p>
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
