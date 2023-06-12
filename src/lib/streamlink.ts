import { spawn } from "child_process";
import config from "../../config";
// const streamlink = spawn('streamlink', ['https://www.twitch.tv/yourstream', 'best']);

export function Listen(channels: Array<string>) {
	for (const channel of channels) {
		SpawnStreamlink(channel);
	}
}
// uzxxngw4u6nprl6glkxg1pzbrrnkz7
function SpawnStreamlink(username: string) {
	const debugCommand = config.debug ? ["--loglevel", "trace"] : [];

	const options = [
		...debugCommand,
		"--stream-segment-threads",
		"3",
		"--twitch-disable-hosting",
		"--twitch-disable-reruns",
		`twitch.tv/${username}`,
		config.quality,
		"--retry-streams",
		config.refresh,
		"-o",
		config.tempLocation + `${username}.mp4`,
	];

	const listener = spawn("streamlink", options);
	console.log("Listener Spawned for ", username);

	// STDOuts
	listener.stdout.on("data", (stdout) => {
		const data = stdout.toString();
		const logPattern = /\[(.*?)\]\[(.*?)\] (.*)/;
		const message = data.match(logPattern)[3];

		if (config.debug) {
			console.log("DEBUG: ", message);
		}

		if (message.includes("Waiting for streams")) {
			console.log(`Waiting for ${username} stream.....`);
		}

		if (message.includes("Opening stream")) {
			console.log("Starting recording");
		}
	});

	listener.on("error", (error) => {
		console.log(`Streamlink: error: ${error.message}`);
	});

	listener.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
	});
}
