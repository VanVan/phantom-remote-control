![NAC-depend-none](https://img.shields.io/badge/dependency-nodessdp-green.svg)
[![NODEJS](https://img.shields.io/node/v/phantom-remote-control)](https://www.npmjs.com/package/phantom-remote-control)
[![NPM](https://img.shields.io/npm/v/phantom-remote-control)](https://www.npmjs.com/package/phantom-remote-control)
[![GitHub version](https://badge.fury.io/gh/VanVan%2Fphantom-remote-control.svg)](https://github.com/VanVan/phantom-remote-control)
[![NAC-license](https://img.shields.io/github/license/VanVan/phantom-remote-control)](https://github.com/VanVan/ipfsProxyHTTP/blob/master/LICENSE)


<a href="https://www.devialet.com/fr-fr/">
    <img src="https://user-images.githubusercontent.com/388581/66270494-b995a600-e854-11e9-9b94-39ea54648fac.png" alt="Devialet" title="Devialet Phantom" align="right" height="90" /></a>

Devialet phantom-remote-control
=======================

> HTTP Adapter to remote control Devialet Phantom Speakers

This code allows you to control your devialet phantom using a very simple API, or even from your web browser.
It automatically detects your Devialet Phantom speakers on your local network.

<img src="https://user-images.githubusercontent.com/388581/66270480-80f5cc80-e854-11e9-9104-f04294e8262f.gif" alt="Devialet Phantom" title="Devialet Phantom"  align="center" width="50%" />

## 💡 Features

Control the musical playback of your Devialet speakers


|          Devialet                            | 🔊 Phantom Dialog  | 🔉 Phantom Premier |🔈 Phantom Reactor|
| -------------------------------------------- | :----------------: | :----------------: | :----------------:|
| Play mp3 file                                |         ✔️         |         ✔️        |        ✔️        |
| Pause and Resume                             |         ✔️         |         ✔️        |        ✔️        |
| Stop                                         |         ✔️         |         ✔️        |        ✔️        |
| Change volume                                |         ✔️         |         ✔️        |        ✔️        |
| Get current volume                           |         ✔️         |         ✔️        |        ✔️        |
| Increase or decrease volume                  |         ✔️         |         ✔️        |        ✔️        |
| Recover the playback position                |         ✔️         |         ✔️        |        ✔️        |
| Recover the playback duration                |         ✔️         |         ✔️        |        ✔️        |
| Move playback to a specific time of the music|         ✔️         |         ✔️        |        ✔️        |
| Control several speakers at the same time    |         ✔️         |         ❌        |        ✔️        |


## 🔧 [Installation](#install)

```
npm install phantom-remote-control
node index.js
```
You need [NodeJS](http://nodejs.org) and [NPM](https://www.npmjs.com/)

## ▶️ [Usage](#usage)


|          URL                      |  Description                               |
| -------------------------------- | ------------------------------------------- |
| `?play=http://site.com/music.mp3`|         Play mp3 file                       |
| `?setVolume=30`                  |         Set volume to a specific value      |
| `?setVolume=Up`                  |         Increase volume                     |
| `?setVolume=Down`                |         Decrease volume                     |
| `?pause=1`                       |         Pause                               |
| `?play=1`                        |         Resume                              |
| `?stop=1`                        |         Stop                                |
| `?getPosition=1`                 |         Get current position                |
| `?getDuration=1`                 |         Get music duration                  |
| `?seek=30`                       |Move playback to a specific time of the music|


🔗 Example:
```
http://127.0.0.1:8090/?setVolume=Up

```
  
> ⏩ These requests can be made by web browser or used as an API to serve as a keyboard shortcut for example.


## 🧰 Configuration
No configuration is needed, it works out of the box, however, you can edit config.json if you need to.
```
{
"http_local_port":                  8090,
"devialet_ipaddress":               "autodetect",
"devialet_port":                    "autodetect",
"devialet_device_description_xml":  "autodetect",
"ssdp_detection_interval":          10000,
"volume_step":                      10,
"debug":                            false
}
```
Each variable in the config can have these options:

* **http_local_port**: Local port to use to listen HTTP request.
* **devialet_ipaddress** and **devialet_port**: Can be used together to force this program to
  use a specific or undetected sound system.
* **devialet_device_description_xml**: Can be used to force a specific device.
* **ssdp_detection_interval**: Interval to make SSDP request to find a device.
* **volume_step**: Up and Down volume step to use.
* **debug**: Let you use a .env file to specify environnement variable.

## ✏️ Contributing

- Add new control features
- Add a control panel to use in the browser


## 🎓 Copyright and license

Code released under the [GNU General Public License v3.0](https://github.com/VanVan/phantom-remote-control/blob/master/LICENSE).
