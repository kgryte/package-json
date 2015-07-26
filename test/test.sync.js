/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Recursively make directories:
	mkdirp = require( 'mkdirp' ),

	// Path module:
	path = require( 'path' ),

	// Filesystem module:
	fs = require( 'fs' ),

	// Module to be tested:
	cp = require( './../lib/sync.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

	it( 'should export a function', function test() {
		expect( cp ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a valid destination directory', function test() {
		var values = [
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid options argument', function test() {
		var values = [
			'beep',
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( 'beep/boop', value );
			};
		}
	});

	it( 'should create a package.json file in a specified directory', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath );

		bool = fs.existsSync( path.join( dirpath, 'package.json' ) );

		assert.isTrue( bool );
	});

	it( 'should create a configured package.json file in a specified directory', function test() {
		var dirpath,
			fpath1,
			fpath2,
			f1, f2;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'default',
			'name': 'my-really-cool-module-which-no-one-has-ever-done-before-beep-boop',
			'desc': 'Beep boop.',
			'author': 'Jane Doe',
			'email': 'jane@doe.com',
			'repo': 'jane/beep',
			'cmd': 'beepboop',
			'license': 'MIT',
			'keywords': ['beep','boop','bop']
		});

		fpath1 = path.join( dirpath, 'package.json' );
		fpath2 = path.join( __dirname, 'fixtures', 'package.json' );

		f1 = require( fpath1 );
		f2 = require( fpath2 );

		assert.deepEqual( f1, f2 );
	});

	it( 'should create a package.json file using a specified template', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'default'
		});

		bool = fs.existsSync( path.join( dirpath, 'package.json' ) );

		assert.isTrue( bool );
	});

	it( 'should ignore any unrecognized options', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'beep': 'boop'
		});

		bool = fs.existsSync( path.join( dirpath, 'package.json' ) );

		assert.isTrue( bool );
	});

});
