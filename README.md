package.json
=========
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a `package.json` file.


## Installation

``` bash
$ npm install @kgryte/package-json
```


## Usage

``` javascript
var cp = require( '@kgryte/package-json' );
```

#### cp( dest[, opts ][, clbk ] )

Asynchronously create a `package.json` file in a specified `destination` directory.

``` javascript
cp( 'path/to/a/directory', onCreate );

function onCreate( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Success!' );
}
```

The function accepts the following `options`:
*	__template__: `package.json` template name. Default: `'default'`.
*	__name__: package [name](https://docs.npmjs.com/files/package.json#name). Default: `''`.
*	__desc__: package [description](https://docs.npmjs.com/files/package.json#description). Default: `''`.
*	__author__: package [author](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).
*	__email__: package author [email](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).
*	__repo__: package Github [repository](https://docs.npmjs.com/files/package.json#repository).
*	__cmd__: package [command](https://docs.npmjs.com/files/package.json#bin), if the package should be used as a CLI tool.
*	__keywords__: package [keywords](https://docs.npmjs.com/files/package.json#keywords). Default: `[]`.
*	__license__: package [license](https://docs.npmjs.com/files/package.json#license). Default: `'MIT'`.
*	__private__: `boolean` indicating whether a package is __private__. Default: `false`.

By default, a `default` template is used. To specify a different `package.json` template, set the `template` option.

``` javascript
cp( 'path/to/a/directory', {
	'template': 'default'
});
```

To specify `package.json` fields, set the corresponding `options`.

``` javascript
cp( 'path/to/a/directory', {
	'name': 'beep',
	'author': 'Jane Doe',
	'repo': 'janedoe/beep'
});
```



#### cp.sync( dest[, opts] )

Synchronously create a `package.json` file in a specified `destination` directory.

``` javascript
cp.sync( 'path/to/a/directory' );
```

The function accepts the same `options` as the asynchronous version.


## Notes

* 	Supported templates may be found in the `./lib` directory and are named according to the directory name.
*	The package [name](https://docs.npmjs.com/files/package.json#name) is validated using [validate-npm-package-name](https://github.com/npm/validate-npm-package-name).
*	The package repository is assumed to be a Github repository. Thus, only the owner/organization and repository names are needed; e.g.,

	```
	kgryte/package-json
	```

*	In asynchronous mode, the module checks for NPM package name [availability](https://github.com/sindresorhus/npm-name). If an internet connection is __not__ available, the module assumes that the package name __is__ available in order to allow offline use.


## Examples

``` javascript
var mkdirp = require( 'mkdirp' ),
	path = require( 'path' ),
	cp = require( '@kgryte/package-json' );

var dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

mkdirp.sync( dirpath );
cp.sync( dirpath, {
	'template': 'default',
	'name': 'beep',
	'desc': 'Beep boop.',
	'author': 'Jane Doe',
	'email': 'jane@doe.com',
	'repo': 'janedoe/beep',
	'cmd': 'beep',
	'keywords': [
		'beep',
		'boop',
		'bop'
	],
	'license': 'MIT'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

---
## CLI


### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g @kgryte/package-json
```


### Usage

``` bash
Usage: packagejson [options] [destination]

Options:

  -h,    --help               Print this message.
  -V,    --version            Print the package version.
  -tmpl  --template name      Template name. Default: 'default'.
         --name name          Package name. Default: ''.
  -desc  --description desc   Package description. Default: ''.
         --author author      Package author.
         --email email        Package author email.
         --repo repo          Package Github repository. Default: ''.
         --cmd name           Package command, if package is a CLI tool.
         --keywords keywords  Package keywords; e.g., word1,word2,...,wordN.
         --license name       Package license. Default: 'MIT'.
         --private            Specifies whether a package is private.
```


### Examples

``` bash
$ cd ~/my/project/directory
$ packagejson
# => creates a package.json file in the current working directory
```

To specify a destination other than the current working directory, provide a `destination`.

``` bash
$ packagejson ./../some/other/directory
```



---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/@kgryte/package-json.svg
[npm-url]: https://npmjs.org/package/@kgryte/package-json

[build-image]: http://img.shields.io/travis/kgryte/package-json/master.svg
[build-url]: https://travis-ci.org/kgryte/package-json

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/package-json/master.svg
[coverage-url]: https://codecov.io/github/kgryte/package-json?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/package-json.svg
[dependencies-url]: https://david-dm.org/kgryte/package-json

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/package-json.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/package-json

[github-issues-image]: http://img.shields.io/github/issues/kgryte/package-json.svg
[github-issues-url]: https://github.com/kgryte/package-json/issues
