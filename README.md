# Simple Rest API 💻

a REST-ful API created by following Mosh's tutorial on [youtube](https://www.youtube.com/watch?v=pKd0Rpw7O48&t=1391s). Instead of following it mindlessly, I use [typescript](https://www.npmjs.com/package/typescript) and some additional feature such as [dotenv](https://www.npmjs.com/package/dotenv) 📦 to spice things up.

## What I learnt

- Create a simple REST-ful api using [express](https://www.npmjs.com/package/express) 📦 and node
- typescript import system and typescript configuration
- using [dotenv](https://www.npmjs.com/package/dotenv) 📦 to setup environment environment
- setup nodemon configuration for auto-restart with typescript support
- using [joi](https://www.npmjs.com/package/joi) 📦 to validate request

## How to setup nodemon with typescript

[Nodemon](https://www.npmjs.com/package/nodemon) is a package that help you to auto-restart your server when there is file changes while [typescript](https://www.npmjs.com/package/typescript) helps you to create better code with autocompletion. Nodemon usually only used to deal `.js` files, so some manual configuration is needed to make it support typescript

First install, nodemon, typescript and ts-node

- `npm install -g nodemon`
- `npm install -D typescript ts-node`

**NOTE:** nodemon must be installed globally or else it won't work (in my case).

You might be asking what the hell is `ts-node`. `ts-node` is a package 📦 that let you runs `.ts` files directly using node without needing to compile typescript files into javascript before running it with node. You can try it by using `node -r ts-node/register #FILENAME.ts#`.

Now we need to configure nodemon. Create `nodemon.json` and copy this stuff into it (I will explain it later).

```json
{
	"verbose": true,
	"ignore": ["node_module/", "dist/"],
	"watch": ["src/", ".env"],
	"execMap": {
		"ts": "node -r ts-node/register"
	},
	"env": {
		"NODE_ENV": "development"
	},
	"ext": "ts"
}
```

Below are the explanation

| key       | expected value                                                                      | description                                                                                                                                                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verbose` | `true` or `false`                                                                   | It tells you all the stuff it did when `verbose` is `true`. You can tell it to shut up by setting it to `false`                                                                                                                                               |
| `ignore`  | Array of `path/` and `filename.ext`                                                 | Tell nodemon to ignore the path or files. Any file changes in the path or file will not trigger restart                                                                                                                                                       |
| `watch`   | Array of `path/` and `filename.ext`                                                 | Tell nodemon to watch the path or files. Any file changes in the path or file will trigger restart                                                                                                                                                            |
| `execMap` | object of name of extension, such as `ts` for `.ts` files and its way to execute it | You can set how nodemon to execute the file. In the above json, it tells nodemon to execute file with `.ts` extension by running `node -r tss-node/register #FILE#`                                                                                           |
| `env`     | object of key and value                                                             | environment variable that you can access it by `process.env` in node. Only files run using nodemon with the configuration applied will have the environment variable set. Now, I can access `NODE_ENV` by using `process.env.NODE_ENV` in my typescript file. |
| `ext`     | string of extension                                                                 | Tell nodemon to only watch about the file with given extension. Changes in file with other extension will not trigger restart                                                                                                                                 |

Lastly, add scripts into your `package.json`

- `"dev": "nodemon --config nodemon.json #FILE.ts#"`

This will do the trick. You can run nodemon using `npm run dev` or just `"nodemon --config nodemon.json #FILE.ts#"`, both can get nodemon up and runnning.
