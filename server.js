const cluster = require('cluster');
const childProcess = require('child_process');
const cpus = require('os').cpus().length;
const processes = cpus >= 2 ? cpus : 2;

if(cluster.isMaster){
	console.log("Starting server processes");

	for(var i = 0; i < processes; i++){
		cluster.fork();
	}

	cluster.on('online', worker => console.log('Worker process ' + worker.process.pid + ' is online'));
	cluster.on('exit', worker => {
        console.log('Worker process ' + worker.process.pid + ' has died- restarting');
        cluster.fork();
    });
    
} else {
	require("./index.js");
}