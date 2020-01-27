/**
 * phantom-remote-control
 * HTTP Adapter to remote control Devialet Phantom sound system
 *               (Play, Pause, Volume etc.)
 * 
 * @french Contrôlez les enceintes Devialet via une API HTTP. (Lecture, Pause, Volume etc.)
 * @package phantom-remote-control
 * @author https://github.com/VanVan
 */

if (process.platform == 'win32' || process.platform == 'win64') {
  var Service = require('node-windows').Service;

  // Create a new service object
  var svc = new Service({
    name:'Devialet remote control 2',
    description: 'HTTP Adapter to remote control Devialet Phantom Speakers',
    script: process.cwd()+'\\index.js'
  });

  // Listen for the "install" event, which indicates the
  // process is available as a service.
  svc.on('install',function(){
    console.log('Service successfully installed.');
    svc.start();
  });
  svc.install();
} else {
  const fs = require('fs');

  let lyrics = "[Unit]\n"+
  "Description=Devialet Phantom remote control\n"+
  "Wants=network-online.target\n"+
  "After=network.target network-online.target\n"+
  "[Service]\n"+
  "WorkingDirectory="+process.cwd()+"\n"+
  "ExecStart=/usr/bin/nodejs "+process.cwd()+"/index.js\n"+
  "Restart=always\n"+
  "StandardOutput=syslog\n"+
  "StandardError=syslog\n"+
  "SyslogIdentifier=devialet\n"+
  "User=pi\n"+
  "Group=pi\n"+
  "Environment=NODE_ENV=production\n"+
  "Type=idle\n"+
  "[Install]\n"+
  "WantedBy=multi-user.target";

  // write to a new file named 2pac.txt
  fs.writeFile('devialet.service', lyrics, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('File saved');


      fs.rename('devialet.service', '/etc/systemd/system/devialet.service', function (err) {
        if (err) throw err
        console.log('Service successfully installed.');
        console.log('To start the service, enter the command: sudo systemctl start devialet');
      })
  });

}
