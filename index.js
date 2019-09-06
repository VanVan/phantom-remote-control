/**
 * phantom-remote-control
 * HTTP Adapter to remote control Devialet Phantom sound system
 *               (Play, Pause, Volume etc.)
 * 
 * @french Contrôlez les enceintes Devialet via une API HTTP. (Lecture, Pause, Volume etc.)
 * @package phantom-remote-control
 * @author https://github.com/VanVan
 */


const config = require('./config.json');
if (config.debug) {
	const dotenv = require('dotenv');
	dotenv.config();
}
