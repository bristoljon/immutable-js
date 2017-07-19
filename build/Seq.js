///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('Seq', function () {
    it('can be empty', function () {
        expect(immutable_1.Seq().size).toBe(0);
    });
    it('accepts an array', function () {
        expect(immutable_1.Seq([1, 2, 3]).size).toBe(3);
    });
    it('accepts an object', function () {
        expect(immutable_1.Seq({ a: 1, b: 2, c: 3 }).size).toBe(3);
    });
    it('accepts an iterable string', function () {
        expect(immutable_1.Seq('foo').size).toBe(3);
    });
    it('accepts arbitrary objects', function () {
        function Foo() {
            this.bar = 'bar';
            this.baz = 'baz';
        }
        expect(immutable_1.Seq(new Foo()).size).toBe(2);
    });
    it('of accepts varargs', function () {
        expect(immutable_1.Seq.of(1, 2, 3).size).toBe(3);
    });
    it('accepts another sequence', function () {
        var seq = immutable_1.Seq.of(1, 2, 3);
        expect(immutable_1.Seq(seq).size).toBe(3);
    });
    it('accepts a string', function () {
        var seq = immutable_1.Seq('abc');
        expect(seq.size).toBe(3);
        expect(seq.get(1)).toBe('b');
        expect(seq.join('')).toBe('abc');
    });
    it('accepts an array-like', function () {
        var alike = { length: 2, 0: 'a', 1: 'b' };
        var seq = immutable_1.Seq(alike);
        expect(immutable_1.Iterable.isIndexed(seq)).toBe(true);
        expect(seq.size).toBe(2);
        expect(seq.get(1)).toBe('b');
    });
    it('does not accept a scalar', function () {
        expect(function () {
            immutable_1.Seq(3);
        }).toThrow('Expected Array or iterable object of values, or keyed object: 3');
    });
    it('detects sequences', function () {
        var seq = immutable_1.Seq.of(1, 2, 3);
        expect(immutable_1.Seq.isSeq(seq)).toBe(true);
        expect(immutable_1.Iterable.isIterable(seq)).toBe(true);
    });
    it('Does not infinite loop when sliced with NaN', function () {
        var list = immutable_1.Seq([1, 2, 3, 4, 5]);
        expect(list.slice(0, NaN).toJS()).toEqual([]);
        expect(list.slice(NaN).toJS()).toEqual([1, 2, 3, 4, 5]);
    });
    it('Does not infinite loop when spliced with negative number #559', function () {
        var dog = immutable_1.Seq(['d', 'o', 'g']);
        var dg = dog.filter(function (c) { return c !== 'o'; });
        var dig = dg.splice(-1, 0, 'i');
        expect(dig.toJS()).toEqual(['d', 'i', 'g']);
    });
    it('Does not infinite loop when an undefined number is passed to take', function () {
        var list = immutable_1.Seq([1, 2, 3, 4, 5]);
        expect(list.take(NaN).toJS()).toEqual([]);
    });
});
