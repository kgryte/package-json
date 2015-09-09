/* global require, describe, it */
'use strict';

var mpath = './../lib/package_name.js';


// MODULES //

var chai = require( 'chai' ),
	proxyquire = require( 'proxyquire' ),
	isAvailable = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'package.json name availability', function tests() {

	it( 'should export a function', function test() {
		expect( isAvailable ).to.be.a( 'function' );
	});

	it( 'should positively confirm that a package name is available', function test( done ) {
		this.timeout( 0 );

		isAvailable( 'dalfkdjfladjflajfldfjdaljfkldjfkdsjflkdjslfjdsalfjdsjfkldsjfkldsjflkdsajflajs', onCheck );

		function onCheck( error, bool ) {
			if ( error || !bool ) {
				assert.ok( false );
				return;
			}
			assert.ok( true );
			done();
		}
	});

	it( 'should negatively confirm that a package name is available', function test( done ) {
		this.timeout( 0 );

		isAvailable( 'chai', onCheck );

		function onCheck( error, bool ) {
			if ( error || bool ) {
				assert.ok( false );
				return;
			}
			assert.ok( true );
			done();
		}
	});

	it( 'should assume that a package name is available if not able to access the internet', function test( done ) {
		var isAvailable = proxyquire( mpath, {
			'is-online': function isOnline( clbk ) {
				clbk( null, false );
			}
		});

		isAvailable( 'chai', onCheck );

		function onCheck( error, bool ) {
			if ( error || !bool ) {
				assert.ok( false );
				return;
			}
			assert.ok( true );
			done();
		}
	});

});
