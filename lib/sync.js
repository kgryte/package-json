'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	merge = require( 'utils-merge2' )(),
	mustache = require( 'mustache' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
	defaults = require( './defaults.js' ),
	validate = require( './validate.js' ),
	keywords = require( './keywords.js' );


// COPY //

/**
* FUNCTION: cp( dest[, opts ] )
*	Synchronously creates a package.json file.
*
* @param {String} dest - package.json destination directory
* @param {Object} [opts] - function options
* @param {String} [opts.template="default"] - package.json template to use
*/
function cp( dest, options ) {
	var tmpl = 'default',
		opts = {},
		fpath,
		dpath,
		out,
		err;

	if ( !isString( dest ) ) {
		throw new TypeError( 'cp()::invalid input argument. First argument must be a string primitive. Value: `' + dest + '`.' );
	}
	if ( arguments.length > 1 ) {
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

	out = fs.readFileSync( fpath, {
		'encoding': 'utf8'
	});
	out = mustache.render( out, opts );

	fs.writeFileSync( dpath, out );
} // end FUNCTION cp()


// EXPORTS //

module.exports = cp;
