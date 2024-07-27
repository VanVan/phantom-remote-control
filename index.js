/**
 * phantom-remote-control
 * HTTP Adapter to remote control Devialet Phantom sound system
 *               (Play, Pause, Volume etc.)
 *
 * @french Contrôlez les enceintes Devialet via une API HTTP. (Lecture, Pause, Volume etc.)
 * @package phantom-remote-control
 * @author https://github.com/VanVan
 */

const config = require("./config.json");
if (config.debug) {
  const dotenv = require("dotenv");
  dotenv.config();
}
var ssdp = require("node-ssdp").Client;
var parseUri = require("parseuri");
var client = new ssdp();
var http = require("http");
var url = require("url");
var request = require("request");
var MediaRendererClient = require("upnp-mediarenderer-client");
var clientMedia = null;
var devialetDevice = {};

list_local_address();
create_http_server();

client.on("response", function inResponse(headers, code, rinfo) {
  console.log("Detected device ip: " + rinfo.address);
  if (typeof headers.LOCATION != "undefined" && headers.LOCATION) {
    // Download file
    var http_options = {
      hostname: parseUri(headers.LOCATION).host,
      port: parseUri(headers.LOCATION).port,
      path: parseUri(headers.LOCATION).path,
      method: "GET",
    };

    var req = http.request(http_options, (res) => {
      res.setEncoding("utf8");

      res.on("data", (data) => {
        if (
          data.includes("Devialet UPnP Renderer") ||
          data.includes("Phantom")
        ) {
          clientMedia = new MediaRendererClient(headers.LOCATION);
          devialetDevice.host = parseUri(headers.LOCATION).host;
          devialetDevice.port = parseUri(headers.LOCATION).port;
          console.log(
            "Devialet found : " +
              devialetDevice.host +
              ":" +
              devialetDevice.port
          );
        }
      });
    });

    req.on("error", (e) => {
      console.log(`get Location xml problem with request: ${e.message}`);
    });

    req.end();
  }
  if (rinfo.address == config.devialet_ipaddress) {
    devialetDevice.host = parseUri(headers.LOCATION).host;
    devialetDevice.port = parseUri(headers.LOCATION).port;
  }
});

/**
 * Set volume of Devialet speaker
 * @param {int} volumeLevel
 * @returns {Promise<number>} Returns new volume level
 */
function setVolume(volumeLevel) {
  return new Promise(function (resolve, reject) {
    var payloadToSend = JSON.stringify({ volume: volumeLevel });
    var http_options = {
      hostname: devialetDevice.host,
      port: 80,
      // port: devialetDevice.port, // port for the API is now always 80
      path: "/ipcontrol/v1/systems/current/sources/current/soundControl/volume",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payloadToSend),
      },
    };

    var req = http.request(http_options, (res) => {
      res.setEncoding("utf8");
      var data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log(" -> Success");
          resolve(volumeLevel);
        } else {
          console.log(" -> Error: volume unchanged");
          reject(volumeLevel);
        }
      });
    });

    req.on("error", (e) => {
      console.log(` -> Error, volume cannot be set: ${e.message}`);
      reject(volumeLevel);
    });

    req.write(payloadToSend);
    req.end();

    process.stdout.write("Trying to set Volume to " + volumeLevel + "%\n");
  });
}

/**
 * Get Volume of Devialet Speaker
 * @returns {Promise<number>} Returns current volume level
 */
function getVolume() {
  return new Promise(function (resolve, reject) {
    var http_options = {
      hostname: devialetDevice.host,
      port: 80,
      // port: devialetDevice.port, // port for the API is now always 80
      path: "/ipcontrol/v1/systems/current/sources/current/soundControl/volume",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    var req = http.request(http_options, (res) => {
      let data = "";
      res.setEncoding("utf8");

      res.on("data", (incomingData) => {
        data += incomingData;
      });

      res.on("end", () => {
        const volume = JSON.parse(data).volume;
        resolve(volume);
      });
    });

    req.on("error", (e) => {
      console.log(`Volume cannot be retrieved: ${e.message}`);
      reject(e);
    });
    req.end();

    process.stdout.write("Trying to get Volume...\n");
  });
}

/**
 * Search Devialet system on network
 */
function searchDevialetSpeaker() {
  if (devialetDevice.host) {
    console.log("Updating device ...");
  } else console.log("Trying to detect, please wait ...");

  client.search("urn:schemas-upnp-org:service:RenderingControl:2");
  setTimeout(function () {
    searchDevialetSpeaker();
  }, config.ssdp_detection_interval);
}

/**
 * List local ip address
 */
function list_local_address() {
  console.log();
  var os = require("os");
  var ifaces = os.networkInterfaces();
  console.log("You can open your browser on:");
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) return;
      console.log("http://" + iface.address + ":" + config.http_local_port);
    });
  });
  console.log();
}

/**
 * Create HTTP server to listen request
 */
function create_http_server() {
  http
    .createServer(function (req, res) {
      res.writeHead(200, { "Content-Type": "text/html" });

      var q = url.parse(req.url, true).query;

      if (!devialetDevice.host)
        return res.end(
          "<h2>Devialet not found</h2><h5>Please wait ...<h5>" +
            '<META http-equiv="refresh" content="10; URL="><style>body{text-align: center}.lds-dual-ring{display:inline-block;width:64px;height:64px;} .lds-dual-ring:after{content:" ";display:block;width:46px;height:46px;margin:1px;border-radius:50%;border:5px solid #fff;border-color:#888 transparent #888 transparent;animation:lds-dual-ring 1.2s linear infinite;} @keyframes lds-dual-ring{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style><div class="lds-dual-ring"></div>'
        );

      if (q.setVolume && parseInt(q.setVolume, 10) >= 0) {
        setVolume(parseInt(q.setVolume)).then(
          function () {
            res.end("<h5>Volume successfully set to " + volumeLevel + "%</h5>");
          },
          function (volumeLevel) {
            res.end(
              '<p style="color:red;">Error, cannot set volume to ' +
                volumeLevel +
                "%</p>"
            );
          }
        );
      } else if (q.setVolume == "up") {
        getVolume()
          .then(function (volume) {
            volume =
              volume + config.volume_step > 100
                ? 100
                : volume + config.volume_step;
            return volume;
          })
          .then(setVolume)
          .then(
            function (volumeLevel) {
              res.end(
                "<h5>Volume successfully set to " + volumeLevel + "%</h5>"
              );
            },
            function (volumeLevel) {
              res.end(
                '<p style="color:red;">Error, cannot set volume to ' +
                  volumeLevel +
                  "%</p>"
              );
            }
          )
          .catch(function (err) {
            res.end(
              '<p style="color:red;">Error, unable to get current volume:' +
                JSON.stringify(err, null, 2) +
                "</p>"
            );
          });
      } else if (q.setVolume == "down") {
        getVolume()
          .then(function (volume) {
            volume =
              volume - config.volume_step < 0 ? 0 : volume - config.volume_step;
            return volume;
          })
          .then(setVolume)
          .then(
            function (volumeLevel) {
              res.end(
                "<h5>Volume successfully set to " + volumeLevel + "%</h5>"
              );
            },
            function (volumeLevel) {
              res.end(
                '<p style="color:red;">Error, cannot set volume to ' +
                  volumeLevel +
                  "%</p>"
              );
            }
          )
          .catch(function (err) {
            res.end(
              '<p style="color:red;">Error, unable to get current volume:' +
                JSON.stringify(err, null, 2) +
                "</p>"
            );
          });
      } else if (q.getVolume) {
        getVolume()
          .then(function (volume) {
            console.log("Volume: " + volume);
            res.end("<h5>Volume: " + volume + "%</h5>");
          })
          .catch(function (err) {
            res.end(
              '<p style="color:red;">Error, unable to get current volume:' +
                JSON.stringify(err, null, 2) +
                "</p>"
            );
          });
      } else if (q.play) {
        if (q.play.length < 5) {
          clientMedia.play(function (err, result) {
            if (err) {
              console.log(err);
              res.end("Error: " + err);
            } else {
              console.log("Play");
              res.end("Play");
            }
          });
        } else {
          var ext = q.play.split(".").pop();
          if (ext != "mp3" && ext != "wav" && ext != "ogg")
            return res.end("You can only play MP3 / WAV / OGG file ...");

          var options = {
            autoplay: true,
            contentType: "audio/" + ext,
          };
          clientMedia.stop(function () {
            setTimeout(function () {
              clientMedia.load(q.play, options, function (err, result) {
                if (err) {
                  res.end("Error, unable to play file");
                  console.log("Error, unable to play file");
                  console.log(err);
                } else {
                  console.log("playing " + q.play + " ...");
                  res.end("Playing " + q.play + " ...");
                }
              });
            }, 300);
          });
        }
      } else if (q.stop) {
        clientMedia.stop(function (err, result) {
          if (err) {
            console.log(err);
            res.end("Stop: " + err);
          } else {
            console.log("Stopped");
            res.end("Stopped");
          }
        });
      } else if (q.pause) {
        clientMedia.pause(function (err, result) {
          if (err) {
            console.log(err);
            res.end("Pause: " + err);
          } else {
            console.log("Paused");
            res.end("Paused");
          }
        });
      } else if (q.getPosition) {
        clientMedia.getPosition(function (err, result) {
          if (err) {
            console.log(err);
            res.end("getPosition: " + err);
          } else {
            console.log("Position " + result);
            res.end("Position " + result);
          }
        });
      } else if (q.getDuration) {
        clientMedia.getDuration(function (err, result) {
          if (err) {
            console.log(err);
            res.end("getDuration: " + err);
          } else {
            console.log("Duration " + result);
            res.end("Duration " + result);
          }
        });
      } else if (q.seek) {
        clientMedia.seek(q.seek, function (err, result) {
          if (err) {
            console.log(err);
            res.end("Seek: " + err);
          } else {
            console.log("Seeked to " + q.seek);
            res.end("Seeked to " + q.seek);
          }
        });
      } else {
        res.end(
          '<meta charset="UTF-8"><h2>phantom-remote-control ✔️</h2> <h4>Please specify a command</h4>' +
            '<br /><br /><h5>Example</h5><a href="?play=' +
            encodeURI(
              "https://raw.githubusercontent.com/VanVan/phantom-remote-control/binary/sound/test.mp3"
            ) +
            '">Play 15s sound</a><br />' +
            '<a href="?setVolume=up">Increase the volume</a><br />' +
            '<a href="?setVolume=down">Reduce the volume</a><br />' +
            '<a href="?stop=1">Stop sound</a>'
        );
      }
    })
    .listen(config.http_local_port);
}

console.log("Searching for Devialet Phantom or Dialog ...");
console.log("This may take several minutes");

//On force
if (
  config.devialet_port &&
  config.devialet_ipaddress &&
  config.devialet_port != "autodetect" &&
  config.devialet_ipaddress != "autodetect"
) {
  devialetDevice.host = config.devialet_ipaddress;
  devialetDevice.port = config.devialet_port;
  console.log(
    "Detection forced from config file to be " +
      config.devialet_ipaddress +
      ":" +
      config.devialet_port +
      " -> Only set volume usable"
  );
} else if (
  config.devialet_device_description_xml &&
  config.devialet_device_description_xml != "autodetect"
) {
  clientMedia = new MediaRendererClient(config.devialet_device_description_xml);
  devialetDevice.host = parseUri(config.devialet_device_description_xml).host;
  devialetDevice.port = parseUri(config.devialet_device_description_xml).port;
  console.log(
    "Detection forced from config device description to be " +
      devialetDevice.host +
      ":" +
      devialetDevice.port
  );
} else searchDevialetSpeaker();
