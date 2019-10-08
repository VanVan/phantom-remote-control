<p align="center">README available in<br />
<a href="README.md"><img src="https://user-images.githubusercontent.com/388581/66407091-ee3c6580-e9ec-11e9-9081-b222df92896c.png" alt="English" width="40px" /></a> <a href="README_FR.md"><img src="https://user-images.githubusercontent.com/388581/66407034-da90ff00-e9ec-11e9-827b-dab984a76e42.png" alt="Français" width="40px" /></a><br /><br /><br /></p>

![NAC-depend-none](https://img.shields.io/badge/dependency-nodessdp-green.svg)
[![NODEJS](https://img.shields.io/node/v/phantom-remote-control)](https://www.npmjs.com/package/phantom-remote-control)
[![NPM](https://img.shields.io/npm/v/phantom-remote-control)](https://www.npmjs.com/package/phantom-remote-control)
[![GitHub version](https://badge.fury.io/gh/VanVan%2Fphantom-remote-control.svg)](https://github.com/VanVan/phantom-remote-control)
[![NAC-license](https://img.shields.io/github/license/VanVan/phantom-remote-control)](https://github.com/VanVan/ipfsProxyHTTP/blob/master/LICENSE)


<a href="https://www.devialet.com/fr-fr/">
    <img src="https://user-images.githubusercontent.com/388581/66270494-b995a600-e854-11e9-9b94-39ea54648fac.png" alt="Devialet" title="Devialet Phantom" align="right" height="90" /></a>

Devialet phantom-remote-control [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AF3T44KDPA8SJ)
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

### If you are a developer

```
git clone https://github.com/VanVan/phantom-remote-control.git
cd phantom-remote-control
npm install
node index.js
```
You need [NodeJS](http://nodejs.org) and [NPM](https://www.npmjs.com/)

### If you just want something easy to use

All you have to do is download the application, then run it.

| ![Windows](https://user-images.githubusercontent.com/388581/66359040-bf36dd00-e975-11e9-9d08-83548dac921c.png)   Windows| ![mac](https://user-images.githubusercontent.com/388581/66363446-9ff47b80-e986-11e9-99f8-91b09f580420.png) Mac            | ![linux](https://user-images.githubusercontent.com/388581/66359270-ba265d80-e976-11e9-95b1-4d13436b2d4c.png) Linux|
| ------------------- | ------------------- | ------------------- |
|[Download](https://github.com/VanVan/phantom-remote-control/raw/binary/bin/phantom-remote-win.exe)|[Download](https://github.com/VanVan/phantom-remote-control/raw/binary/bin/phantom-remote-macos)|[Download](https://github.com/VanVan/phantom-remote-control/raw/binary/bin/phantom-remote-linux)|

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

## ![autostart](https://user-images.githubusercontent.com/388581/66359530-cd85f880-e977-11e9-9bb4-8ecfa15d51ec.png)  Autostart this program as a service

If you use it every day with your speakers, it would be better to configure it as a service on a Linux server or on your personal computer. By doing it, the program will always be running.


### ![linux20-2](https://user-images.githubusercontent.com/388581/66359270-ba265d80-e976-11e9-95b1-4d13436b2d4c.png) Linux with systemd

You can simply install the service on Linux by entering the command

```
sudo node install_service.js
```

It will create a file `/etc/systemd/system/devialet.service`

You can then start the service by doing `sudo systemctl start devialet`

### ![Windows](https://user-images.githubusercontent.com/388581/66359040-bf36dd00-e975-11e9-9d08-83548dac921c.png) Windows

You can simply install the service on Windows by entering the command

```
npm install node-windows
node install_service.js
```
To check if it works, just open `http://127.0.0.1:8090` on your browser

## ✏️ Contributing

- Add new control features
- Add a control panel to use in the browser


## 🎓 Copyright and license

Code released under the [GNU General Public License v3.0](https://github.com/VanVan/phantom-remote-control/blob/master/LICENSE).

## 💰 Donation
If this project help you, you can give me a cup of coffee :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AF3T44KDPA8SJ)