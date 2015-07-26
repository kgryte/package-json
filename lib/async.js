'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	isFunction = require( 'validate.io-function' ),
	fs = require( 'fs' ),
	path = require( 'path' ),
	mustache = require( 'mustache' ),
	merge = require( 'utils-merge2' )(),
	noop = require( '@kgryte/noop' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	keywords = require( './keywords.js' );


// COPY //

/**
* FUNCTION: cp( dest[, opts ][, clbk ] )
*	Asynchronously creates a package.json file.
*
* @param {String} dest - package.json destination directory
* @param {Object} [opts] - function options
* @param {String} [opts.template="default"] - package.json template to use
* @param {Function} [clbk] - callback to invoke upon attempting to create a package.json file
*/
function cp() {
	var args = arguments,
		nargs = args.length,
		tmpl = 'default',
		opts = {},
		options,
		fpath,
		dpath,
		dest,
		clbk,
		err;

	if ( !nargs ) {
		throw new Error( 'cp()::insufficient input arguments. Must provide a file destination.' );
	}
	dest = args[ 0 ];
	if ( !isString( dest ) ) {
		throw new TypeError( 'cp()::invalid input argument. First argument must be a string primitive. Value: `' + dest + '`.' );
	}
	if ( nargs === 1 ) {
		clbk = noop;
	}
	else if ( nargs === 2 ) {
		if ( isObject( args[ 1 ] ) ) {
			options = args[ 1 ];
			clbk = noop;
		}
		else if ( isFunction( args[ 1 ] ) ) {
			clbk = args[ 1 ];
		}
		else {
			throw new TypeError( 'cp()::invalid input argument. Second argument must either be an options object or a callback. Value: `' + args[ 1 ] + '`.' );
		}
	}
	else {
		options = args[ 1 ];
		clbk = args[ 2 ];
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'cp()::invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
		}
	}
	if ( options ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts = merge( {}, defaults[ tmpl ], opts );
	tmpl = opts.template || tmpl;

	opts.keywords = keywords( opts.keywords );

	fpath = path.join( __dirname, tmpl, 'package.json' );
	dpath = path.join( dest, 'package.json' );

	fs.readFile( fpath, {'encoding':'utf8'}, onRead );

	/**
	* FUNCTION: onRead( error, file )
	*	Callback invoked upon reading a file.
	*
	* @private
	* @param {Error} error - error object
	* @param {String} file - file contents
	*/
	function onRead( error, file ) {
		var out;
		if ( error ) {
			return clbk( error );
		}
		out = mustache.render( file, opts );
		fs.writeFile( dpath, out, onWrite );
	}

	/**
	* FUNCTION: onWrite( error )
	*	Callback invoked upon writing a file.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onWrite( error ) {
		if ( error ) {
			return clbk( error );
		}
		clbk();
	}
} // end FUNCTION cp()


// EXPORTS //

module.exports = cp;
