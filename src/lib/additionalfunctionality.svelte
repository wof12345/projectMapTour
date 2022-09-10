<script context="module">
	import { faker } from '@faker-js/faker';
	export function generateData(numberOfMarkers) {
		let markers = [];

		let lat = faker.address.latitude();
		let long = faker.address.longitude();
		console.log(lat, long);
	}
</script>
