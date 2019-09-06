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
var ssdp = require('node-ssdp').Client
var parseUri = require('parseuri');
var client = new ssdp();
var http = require('http');
var url = require('url');
var request = require('request');
var devialetDevice = {};


create_http_server();



/**
 * Search Devialet system on network
 */
function searchDevialetSpeaker()
{
	if (devialetDevice.host) {
		console.log('Updating device ...');
	}
	else
		console.log('Trying to detect, please wait ...');

	client.search('urn:schemas-upnp-org:service:RenderingControl:2');
	setTimeout(function() {
  		searchDevialetSpeaker();
	}, config.ssdp_detection_interval);
}


/**
 * Create HTTP server to listen request
 */
function create_http_server() {

	http.createServer(function (req, res) {

	res.writeHead(200, {'Content-Type': 'text/html'});

	var q = url.parse(req.url, true).query;

	
	
	}).listen(config.http_local_port);
}


	searchDevialetSpeaker();