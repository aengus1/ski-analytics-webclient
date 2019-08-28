


/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.


/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone'; // Included with Angular CLI.
/**
 * required for aws-amplify as it isn't fully angular 8 compatible: https://github.com/aws-amplify/amplify-js/issues/3193
 */
import * as process from 'process';


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
window['process'] = process;
