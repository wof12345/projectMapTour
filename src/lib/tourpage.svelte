<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let tour = {};
	export let activePath = '';
	console.log(tour.tourName);

	let saved = {
		state: false,
		sign: '\u2661'
	};
</script>

<div class="bg-white w-full h-full animate-upFit" transition:fade={{ duration: 1600 }}>
	<div class="p-4 bg-white h-52 w-[80%] m-auto">
		<div class="path flex justify-between items-center min-w-[300px]">
			<p class="text-sm font-semibold">
				{activePath} &nbsp;&nbsp; > &nbsp;&nbsp;
				<span class="text-sm text-gray-600">{tour.title}</span>
			</p>

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

		<div class="header_tour_outer flex justify-between items-center">
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
	</div>
</div>
