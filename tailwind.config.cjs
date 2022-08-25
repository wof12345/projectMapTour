const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			keyframes: {
				upFit: {
					'0%': { transform: 'translateY(400px)', opacity: '0' },

					'100%': { transform: 'translateY(0px)', opacity: '1' }
				}
			},
			animation: {
				upFit: 'upFit 1.5s ease-out '
			}
		}
	},

	plugins: []
};

module.exports = config;
