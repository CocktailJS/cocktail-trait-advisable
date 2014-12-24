'use strict';

var cocktail = require('cocktail');

cocktail.mix({
    '@exports': module,
    '@as'     : 'class',

    after: function (method, advice){
        var base = this[method],
            ret;

        if (base) {
            this[method] = function _advicedAfter() {
                ret = base.apply(this, arguments);
                advice.apply(this, arguments);
                return ret;
            };
        }
    },

    before: function (method, advice){
        var base = this[method];

        if (base) {
            this[method] = function _advicedBefore() {
                advice.apply(this, arguments);
                return base.apply(this, arguments);
            };
        }
    },

    around: function (method, advice){
        var base = this[method],
            args;

        if (base) {
            this[method] = function _advicedAround() {
                args = Array.prototype.slice.call(arguments);
                args.unshift(base);
                return advice.apply(this, args);
            };
        }
    }

});
