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

> Passerelle HTTP pour contrôler à distance des enceintes Devialet

Ce code vous permet de controler vos Devialet Phantom en utilisant une API très simple, ou simplement depuis votre navigateur internet.
La detection de vos enceintes Devialet sera automatique sur votre réseau local.

<img src="https://user-images.githubusercontent.com/388581/66270480-80f5cc80-e854-11e9-9104-f04294e8262f.gif" alt="Devialet Phantom" title="Devialet Phantom"  align="center" width="50%" />

## 💡 Fonctionnalités

Contrôler la lecture musicale de vos enceintes Devialet


|          Devialet                            | 🔊 Phantom Dialog  | 🔉 Phantom Premier |🔈 Phantom Reactor|
| -------------------------------------------- | :----------------: | :----------------: | :----------------:|
| Lire un fichier mp3                          |         ✔️         |         ✔️        |        ✔️        |
| Pause et reprendre                           |         ✔️         |         ✔️        |        ✔️        |
| Arrêter                                      |         ✔️         |         ✔️        |        ✔️        |
| Changer le volume                            |         ✔️         |         ✔️        |        ✔️        |
| Récupérer le volume actuel                   |         ✔️         |         ✔️        |        ✔️        |
| Augmenter ou diminuer le volume              |         ✔️         |         ✔️        |        ✔️        |
| Récupérer la position actuelle de lecture    |         ✔️         |         ✔️        |        ✔️        |
| Récupérer la durée de la piste en cours      |         ✔️         |         ✔️        |        ✔️        |
| Déplacer la lecture à un endroit spécifique  |         ✔️         |         ✔️        |        ✔️        |
| Contrôler plusieurs enceintes en même temps  |         ✔️         |         ❌        |        ✔️        |


## 🔧 [Installation](#install)

### Si vous êtes développeur

```
git clone https://github.com/VanVan/phantom-remote-control.git
cd phantom-remote-control
npm install
node index.js
```
Vous avez besoin  de [NodeJS](http://nodejs.org) et de [NPM](https://www.npmjs.com/)

### Si vous souhaitez simplement quelque chose de prêt à l'emploi

Il vous suffit de télécharger l'application, puis de la lancer.

| ![Windows](https://user-images.githubusercontent.com/388581/66359040-bf36dd00-e975-11e9-9d08-83548dac921c.png)   Windows| ![mac](https://user-images.githubusercontent.com/388581/66363446-9ff47b80-e986-11e9-99f8-91b09f580420.png) Mac            | ![linux](https://user-images.githubusercontent.com/388581/66359270-ba265d80-e976-11e9-95b1-4d13436b2d4c.png) Linux|
| ------------------- | ------------------- | ------------------- |
|[Télécharger](https://github.com/VanVan/phantom-remote-control/raw/binary/bin/phantom-remote-win.exe)|[Télécharger](https://github.com/VanVan/phantom-remote-control/raw/binary/bin/phantom-remote-macos)|[Télécharger](https://github.com/VanVan/phantom-remote-control/raw/binary/bin/phantom-remote-linux)|

## ▶️ [Utilisation](#usage)


|          URL                      |  Description                               |
| -------------------------------- | ------------------------------------------- |
| `?play=http://site.com/music.mp3`|       Lire un fichier mp3                   |
| `?setVolume=30`                  |       Régler le volume à une valeur précise |
| `?setVolume=Up`                  |       Augmenter le volume                   |
| `?setVolume=Down`                |       Diminuer le volume                    |
| `?pause=1`                       |       Pause                                 |
| `?play=1`                        |       Reprendre                             |
| `?stop=1`                        |       Stop                                  |
| `?getPosition=1`                 |       Récupérer la position actuelle        |
| `?getDuration=1`                 |       Récupérer la durée de la piste        |
| `?seek=30`                       |   Lire un endroit spécifique de la musique  |


🔗 Exemple:
```
http://127.0.0.1:8090/?setVolume=Up

```
  
> ⏩ Ces requêtes peuvent être effectuées depuis un navigateur internet ou en tant qu'API pour être utilisé comme raccourcis clavier par exemple.


## 🧰 Configuration
Aucune configuration n'est nécessaire, c'est prêt à fonctionner ! Cependant, vous pouvez éditer le fichier config.json si vous avez besoin.
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

* **http_local_port**: Port local HTTP à utiliser pour recevoir les connexions.
* **devialet_ipaddress** and **devialet_port**: Ces valeurs peuvent être utilisées ensemble pour forcer le programme à utiliser une enceinte spécifique ou non detectées.
* **devialet_device_description_xml**: Peut être utilisé pour forcer l'utilisation d'un appareil spécifique.
* **ssdp_detection_interval**: Intervalle des requêtes SSDP à utiliser pour trouver un appareil.
* **volume_step**: Régler le pas à utiliser entre chaque changement de volume d'augmentation et de diminution.
* **debug**: Permet d'utiliser un fichier .env pour définir des variables d'environnement.

## ![autostart](https://user-images.githubusercontent.com/388581/66359530-cd85f880-e977-11e9-9bb4-8ecfa15d51ec.png)  Démarrer automatiquement ce programme en tant que service

Si vous utilisez ce programme tous les jours avec vos enceintes, il sera préférable de le configurer en tant que service système sur un serveur Linux ou sur votre ordinateur personnel. Ce programme sera alors toujours disponible.


### ![linux20-2](https://user-images.githubusercontent.com/388581/66359270-ba265d80-e976-11e9-95b1-4d13436b2d4c.png) Linux avec systemd

Vous pouvez installer simplement le service sur Linux en entrant ces commandes

```
sudo node install_service.js
```

Cela va créer un fichier `/etc/systemd/system/devialet.service`

Vous pouvez ensuite démarrer le service avec la commande `sudo systemctl start devialet`

### ![Windows](https://user-images.githubusercontent.com/388581/66359040-bf36dd00-e975-11e9-9d08-83548dac921c.png) Windows

Vous pouvez simplement installer le service sur Windows en entrant la commande

```
npm install node-windows
node install_service.js
```
Pour vérifier si tout fonctionne, ouvrez simplement la page `http://127.0.0.1:8090` sur votre navigateur.

## ✏️ Contribuer

- Ajouter de nouvelles fonctionnalités de contrôle
- Ajouter un panneau de contrôle utilisable directement depuis le navigateur


## 🎓 Copyright and license

Code distribué sous la [GNU General Public License v3.0](https://github.com/VanVan/phantom-remote-control/blob/master/LICENSE).

## 💰 Donation
Si ce projet vous aide, pensez à m'offrir une tasse de thé :)

[![paypal](https://www.paypalobjects.com/fr_FR/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AF3T44KDPA8SJ)