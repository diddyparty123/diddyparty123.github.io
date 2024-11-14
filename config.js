"use strict";
var relayId = Math.floor(Math.random() * 3);

// %%%%%%%%% launch options %%%%%%%%%%%%

window.eaglercraftXOptsHints = {
	hintsVersion: 1,
	container: "game_frame",
	worldsDB: "worlds",
	html5CursorSupport: true,
	allowUpdateDL: true,
	enableMinceraft: false,
	allowServerRedirects: true,
	enableSignatureBadge: true,
	relays: [
		{ addr: "wss://relay.deev.is/", comment: "lax1dude relay #1", primary: relayId === 0 },
		{ addr: "wss://relay.lax1dude.net/", comment: "lax1dude relay #2", primary: relayId === 1 },
		{ addr: "wss://relay.shhnowisnottheti.me/", comment: "ayunami relay #1", primary: relayId === 2 }
	],
	checkRelaysForUpdates: true,
	servers: [
		{ addr: "wss://060k7n46evbu.share.zrok.io/", name: "RPHS - Official Server" },
		{ addr: "wss://mc.arch.lol", name: "ArchMC" },
		{ addr: "wss://clever-teaching.com", name: "Clever Teaching" },
		{ addr: "wss://mc.time-legacy.net/", name: "TimeLegacy" },
		{ addr: "wss://mc.ricenetwork.xyz", name: "Rice Network" },
		{ addr: "wss://colbster937.dev", name: "WebMC OneBlock" },
		{ addr: "wss://mc.lamplifesteal.xyz", name: "LampLifesteal" },
		{ addr: "wss://cbnet.lol", name: "Cheeseburger Network" }
	],
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
