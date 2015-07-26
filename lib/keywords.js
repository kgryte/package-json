'use strict';

/**
* FUNCTION: keywords( words )
*	Serializes an array of keywords as a formatted string.
*
* @param {String[]} words - keywords
* @returns {String} serialized string
*/
function keywords( words ) {
	var len = words.length,
		n = len - 1,
		out,
		i;

	out = '';
	for ( i = 0; i < len; i++ ) {
		out += '\n\t\t';
		out += '\"' + words[ i ] + '\"';
		if ( i === n ) {
			out += '\n\t';
		} else {
			out += ',';
		}
	}
	return out;
} // end FUNCTION keywords()


// EXPORTS //

module.exports = keywords;
