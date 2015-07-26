'use strict';

// MODULES //

var isOnline = require( 'is-online' ),
	npmName = require( 'npm-name' );


// PACKAGE NAME //

/**
* FUNCTION: isAvailable( name, clbk )
*	Checks if an NPM name is available.
*
* @param {String} name - package name
* @param {Function} clbk - callback to invoke after checking if an NPM name is available
*/
function isAvailable( name, clbk ) {
	isOnline( next );

	/**
	* FUNCTION: next( error, online )
	*	Callback invoked after checking if a user has internet access.
	*
	* @private
	* @param {Null} error - error argument
	* @param {Boolean} online - boolean indicating if the user is online
	*/
	function next( error, online ) {
		if ( !online ) {
			// Error on the side of assuming that the name is available...
			return clbk( null, true );
		}
		npmName( name, done );
	}

	/**
	* FUNCTION: done( error, available )
	*	Callback invoked after checking NPM name availability.
	*
	* @private
	* @param {Null} error - error argument
	* @param {Boolean} available - boolean indicating if an NPM name is available
	*/
	function done( error, available ) {
		clbk( null, available );
	}
} // end FUNCTION isAvailable()


// EXPORTS //

module.exports = isAvailable;
