const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			width: {
				129: '280px'
			},
			keyframes: {
				slideFit: {
					'0%': { width: '100%' },

					'100%': { width: '66.66%' }
				},
				upFit: {
					'0%': { transform: 'translateY(400px)', opacity: '0	' },

					'100%': { transform: 'translateY(0px)', opacity: '1' }
				}
			},
			animation: {
				slideFit: 'slideFit 1.5s ease-out ',
				upFit: 'upFit 1.5s ease-out '
			}
		}
	},

	plugins: []
};

module.exports = config;
