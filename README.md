# z3FileManager - exquz3me
## About

```
- Info: This package allows you to call a handler function 
        on the content of an entire path including all subpaths.
        The function is specified by a callback.json within the 
        directory you want the handler to be called on. 

- Use:  Originally developed to simplify writing handlers
        for discord bots
```

## Example

#### index.js
```js
const z3FileManager = require('z3filemanager');
const { join } = require('node:path');
const { handler } = require('./handlers/default-handler');

const configPath = join(__dirname, 'config');
const fileManager = new z3FileManager(handler); //NOTE: passing a default handler is optional
const type2Obj = { files: [] };

(async () => {
	await fileManager.processCommandPaths(configPath, type2Obj);
})();
```

#### default-handler.js
```js
async function defaultHandler(path, entry, object) {
    console.log("default", entry)
}

module.exports = {
    handler : defaultHandler
};
```

#### handler-type2.js
```js
async function type2Handler(path, entry, object, json) {
    object.files.push(entry.name);
    console.log(object); //a helper object you can use to save things in
    console.log(json); //the callback.json
}

module.exports = {
    handler : type2Handler
};
```

## File Structure
```
🗁 my-app/
├─ 🗁 config/                      ➜  where no callback.json is specified, 
│  ├─ 🗁 type1/                           the default-handler.js will be used
│  │  └─ 🗋 file1-1.js                  (if specified)
│  ├─ 🗁 type2/
│  │  ├─ 🗁 sub-type2/             ➜  handler will also affect ALL subfolders 
│  │  │  ├─ 🗋 file2-3.js               unless dir is excluded with "ignored"
│  │  │  └─ 🗁 sub-sub-type2/          (sub-sub-type2 is also affected by the handler)
│  │  │     └─ 🗋 file2-4.js
│  │  ├─ 🗋 callback.json           ➜  {"path":"../../handlers/handler-type2.js", 
│  │  ├─ 🗋 file2-1.js                   "ignored":["file2-1.js"], "fullscope": true}
│  │  └─ 🗋 file2-2.js                  notes: - all parameters are optional      
│  └─ 🗋 file0.js                              - the callback.json can be upserted
├─ 🗁 handlers/
│  ├─ 🗋 handler-type2.js
│  └─ 🗋 default-handler.js 
└─ 🗋 index.js 
```

### Installation

``` bash
$ npm install z3filemanager
```


### License

[MIT](http://opensource.org/licenses/MIT)
