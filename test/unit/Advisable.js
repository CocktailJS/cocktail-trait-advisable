'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect,
    cocktail = require('cocktail'),
    Advisable = require('../../src/Advisable');

chai.use(sinonChai);

describe('Advisable Trait Unit Test', function (){
    var AdvicedClass;
    var advicedMethod;

    beforeEach(function(){
        advicedMethod = sinon.spy();

        AdvicedClass = cocktail.mix({
            '@as': 'class',
            '@traits': [Advisable],

            method: advicedMethod
        });    
    });

    describe('Advice after', function () {

        it('should execute the advice right after the adviced method', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy();

            sut.after('method', afterSpy);

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledOn(sut);
        });

        it('should execute the advice right after the adviced method on the given scope', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy(),
                scope = {};

            sut.after('method', afterSpy, scope);

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledOn(scope);
        });

        it('should execute the advice right after the adviced method on the given scope even if scope is null', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy(),
                scope = null;

            sut.after('method', afterSpy, scope);

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledOn(scope);
        });

        it('should execute the advice right after the adviced method on `this` if no scope is defined', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy();

            sut.afterMethod = afterSpy;

            sut.after('method', 'afterMethod');

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledOn(sut);
        });

        it('should execute the advice right after the adviced method on the given scope', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy(),
                scope = {
                    afterMethod: afterSpy
                };

            sut.afterMethod = afterSpy;

            sut.after('method', 'afterMethod', scope);

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledOn(scope);
        });

        it('should execute the method right after the adviced method with the same parameters ', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy(),
                param1 = '1',
                param2 = 100;

            sut.before('method', afterSpy);

            sut.method(param1, param2);

            expect(advicedMethod).to.be.calledWith(param1, param2);
            expect(afterSpy).to.be.calledWith(param1, param2);
            expect(afterSpy).to.be.calledOn(sut);
            
        });

    });

    describe('Advice before', function () {

        it('should execute the advice right before the adviced method', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy();

            sut.before('method', beforeSpy);

            sut.method();

            expect(beforeSpy).to.be.calledWith(undefined);
            expect(advicedMethod).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledOn(sut);
            
        });

        it('should execute the advice right before the adviced method with the given scope', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy(),
                scope = {};

            sut.before('method', beforeSpy, scope);

            sut.method();

            expect(beforeSpy).to.be.calledWith(undefined);
            expect(advicedMethod).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledOn(scope);
            
        });

        it('should execute the advice right before the adviced method with the given scope even if scope is null', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy(),
                scope = null;

            sut.before('method', beforeSpy, scope);

            sut.method();

            expect(beforeSpy).to.be.calledWith(undefined);
            expect(advicedMethod).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledOn(scope);
            
        });

        it('should execute the advice right before the adviced method on `this` if no scope is defined', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy();

            sut.beforeMethod = beforeSpy;

            sut.before('method', 'beforeMethod');

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledOn(sut);
        });

        it('should execute the advice right before the adviced method on the given scope', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy(),
                scope = {
                    beforeMethod: beforeSpy
                };

            sut.beforeMethod = beforeSpy;

            sut.after('method', 'beforeMethod', scope);

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledWith(undefined);
            expect(beforeSpy).to.be.calledOn(scope);
        });

        it('should execute the advice right before the adviced method with the same parameters ', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy(),
                param1 = '1',
                param2 = 100;

            sut.before('method', beforeSpy);

            sut.method(param1, param2);

            expect(beforeSpy).to.be.calledWith(param1, param2);
            expect(advicedMethod).to.be.calledWith(param1, param2);
            expect(beforeSpy).to.be.calledOn(sut);
            
        });        
    });    

    describe('Advice around', function () {

        it('should execute the advice around the adviced method', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy();
            
            sut.around('method', aroundSpy);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(aroundSpy).to.be.calledOn(sut);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the advice around the adviced method with the given scope', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy(),
                scope = {};
            
            sut.around('method', aroundSpy, scope);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(aroundSpy).to.be.calledOn(scope);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the advice around the adviced method on `this`', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy();
            
            sut.aroundMethod = aroundSpy;

            sut.around('method', 'aroundMethod');
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(aroundSpy).to.be.calledOn(sut);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the advice around the adviced method on the given scope', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy(),
                scope = {
                    aroundMethod: aroundSpy
                };
            

            sut.around('method', 'aroundMethod', scope);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(aroundSpy).to.be.calledOn(scope);
            expect(advicedMethod).to.not.be.called;

        });        

        it('should execute the advice around the adviced method with the given scope even if scope is null', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy(),
                scope = null;
            
            sut.around('method', aroundSpy, scope);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(aroundSpy).to.be.calledOn(scope);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the advice around the adviced method with the same parameters', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy(),
                param1 = '1',
                param2 = 100;

            sut.around('method', aroundSpy);

            sut.method(param1, param2);

            expect(aroundSpy).to.be.calledWith(advicedMethod, param1, param2);
            expect(aroundSpy).to.be.calledOn(sut);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the adviced method if it is called from the around advice', function () {
            var sut = new AdvicedClass(),
                aroundFn = function (m) {m.apply(this);},
                aroundSpy = sinon.spy(aroundFn);
            
            sut.around('method', aroundSpy);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(aroundSpy).to.be.calledOn(sut);
            expect(advicedMethod).to.be.called;

        });

    });
});