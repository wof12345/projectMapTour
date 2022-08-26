const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			keyframes: {
				upFit: {
					'0%': { transform: 'translateY(400px)', opacity: '0' },

					'100%': { transform: 'translateY(0px)', opacity: '1' }
				},
				downFit: {
					'0%': { transform: 'translateY(0px)', opacity: '1' },

					'100%': { transform: 'translateY(100%)', opacity: '0' }
				}
			},
			animation: {
				upFit: 'upFit 1.5s ease-out ',
				downFit: 'upFit 1.5s ease-out '
			}
		}
	},

	plugins: []
};

module.exports = config;
