'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' ),
	isStringArray = require( 'validate.io-string-array' ),
	isValidEmail = require( 'validate.io-email-address' ),
	isValidName = require( 'validate-npm-package-name' ),
	templates = require( './templates.js' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - function options
* @param {String} [options.template] - package.json template to use
* @param {String} [options.name] - package name
* @param {String} [options.desc] - package description
* @param {String} [options.author] - package author
* @param {String} [options.email] - package author email
* @param {String} [options.repo] - package Github repository
* @param {String} [options.cmd] - package command name, if package is a CLI tool
* @param {String[]} [options.keywords] - package keywords
* @param {String} [options.license] - package license
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'cp()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'template' ) ) {
		opts.template = options.template;
		if ( !isString( opts.template ) ) {
			return new TypeError( 'cp()::invalid option. Template option must be a string primitive. Option: `' + opts.template + '`.' );
		}
		if ( !contains( templates, opts.template ) ) {
			return new Error( 'cp()::invalid option. Unrecognized template name. Must be one of [' + templates.join( ',' ) + '] Option: `' + opts.template + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'name' ) ) {
		opts.name = options.name;
		if ( !isString( opts.name ) ) {
			return new TypeError( 'cp()::invalid option. Package name must be a string primitive. Option: `' + opts.name + '`.' );
		}
		if ( isValidName( opts.name ).validForNewPackages === false ) {
			return new Error( 'cp()::invalid option. Invalid package name. Option: `' + opts.name + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'desc' ) ) {
		opts.desc = options.desc;
		if ( !isString( opts.desc ) ) {
			return new TypeError( 'cp()::invalid option. Package description must be a string primitive. Option: `' + opts.desc + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'author' ) ) {
		opts.author = options.author;
		if ( !isString( opts.author ) ) {
			return new TypeError( 'cp()::invalid option. Package author must be a string primitive. Option: `' + opts.author + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'email' ) ) {
		opts.email = options.email;
		if ( !isString( opts.email ) ) {
			return new TypeError( 'cp()::invalid option. Package author email must be a string primitive. Option: `' + opts.email + '`.' );
		}
		if ( !isValidEmail( opts.email ) ) {
			return new Error( 'cp()::invalid option. Invalid email address. Option: `' + opts.email + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'repo' ) ) {
		opts.repo = options.repo;
		if ( !isString( opts.repo ) ) {
			return new TypeError( 'cp()::invalid option. Package repository option must be a string primitive. Option: `' + opts.repo + '`.' );
		}
		if ( opts.repo.split( '/' ).length !== 2 ) {
			return new Error( 'cp()::invalid option. Package repository option must consist of two parts: an owner/organization and a repository name. Option: `' + opts.repo + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'cmd' ) ) {
		opts.cmd = options.cmd;
		if ( !isString( opts.cmd ) ) {
			return new TypeError( 'cp()::invalid option. Package command name must be a string primitive. Option: `' + opts.cmd + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'keywords' ) ) {
		opts.keywords = options.keywords;
		if ( !isStringArray( opts.keywords ) ) {
			return new TypeError( 'cp()::invalid option. Package keywords must be a string array. Option: `' + opts.keywords + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'license' ) ) {
		opts.license = options.license;
		if ( !isString( opts.license ) ) {
			return new TypeError( 'cp()::invalid option. Package license option must be a string primitive. Option: `' + opts.license + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
