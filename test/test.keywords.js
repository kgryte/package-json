/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	keywords = require( './../lib/keywords.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'package.json keyword formatting', function tests() {

	it( 'should export a function', function test() {
		expect( keywords ).to.be.a( 'function' );
	});

	it( 'should format an array of keywords as a string', function test() {
		var words,
			out;

		words = [
			'beep',
			'boop',
			'bop'
		];

		out = keywords( words );

		assert.isString( out );
		assert.isTrue( /beep/.test( out ) );
		assert.isTrue( /boop/.test( out ) );
		assert.isTrue( /bop/.test( out ) );
	});

	it( 'should return an empty string if provided an empty array', function test() {
		assert.strictEqual( keywords( [] ), '' );
	});

});
