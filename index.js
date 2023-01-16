const { readdir } = require('fs/promises'); 
const { join, extname } = require('path');

class z3FileManager {
	constructor(defaultBehaviour) {
		this.defaultBehaviour = defaultBehaviour;
	}

	async processCommandPaths(path, object, json) {
		let entries = await readdir(path, {withFileTypes : true});
		entries = entries.filter(entry => {
			if(entry.isDirectory()) return true;
			if(extname(entry.name) != '.json') return true;
			if(entry.name != 'callback.json') return true;
			const entryPath = join(path, entry.name);
			json = require(entryPath);
		});

		let handler = this?.defaultBehaviour;  if(json) {
			if(json?.path) handler = require(json.path).handler;
			if(json?.ignore) entries = entries.filter(entry => {
				for(const ignoredEntry of json.ignore)
				if (entry.name == ignoredEntry) return false;
				return true }); 
			if(json?.fullscope) {
				promises.push(handler(path, entries, object, json));
				entries = entries.filter(entry => {
					if(entry.isDirectory()) return true;
				});
			}
		}

		const promises = []; for(const entry of entries) {
			const entryPath = join(path, entry.name);
			if(entry.isDirectory())
			promises.push(this.processCommandPaths(entryPath, object, json));
			else if(handler) promises.push(handler(path, entry, object, json));
		} await Promise.all(promises);
	}
	
	setDefaultBehaviour(behaviour) {
		this.defaultBehaviour = behaviour;
	}
	
	getDefaultBehaviour() {
		return this.defaultBehaviour;
	}
}

module.exports = z3FileManager;