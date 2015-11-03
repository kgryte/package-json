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
	keywords = require( './keywords.js' ),
	packageName = require( './package_name.js' );


// COPY //

/**
* FUNCTION: cp( dest[, opts ][, clbk ] )
*	Asynchronously creates a package.json file.
*
* @param {String} dest - package.json destination directory
* @param {Object} [opts] - function options
* @param {String} [opts.template="default"] - package.json template to use
* @param {String} [opts.name=""] - package name
* @param {String} [opts.desc=""] - package description
* @param {String} [opts.author=""] - package author
* @param {String} [opts.email=""] - package author email
* @param {String} [opts.repo=""] - package Github repository
* @param {String} [opts.cmd=""] - package command name, if package is a CLI tool
* @param {String[]} [opts.keywords] - package keywords
* @param {String} [opts.license="MIT"] - package license
* @param {Boolean} [opts.private=false] - boolean indicating whether a package is private
* @param {Function} [clbk] - callback to invoke upon attempting to create a package.json file
* @returns {Void}
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
		err,
		flg;

	if ( !nargs ) {
		throw new Error( 'insufficient input arguments. Must provide a file destination.' );
	}
	dest = args[ 0 ];
	if ( !isString( dest ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + dest + '`.' );
	}
	if ( nargs === 1 ) {
		clbk = noop;
	}
	else if ( nargs === 2 ) {
		if ( isObject( args[ 1 ] ) ) {
			options = args[ 1 ];
			clbk = noop;
			flg = true;
		}
		else if ( isFunction( args[ 1 ] ) ) {
			clbk = args[ 1 ];
		}
		else {
			throw new TypeError( 'invalid input argument. Second argument must either be an options object or a callback. Value: `' + args[ 1 ] + '`.' );
		}
	}
	else {
		options = args[ 1 ];
		clbk = args[ 2 ];
		flg = true;
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
		}
	}
	if ( flg ) {
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

	// Only check for name availability if a name has been provided...
	if ( opts.name ) {
		packageName( opts.name, isAvailable );
	} else {
		isAvailable( null, true );
	}

	/**
	* FUNCTION: isAvailable( error, bool )
	*	Callback invoked upon checking NPM name availability.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Boolean} bool - boolean indicating whether an NPM name is available
	*/
	function isAvailable( error, bool ) {
		if ( error ) {
			return clbk( error );
		}
		if ( !bool ) {
			error = new Error( 'invalid option. Package name is not available on NPM. Option: `' + opts.name + '`.' );
			return clbk( error );
		}
		fs.readFile( fpath, {'encoding':'utf8'}, onRead );
	}

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
