///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('Set', function () {
    beforeEach(function () {
        this.addMatchers({
            is: function (expected) {
                return immutable_1.is(this.actual, expected);
            }
        });
    });
    it('accepts array of values', function () {
        var s = immutable_1.Set([1, 2, 3]);
        expect(s.has(1)).toBe(true);
        expect(s.has(2)).toBe(true);
        expect(s.has(3)).toBe(true);
        expect(s.has(4)).toBe(false);
    });
    it('accepts array-like of values', function () {
        var s = immutable_1.Set({ 'length': 3, '1': 2 });
        expect(s.size).toBe(2);
        expect(s.has(undefined)).toBe(true);
        expect(s.has(2)).toBe(true);
        expect(s.has(1)).toBe(false);
    });
    it('accepts string, an array-like iterable', function () {
        var s = immutable_1.Set('abc');
        expect(s.size).toBe(3);
        expect(s.has('a')).toBe(true);
        expect(s.has('b')).toBe(true);
        expect(s.has('c')).toBe(true);
        expect(s.has('abc')).toBe(false);
    });
    it('accepts sequence of values', function () {
        var seq = immutable_1.Seq.of(1, 2, 3);
        var s = immutable_1.Set(seq);
        expect(s.has(1)).toBe(true);
        expect(s.has(2)).toBe(true);
        expect(s.has(3)).toBe(true);
        expect(s.has(4)).toBe(false);
    });
    it('accepts a keyed Seq as a set of entries', function () {
        var seq = immutable_1.Seq({ a: null, b: null, c: null }).flip();
        var s = immutable_1.Set(seq);
        expect(s.toArray()).toEqual([[null, 'a'], [null, 'b'], [null, 'c']]);
        // Explicitly getting the values sequence
        var s2 = immutable_1.Set(seq.valueSeq());
        expect(s2.toArray()).toEqual(['a', 'b', 'c']);
        // toSet() does this for you.
        var v3 = seq.toSet();
        expect(v3.toArray()).toEqual(['a', 'b', 'c']);
    });
    it('accepts object keys', function () {
        var s = immutable_1.Set.fromKeys({ a: null, b: null, c: null });
        expect(s.has('a')).toBe(true);
        expect(s.has('b')).toBe(true);
        expect(s.has('c')).toBe(true);
        expect(s.has('d')).toBe(false);
    });
    it('accepts sequence keys', function () {
        var seq = immutable_1.Seq({ a: null, b: null, c: null });
        var s = immutable_1.Set.fromKeys(seq);
        expect(s.has('a')).toBe(true);
        expect(s.has('b')).toBe(true);
        expect(s.has('c')).toBe(true);
        expect(s.has('d')).toBe(false);
    });
    it('accepts explicit values', function () {
        var s = immutable_1.Set.of(1, 2, 3);
        expect(s.has(1)).toBe(true);
        expect(s.has(2)).toBe(true);
        expect(s.has(3)).toBe(true);
        expect(s.has(4)).toBe(false);
    });
    it('converts back to JS array', function () {
        var s = immutable_1.Set.of(1, 2, 3);
        expect(s.toArray()).toEqual([1, 2, 3]);
    });
    it('converts back to JS object', function () {
        var s = immutable_1.Set.of('a', 'b', 'c');
        expect(s.toObject()).toEqual({ a: 'a', b: 'b', c: 'c' });
    });
    it('iterates values', function () {
        var s = immutable_1.Set.of(1, 2, 3);
        var iterator = jest.genMockFunction();
        s.forEach(iterator);
        expect(iterator.mock.calls).toEqual([
            [1, 1, s],
            [2, 2, s],
            [3, 3, s]
        ]);
    });
    it('unions two sets', function () {
        var s1 = immutable_1.Set.of('a', 'b', 'c');
        var s2 = immutable_1.Set.of('d', 'b', 'wow');
        var s3 = s1.union(s2);
        expect(s3.toArray()).toEqual(['a', 'b', 'c', 'd', 'wow']);
    });
    it('returns self when union results in no-op', function () {
        var s1 = immutable_1.Set.of('a', 'b', 'c');
        var s2 = immutable_1.Set.of('c', 'a');
        var s3 = s1.union(s2);
        expect(s3).toBe(s1);
    });
    it('returns arg when union results in no-op', function () {
        var s1 = immutable_1.Set();
        var s2 = immutable_1.Set.of('a', 'b', 'c');
        var s3 = s1.union(s2);
        expect(s3).toBe(s2);
    });
    it('unions a set and an iterable and returns a set', function () {
        var s1 = immutable_1.Set([1, 2, 3]);
        var emptySet = immutable_1.Set();
        var l = immutable_1.List([1, 2, 3]);
        var s2 = s1.union(l);
        var s3 = emptySet.union(l);
        var o = immutable_1.OrderedSet([1, 2, 3]);
        var s4 = s1.union(o);
        var s5 = emptySet.union(o);
        expect(immutable_1.Set.isSet(s2)).toBe(true);
        expect(immutable_1.Set.isSet(s3)).toBe(true);
        expect(immutable_1.Set.isSet(s4) && !immutable_1.OrderedSet.isOrderedSet(s4)).toBe(true);
        expect(immutable_1.Set.isSet(s5) && !immutable_1.OrderedSet.isOrderedSet(s5)).toBe(true);
    });
    it('is persistent to adds', function () {
        var s1 = immutable_1.Set();
        var s2 = s1.add('a');
        var s3 = s2.add('b');
        var s4 = s3.add('c');
        var s5 = s4.add('b');
        expect(s1.size).toBe(0);
        expect(s2.size).toBe(1);
        expect(s3.size).toBe(2);
        expect(s4.size).toBe(3);
        expect(s5.size).toBe(3);
    });
    it('is persistent to deletes', function () {
        var s1 = immutable_1.Set();
        var s2 = s1.add('a');
        var s3 = s2.add('b');
        var s4 = s3.add('c');
        var s5 = s4.remove('b');
        expect(s1.size).toBe(0);
        expect(s2.size).toBe(1);
        expect(s3.size).toBe(2);
        expect(s4.size).toBe(3);
        expect(s5.size).toBe(2);
        expect(s3.has('b')).toBe(true);
        expect(s5.has('b')).toBe(false);
    });
    it('deletes down to empty set', function () {
        var s = immutable_1.Set.of('A').remove('A');
        expect(s).toBe(immutable_1.Set());
    });
    it('unions multiple sets', function () {
        var s = immutable_1.Set.of('A', 'B', 'C').union(immutable_1.Set.of('C', 'D', 'E'), immutable_1.Set.of('D', 'B', 'F'));
        expect(s).is(immutable_1.Set.of('A', 'B', 'C', 'D', 'E', 'F'));
    });
    it('intersects multiple sets', function () {
        var s = immutable_1.Set.of('A', 'B', 'C').intersect(immutable_1.Set.of('B', 'C', 'D'), immutable_1.Set.of('A', 'C', 'E'));
        expect(s).is(immutable_1.Set.of('C'));
    });
    it('diffs multiple sets', function () {
        var s = immutable_1.Set.of('A', 'B', 'C').subtract(immutable_1.Set.of('C', 'D', 'E'), immutable_1.Set.of('D', 'B', 'F'));
        expect(s).is(immutable_1.Set.of('A'));
    });
    it('expresses value equality with set sequences', function () {
        var s1 = immutable_1.Set.of('A', 'B', 'C');
        expect(s1.equals(null)).toBe(false);
        var s2 = immutable_1.Set.of('C', 'B', 'A');
        expect(s1 === s2).toBe(false);
        expect(immutable_1.is(s1, s2)).toBe(true);
        expect(s1.equals(s2)).toBe(true);
        // Map and Set are not the same (keyed vs unkeyed)
        var v1 = immutable_1.Map({ A: 'A', C: 'C', B: 'B' });
        expect(immutable_1.is(s1, v1)).toBe(false);
    });
    it('can use union in a withMutation', function () {
        var js = immutable_1.Set().withMutations(function (set) {
            set.union(['a']);
            set.add('b');
        }).toJS();
        expect(js).toEqual(['a', 'b']);
    });
    it('can determine if an array is a subset', function () {
        var s = immutable_1.Set.of('A', 'B', 'C');
        expect(s.isSuperset(['B', 'C'])).toBe(true);
        expect(s.isSuperset(['B', 'C', 'D'])).toBe(false);
    });
    describe('accepts Symbol as entry #579', function () {
        if (typeof Symbol !== 'function') {
            Symbol = function (key) {
                return { key: key, __proto__: Symbol };
            };
            Symbol.toString = function () {
                return 'Symbol(' + (this.key || '') + ')';
            };
        }
        it('operates on small number of symbols, preserving set uniqueness', function () {
            var a = Symbol();
            var b = Symbol();
            var c = Symbol();
            var symbolSet = immutable_1.Set([a, b, c, a, b, c, a, b, c, a, b, c]);
            expect(symbolSet.size).toBe(3);
            expect(symbolSet.has(b)).toBe(true);
            expect(symbolSet.get(c)).toEqual(c);
        });
        it('operates on a large number of symbols, maintaining obj uniqueness', function () {
            var manySymbols = [
                Symbol('a'), Symbol('b'), Symbol('c'),
                Symbol('a'), Symbol('b'), Symbol('c'),
                Symbol('a'), Symbol('b'), Symbol('c'),
                Symbol('a'), Symbol('b'), Symbol('c'),
            ];
            var symbolSet = immutable_1.Set(manySymbols);
            expect(symbolSet.size).toBe(12);
            expect(symbolSet.has(manySymbols[10])).toBe(true);
            expect(symbolSet.get(manySymbols[10])).toEqual(manySymbols[10]);
        });
    });
    // TODO: more tests
});
