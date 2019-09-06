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
var MediaRendererClient = require('upnp-mediarenderer-client');
var clientMedia=null;
var devialetDevice = {};


create_http_server();

client.on('response', function inResponse(headers, code, rinfo) {
	console.log('Detected device ip: '+rinfo.address);
	if (typeof headers.LOCATION != 'undefined' && headers.LOCATION) { // Download file
		var http_options = {
			hostname: parseUri(headers.LOCATION).host,
			port: parseUri(headers.LOCATION).port,
			path: parseUri(headers.LOCATION).path,
			method: 'GET'
		  }
		  
		  var req = http.request(http_options, (res) => {
			res.setEncoding('utf8');
  
			res.on('data', (data) => {
			  if (data.includes('Devialet UPnP Renderer')) {
				clientMedia = new MediaRendererClient(headers.LOCATION);
				devialetDevice.host = parseUri(headers.LOCATION).host;
				devialetDevice.port = parseUri(headers.LOCATION).port;
				console.log("Devialet found : "+devialetDevice.host+":"+devialetDevice.port);
			  }
			});
		  });
		   
		  req.on('error', (e) => {
			console.log(`get Location xml problem with request: ${e.message}`);
		  });
		  
		  req.end();
	}
	if(rinfo.address == config.devialet_ipaddress) {
		devialetDevice.host = parseUri(headers.LOCATION).host;
		devialetDevice.port = parseUri(headers.LOCATION).port;
	}
		
});



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



console.log("Searching for Devialet Phantom or Dialog ...");
console.log("This may take several minutes");

//On force
if (config.devialet_port && config.devialet_ipaddress && config.devialet_port != 'autodetect' && config.devialet_ipaddress != 'autodetect') {
	devialetDevice.host = config.devialet_ipaddress;
	devialetDevice.port = config.devialet_port;
	console.log('Detection forced from config file to be '+config.devialet_ipaddress+':'+config.devialet_port+' -> Only set volume usable');
}
else if (config.devialet_device_description_xml && config.devialet_device_description_xml != 'autodetect') {
	clientMedia = new MediaRendererClient(config.devialet_device_description_xml);
	devialetDevice.host = parseUri(config.devialet_device_description_xml).host;
	devialetDevice.port = parseUri(config.devialet_device_description_xml).port;
	console.log('Detection forced from config device description to be '+devialetDevice.host+':'+devialetDevice.port);
}
else
	searchDevialetSpeaker();