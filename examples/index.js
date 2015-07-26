'use strict';

var mkdirp = require( 'mkdirp' ),
	path = require( 'path' ),
	cp = require( './../lib' );

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

