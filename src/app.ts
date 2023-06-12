import Fastify from "fastify";
import { Listen } from "./lib/streamlink";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const server = Fastify({
	logger: true,
});

server.get("/healthcheck", async function () {
	return {
		status: "OK",
	};
});

async function main() {
	try {
		// Start streamlink listener
		Listen(["hannah"]);
		await server.listen({ port: 3000 });
		console.log("Server ready at http://localhost:3000");
	} catch (e) {
		server.log.error(e);
		process.exit(1);
	}
}
main();
