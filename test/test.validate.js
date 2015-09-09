/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if not provided a valid options argument', function test() {
		var values, err;

		values = [
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
			err = validate( {}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a template option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'template': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an unrecognized template option', function test() {
		var values, err;

		values = [
			'beep',
			'boop',
			'woot'
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'template': values[ i ]
			});
			assert.isTrue( err instanceof Error );
		}
	});

	it( 'should return an error if provided a name option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'name': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid name option', function test() {
		var values, err;

		values = [
			'   PackageName+++;;===~`  ',
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'name': values[ i ]
			});
			assert.isTrue( err instanceof Error );
		}
	});

	it( 'should return an error if provided a description option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'desc': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an author option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'author': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an email option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'email': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid email option', function test() {
		var values, err;

		values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'email': values[ i ]
			});
			assert.isTrue( err instanceof Error );
		}
	});

	it( 'should return an error if provided a repo option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'repo': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid repo option', function test() {
		var values, err;

		values = [
			'beep',
			'beep-boop',
			'beep/boop/bop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'repo': values[ i ]
			});
			assert.isTrue( err instanceof Error );
		}
	});

	it( 'should return an error if provided a command option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'cmd': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a keywords option which is not a string array', function test() {
		var values, err;

		values = [
			'beep',
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			['beep',null],
			['beep',5],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'keywords': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a license option which is not a string primitive', function test() {
		var values, err;

		values = [
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
			err = validate( {}, {
				'license': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return null if all options are valid', function test() {
		var err;

		err = validate( {}, {
			'template': 'default',
			'name': 'my-really-cool-module-which-no-one-has-ever-done-before-beep-boop',
			'desc': 'Beep boop.',
			'author': 'Jane Doe',
			'email': 'jane@doe.com',
			'repo': 'jane/beep',
			'cmd': 'beepboop',
			'keywords': ['beep','boop','bop'],
			'license': 'MIT'
		});

		assert.isNull( err );

		err = validate( {}, {
			'beep': true, // misc options
			'boop': 'bop'
		});

		assert.isNull( err );
	});

});
