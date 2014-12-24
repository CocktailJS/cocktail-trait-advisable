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

        it('should execute the method right after the adviced method', function () {
            var sut = new AdvicedClass(),
                afterSpy = sinon.spy();

            sut.after('method', afterSpy);

            sut.method();

            expect(advicedMethod).to.be.calledWith(undefined);
            expect(afterSpy).to.be.calledWith(undefined);
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
            
        });       

    });

    describe('Advice before', function () {

        it('should execute the method right before the adviced method', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy();

            sut.before('method', beforeSpy);

            sut.method();

            expect(beforeSpy).to.be.calledWith(undefined);
            expect(advicedMethod).to.be.calledWith(undefined);
            
        });

        it('should execute the method right before the adviced method with the same parameters ', function () {
            var sut = new AdvicedClass(),
                beforeSpy = sinon.spy(),
                param1 = '1',
                param2 = 100;

            sut.before('method', beforeSpy);

            sut.method(param1, param2);

            expect(beforeSpy).to.be.calledWith(param1, param2);
            expect(advicedMethod).to.be.calledWith(param1, param2);
            
        });        
    });    

    describe('Advice around', function () {

        it('should execute the method around the adviced method', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy();
            
            sut.around('method', aroundSpy);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the method around the adviced method with the same parameters', function () {
            var sut = new AdvicedClass(),
                aroundSpy = sinon.spy(),
                param1 = '1',
                param2 = 100;

            sut.around('method', aroundSpy);

            sut.method(param1, param2);

            expect(aroundSpy).to.be.calledWith(advicedMethod, param1, param2);
            expect(advicedMethod).to.not.be.called;

        });

        it('should execute the adviced method if it is called from the around method', function () {
            var sut = new AdvicedClass(),
                aroundFn = function (m) {m.apply(this);},
                aroundSpy = sinon.spy(aroundFn);
            
            sut.around('method', aroundSpy);
            sut.method();

            expect(aroundSpy).to.be.calledWith(advicedMethod);
            expect(advicedMethod).to.be.called;

        });

    });
});