'use strict';

var useProfile = require('./hooks/use-profile');
var useSchool = require('./hooks/use-school');
var tanstackProvider = require('./providers/tanstack-provider');



Object.keys(useProfile).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return useProfile[k]; }
	});
});
Object.keys(useSchool).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return useSchool[k]; }
	});
});
Object.keys(tanstackProvider).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return tanstackProvider[k]; }
	});
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map