// eslint-disable-next-line no-undef
module.exports = {
	apps: [
		{
			name: "Arkiv-Listener",
			script: "npm",
			args: "run start",
		},
	],

	deploy: {
		production: {
			user: "vadim",
			host: "107.189.2.120",
			ref: "origin/master",
			repo: "git@github.com:VadimAlexeev0/arkiv-backend.git",
			path: "/arkiv-listener",
			"pre-deploy-local": "git fetch origin main",
			"post-deploy":
				//"npm install && pm2 reload ecosystem.config.js --env production",
				"npm install && pm2 restart ecosystem.config.js --env production",
		},
	},
};
