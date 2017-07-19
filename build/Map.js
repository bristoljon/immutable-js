///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('Map', function () {
    it('converts from object', function () {
        var m = immutable_1.Map({ 'a': 'A', 'b': 'B', 'c': 'C' });
        expect(m.size).toBe(3);
        expect(m.get('a')).toBe('A');
        expect(m.get('b')).toBe('B');
        expect(m.get('c')).toBe('C');
    });
    it('constructor provides initial values', function () {
        var m = immutable_1.Map({ 'a': 'A', 'b': 'B', 'c': 'C' });
        expect(m.size).toBe(3);
        expect(m.get('a')).toBe('A');
        expect(m.get('b')).toBe('B');
        expect(m.get('c')).toBe('C');
    });
    it('constructor provides initial values as array of entries', function () {
        var m = immutable_1.Map([['a', 'A'], ['b', 'B'], ['c', 'C']]);
        expect(m.size).toBe(3);
        expect(m.get('a')).toBe('A');
        expect(m.get('b')).toBe('B');
        expect(m.get('c')).toBe('C');
    });
    it('constructor provides initial values as sequence', function () {
        var s = immutable_1.Seq({ 'a': 'A', 'b': 'B', 'c': 'C' });
        var m = immutable_1.Map(s);
        expect(m.size).toBe(3);
        expect(m.get('a')).toBe('A');
        expect(m.get('b')).toBe('B');
        expect(m.get('c')).toBe('C');
    });
    it('constructor provides initial values as list of lists', function () {
        var l = immutable_1.List([
            immutable_1.List(['a', 'A']),
            immutable_1.List(['b', 'B']),
            immutable_1.List(['c', 'C'])
        ]);
        var m = immutable_1.Map(l);
        expect(m.size).toBe(3);
        expect(m.get('a')).toBe('A');
        expect(m.get('b')).toBe('B');
        expect(m.get('c')).toBe('C');
    });
    it('constructor is identity when provided map', function () {
        var m1 = immutable_1.Map({ 'a': 'A', 'b': 'B', 'c': 'C' });
        var m2 = immutable_1.Map(m1);
        expect(m2).toBe(m1);
    });
    it('does not accept a scalar', function () {
        expect(function () {
            immutable_1.Map(3);
        }).toThrow('Expected Array or iterable object of [k, v] entries, or keyed object: 3');
    });
    it('does not accept strings (iterable, but scalar)', function () {
        expect(function () {
            immutable_1.Map('abc');
        }).toThrow();
    });
    it('does not accept non-entries array', function () {
        expect(function () {
            immutable_1.Map([1, 2, 3]);
        }).toThrow('Expected [K, V] tuple: 1');
    });
    it('accepts non-iterable array-like objects as keyed collections', function () {
        var m = immutable_1.Map({ 'length': 3, '1': 'one' });
        expect(m.get('length')).toBe(3);
        expect(m.get('1')).toBe('one');
        expect(m.toJS()).toEqual({ 'length': 3, '1': 'one' });
    });
    it('accepts flattened pairs via of()', function () {
        var m = immutable_1.Map.of(1, 'a', 2, 'b', 3, 'c');
        expect(m.size).toBe(3);
        expect(m.get(1)).toBe('a');
        expect(m.get(2)).toBe('b');
        expect(m.get(3)).toBe('c');
    });
    it('does not accept mismatched flattened pairs via of()', function () {
        expect(function () {
            immutable_1.Map.of(1, 2, 3);
        }).toThrow('Missing value for key: 3');
    });
    it('converts back to JS object', function () {
        var m = immutable_1.Map({ 'a': 'A', 'b': 'B', 'c': 'C' });
        expect(m.toObject()).toEqual({ 'a': 'A', 'b': 'B', 'c': 'C' });
    });
    it('iterates values', function () {
        var m = immutable_1.Map({ 'a': 'A', 'b': 'B', 'c': 'C' });
        var iterator = jest.genMockFunction();
        m.forEach(iterator);
        expect(iterator.mock.calls).toEqual([
            ['A', 'a', m],
            ['B', 'b', m],
            ['C', 'c', m]
        ]);
    });
    it('merges two maps', function () {
        var m1 = immutable_1.Map({ 'a': 'A', 'b': 'B', 'c': 'C' });
        var m2 = immutable_1.Map({ 'wow': 'OO', 'd': 'DD', 'b': 'BB' });
        expect(m2.toObject()).toEqual({ 'wow': 'OO', 'd': 'DD', 'b': 'BB' });
        var m3 = m1.merge(m2);
        expect(m3.toObject()).toEqual({ 'a': 'A', 'b': 'BB', 'c': 'C', 'wow': 'OO', 'd': 'DD' });
    });
    it('accepts null as a key', function () {
        var m1 = immutable_1.Map();
        var m2 = m1.set(null, 'null');
        var m3 = m2.remove(null);
        expect(m1.size).toBe(0);
        expect(m2.size).toBe(1);
        expect(m3.size).toBe(0);
        expect(m2.get(null)).toBe('null');
    });
    it('is persistent to sets', function () {
        var m1 = immutable_1.Map();
        var m2 = m1.set('a', 'Aardvark');
        var m3 = m2.set('b', 'Baboon');
        var m4 = m3.set('c', 'Canary');
        var m5 = m4.set('b', 'Bonobo');
        expect(m1.size).toBe(0);
        expect(m2.size).toBe(1);
        expect(m3.size).toBe(2);
        expect(m4.size).toBe(3);
        expect(m5.size).toBe(3);
        expect(m3.get('b')).toBe('Baboon');
        expect(m5.get('b')).toBe('Bonobo');
    });
    it('is persistent to deletes', function () {
        var m1 = immutable_1.Map();
        var m2 = m1.set('a', 'Aardvark');
        var m3 = m2.set('b', 'Baboon');
        var m4 = m3.set('c', 'Canary');
        var m5 = m4.remove('b');
        expect(m1.size).toBe(0);
        expect(m2.size).toBe(1);
        expect(m3.size).toBe(2);
        expect(m4.size).toBe(3);
        expect(m5.size).toBe(2);
        expect(m3.has('b')).toBe(true);
        expect(m3.get('b')).toBe('Baboon');
        expect(m5.has('b')).toBe(false);
        expect(m5.get('b')).toBe(undefined);
        expect(m5.get('c')).toBe('Canary');
    });
    check.it('deletes down to empty map', [gen.posInt], function (size) {
        var m = immutable_1.Range(0, size).toMap();
        expect(m.size).toBe(size);
        for (var ii = size - 1; ii >= 0; ii--) {
            m = m.remove(ii);
            expect(m.size).toBe(ii);
        }
        expect(m).toBe(immutable_1.Map());
    });
    it('can map many items', function () {
        var m = immutable_1.Map();
        for (var ii = 0; ii < 2000; ii++) {
            m = m.set('thing:' + ii, ii);
        }
        expect(m.size).toBe(2000);
        expect(m.get('thing:1234')).toBe(1234);
    });
    it('can use weird keys', function () {
        var m = immutable_1.Map()
            .set(NaN, 1)
            .set(Infinity, 2)
            .set(-Infinity, 3);
        expect(m.get(NaN)).toBe(1);
        expect(m.get(Infinity)).toBe(2);
        expect(m.get(-Infinity)).toBe(3);
    });
    it('can map items known to hash collide', function () {
        // make a big map, so it hashmaps
        var m = immutable_1.Range(0, 32).toMap();
        var m = m.set('AAA', 'letters').set(64545, 'numbers');
        expect(m.size).toBe(34);
        expect(m.get('AAA')).toEqual('letters');
        expect(m.get(64545)).toEqual('numbers');
    });
    it('can progressively add items known to collide', function () {
        // make a big map, so it hashmaps
        var map = immutable_1.Range(0, 32).toMap();
        map = map.set('@', '@');
        map = map.set(64, 64);
        map = map.set(96, 96);
        expect(map.size).toBe(35);
        expect(map.get('@')).toBe('@');
        expect(map.get(64)).toBe(64);
        expect(map.get(96)).toBe(96);
    });
    it('maps values', function () {
        var m = immutable_1.Map({ a: 'a', b: 'b', c: 'c' });
        var r = m.map(function (value) { return value.toUpperCase(); });
        expect(r.toObject()).toEqual({ a: 'A', b: 'B', c: 'C' });
    });
    it('maps keys', function () {
        var m = immutable_1.Map({ a: 'a', b: 'b', c: 'c' });
        var r = m.mapKeys(function (key) { return key.toUpperCase(); });
        expect(r.toObject()).toEqual({ A: 'a', B: 'b', C: 'c' });
    });
    it('filters values', function () {
        var m = immutable_1.Map({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        var r = m.filter(function (value) { return value % 2 === 1; });
        expect(r.toObject()).toEqual({ a: 1, c: 3, e: 5 });
    });
    it('filterNots values', function () {
        var m = immutable_1.Map({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        var r = m.filterNot(function (value) { return value % 2 === 1; });
        expect(r.toObject()).toEqual({ b: 2, d: 4, f: 6 });
    });
    it('derives keys', function () {
        var v = immutable_1.Map({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        expect(v.keySeq().toArray()).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
    it('flips keys and values', function () {
        var v = immutable_1.Map({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        expect(v.flip().toObject()).toEqual({ 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f' });
    });
    it('can convert to a list', function () {
        var m = immutable_1.Map({ a: 1, b: 2, c: 3 });
        var v = m.toList();
        var k = m.keySeq().toList();
        expect(v.size).toBe(3);
        expect(k.size).toBe(3);
        // Note: Map has undefined ordering, this List may not be the same
        // order as the order you set into the Map.
        expect(v.get(1)).toBe(2);
        expect(k.get(1)).toBe('b');
    });
    check.it('works like an object', { maxSize: 50 }, [gen.object(gen.JSONPrimitive)], function (obj) {
        var map = immutable_1.Map(obj);
        Object.keys(obj).forEach(function (key) {
            expect(map.get(key)).toBe(obj[key]);
            expect(map.has(key)).toBe(true);
        });
        Object.keys(obj).forEach(function (key) {
            expect(map.get(key)).toBe(obj[key]);
            expect(map.has(key)).toBe(true);
            map = map.remove(key);
            expect(map.get(key)).toBe(undefined);
            expect(map.has(key)).toBe(false);
        });
    });
    check.it('sets', { maxSize: 5000 }, [gen.posInt], function (len) {
        var map = immutable_1.Map();
        for (var ii = 0; ii < len; ii++) {
            expect(map.size).toBe(ii);
            map = map.set('' + ii, ii);
        }
        expect(map.size).toBe(len);
        expect(immutable_1.is(map.toSet(), immutable_1.Range(0, len).toSet())).toBe(true);
    });
    check.it('has and get', { maxSize: 5000 }, [gen.posInt], function (len) {
        var map = immutable_1.Range(0, len).toKeyedSeq().mapKeys(function (x) { return '' + x; }).toMap();
        for (var ii = 0; ii < len; ii++) {
            expect(map.get('' + ii)).toBe(ii);
            expect(map.has('' + ii)).toBe(true);
        }
    });
    check.it('deletes', { maxSize: 5000 }, [gen.posInt], function (len) {
        var map = immutable_1.Range(0, len).toMap();
        for (var ii = 0; ii < len; ii++) {
            expect(map.size).toBe(len - ii);
            map = map.remove(ii);
        }
        expect(map.size).toBe(0);
        expect(map.toObject()).toEqual({});
    });
    check.it('deletes from transient', { maxSize: 5000 }, [gen.posInt], function (len) {
        var map = immutable_1.Range(0, len).toMap().asMutable();
        for (var ii = 0; ii < len; ii++) {
            expect(map.size).toBe(len - ii);
            map.remove(ii);
        }
        expect(map.size).toBe(0);
        expect(map.toObject()).toEqual({});
    });
    check.it('iterates through all entries', [gen.posInt], function (len) {
        var v = immutable_1.Range(0, len).toMap();
        var a = v.toArray();
        var iter = v.entries();
        for (var ii = 0; ii < len; ii++) {
            delete a[iter.next().value[0]];
        }
        expect(a).toEqual(new Array(len));
    });
    it('allows chained mutations', function () {
        var m1 = immutable_1.Map();
        var m2 = m1.set('a', 1);
        var m3 = m2.withMutations(function (m) { return m.set('b', 2).set('c', 3); });
        var m4 = m3.set('d', 4);
        expect(m1.toObject()).toEqual({});
        expect(m2.toObject()).toEqual({ 'a': 1 });
        expect(m3.toObject()).toEqual({ 'a': 1, 'b': 2, 'c': 3 });
        expect(m4.toObject()).toEqual({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 });
    });
    it('expresses value equality with unordered sequences', function () {
        var m1 = immutable_1.Map({ A: 1, B: 2, C: 3 });
        var m2 = immutable_1.Map({ C: 3, B: 2, A: 1 });
        expect(immutable_1.is(m1, m2)).toBe(true);
    });
});