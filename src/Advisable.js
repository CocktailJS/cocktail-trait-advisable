'use strict';

var cocktail = require('cocktail');

function resolvedAdvice(advice, scope){
    if (typeof advice === 'string') {
        advice = scope[advice];
    }
    return advice;
}

cocktail.mix({
    '@exports': module,
    '@as'     : 'class',

    /**
     * @method after
     * @param method {String} the method on the current instance to be adviced.
     * @param advice {String|Function} the method or the name of the method to be executed as advice.
     * @param scope  {Object} the scope for the advice method. Optional. 
     */
    after: function (method, advice, scope){
        var base = this[method],
            ret;

        scope  = (scope === undefined ? this : scope); //scope can be null
        advice = resolvedAdvice(advice, scope);

        if (base) {
            this[method] = function _advicedAfter() {
                ret = base.apply(this, arguments);
                advice.apply(scope, arguments);
                return ret;
            };
        }
    },

    /**
     * @method before
     * @param method {String} the method on the current instance to be adviced.
     * @param advice {String|Function} the method or the name of the method to be executed as advice.
     * @param scope  {Object} the scope for the advice method. Optional. 
     */
    before: function (method, advice, scope){
        var base = this[method];
        
        scope  = (scope === undefined ? this : scope); //scope can be null
        advice = resolvedAdvice(advice, scope);
        
        if (base) {
            this[method] = function _advicedBefore() {
                advice.apply(scope, arguments);
                return base.apply(this, arguments);
            };
        }
    },

    /**
     * @method around
     * @param method {String} the method on the current instance to be adviced.
     * @param advice {String|Function} the method or the name of the method to be executed as advice.
     * @param scope  {Object} the scope for the advice method. Optional. 
     */
    around: function (method, advice, scope){
        var base = this[method],
            args;

        scope  = (scope === undefined ? this : scope); //scope can be null
        advice = resolvedAdvice(advice, scope);
        
        if (base) {
            this[method] = function _advicedAround() {
                args = Array.prototype.slice.call(arguments);
                args.unshift(base);
                return advice.apply(scope, args);
            };
        }
    }

});
