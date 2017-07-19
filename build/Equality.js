///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('Equality', function () {
    function expectIs(left, right) {
        var comparison = immutable_1.is(left, right);
        expect(comparison).toBe(true);
        var commutative = immutable_1.is(right, left);
        expect(commutative).toBe(true);
    }
    function expectIsNot(left, right) {
        var comparison = immutable_1.is(left, right);
        expect(comparison).toBe(false);
        var commutative = immutable_1.is(right, left);
        expect(commutative).toBe(false);
    }
    it('uses Object.is semantics', function () {
        expectIs(null, null);
        expectIs(undefined, undefined);
        expectIsNot(undefined, null);
        expectIs(true, true);
        expectIs(false, false);
        expectIsNot(true, false);
        expectIs(123, 123);
        expectIsNot(123, -123);
        expectIs(NaN, NaN);
        expectIs(0, 0);
        expectIs(-0, -0);
        // Note: Unlike Object.is, is assumes 0 and -0 are the same value,
        // matching the behavior of ES6 Map key equality.
        expectIs(0, -0);
        expectIs(NaN, 0 / 0);
        var string = "hello";
        expectIs(string, string);
        expectIs(string, "hello");
        expectIsNot("hello", "HELLO");
        expectIsNot("hello", "goodbye");
        var array = [1, 2, 3];
        expectIs(array, array);
        expectIsNot(array, [1, 2, 3]);
        var object = { key: 'value' };
        expectIs(object, object);
        expectIsNot(object, { key: 'value' });
    });
    it('dereferences things', function () {
        var ptrA = { foo: 1 }, ptrB = { foo: 2 };
        expectIsNot(ptrA, ptrB);
        ptrA.valueOf = ptrB.valueOf = function () {
            return 5;
        };
        expectIs(ptrA, ptrB);
        var object = { key: 'value' };
        ptrA.valueOf = ptrB.valueOf = function () {
            return object;
        };
        expectIs(ptrA, ptrB);
        ptrA.valueOf = ptrB.valueOf = function () {
            return null;
        };
        expectIs(ptrA, ptrB);
        ptrA.valueOf = ptrB.valueOf = function () {
            return void 0;
        };
        expectIs(ptrA, ptrB);
        ptrA.valueOf = function () {
            return 4;
        };
        ptrB.valueOf = function () {
            return 5;
        };
        expectIsNot(ptrA, ptrB);
    });
    it('compares sequences', function () {
        var arraySeq = immutable_1.Seq.of(1, 2, 3);
        var arraySeq2 = immutable_1.Seq([1, 2, 3]);
        expectIs(arraySeq, arraySeq);
        expectIs(arraySeq, immutable_1.Seq.of(1, 2, 3));
        expectIs(arraySeq2, arraySeq2);
        expectIs(arraySeq2, immutable_1.Seq([1, 2, 3]));
        expectIsNot(arraySeq, [1, 2, 3]);
        expectIsNot(arraySeq2, [1, 2, 3]);
        expectIs(arraySeq, arraySeq2);
        expectIs(arraySeq, arraySeq.map(function (x) { return x; }));
        expectIs(arraySeq2, arraySeq2.map(function (x) { return x; }));
    });
    it('compares lists', function () {
        var list = immutable_1.List.of(1, 2, 3);
        expectIs(list, list);
        expectIsNot(list, [1, 2, 3]);
        expectIs(list, immutable_1.Seq.of(1, 2, 3));
        expectIs(list, immutable_1.List.of(1, 2, 3));
        var listLonger = list.push(4);
        expectIsNot(list, listLonger);
        var listShorter = listLonger.pop();
        expect(list === listShorter).toBe(false);
        expectIs(list, listShorter);
    });
    var genSimpleVal = gen.returnOneOf(['A', 1]);
    var genVal = gen.oneOf([
        gen.map(immutable_1.List, gen.array(genSimpleVal, 0, 4)),
        gen.map(immutable_1.Set, gen.array(genSimpleVal, 0, 4)),
        gen.map(immutable_1.Map, gen.array(gen.array(genSimpleVal, 2), 0, 4))
    ]);
    check.it('has symmetric equality', { times: 1000 }, [genVal, genVal], function (a, b) {
        expect(immutable_1.is(a, b)).toBe(immutable_1.is(b, a));
    });
    check.it('has hash equality', { times: 1000 }, [genVal, genVal], function (a, b) {
        if (immutable_1.is(a, b)) {
            expect(a.hashCode()).toBe(b.hashCode());
        }
    });
    describe('hash', function () {
        it('differentiates decimals', function () {
            expect(immutable_1.Seq.of(1.5).hashCode()).not.toBe(immutable_1.Seq.of(1.6).hashCode());
        });
    });
});
