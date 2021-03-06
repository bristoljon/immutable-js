///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('merge', function () {
    beforeEach(function () {
        this.addMatchers({
            is: function (expected) {
                return immutable_1.is(this.actual, expected);
            }
        });
    });
    it('merges two maps', function () {
        var m1 = immutable_1.Map({ a: 1, b: 2, c: 3 });
        var m2 = immutable_1.Map({ d: 10, b: 20, e: 30 });
        expect(m1.merge(m2)).is(immutable_1.Map({ a: 1, b: 20, c: 3, d: 10, e: 30 }));
    });
    it('can merge in an explicitly undefined value', function () {
        var m1 = immutable_1.Map({ a: 1, b: 2 });
        var m2 = immutable_1.Map({ a: undefined });
        expect(m1.merge(m2)).is(immutable_1.Map({ a: undefined, b: 2 }));
    });
    it('merges two maps with a merge function', function () {
        var m1 = immutable_1.Map({ a: 1, b: 2, c: 3 });
        var m2 = immutable_1.Map({ d: 10, b: 20, e: 30 });
        expect(m1.mergeWith(function (a, b) { return a + b; }, m2)).is(immutable_1.Map({ a: 1, b: 22, c: 3, d: 10, e: 30 }));
    });
    it('provides key as the third argument of merge function', function () {
        var m1 = immutable_1.Map({ id: 'temp', b: 2, c: 3 });
        var m2 = immutable_1.Map({ id: 10, b: 20, e: 30 });
        var add = function (a, b) { return a + b; };
        expect(m1.mergeWith(function (a, b, key) { return key !== 'id' ? add(a, b) : b; }, m2)).is(immutable_1.Map({ id: 10, b: 22, c: 3, e: 30 }));
    });
    it('deep merges two maps', function () {
        var m1 = immutable_1.fromJS({ a: { b: { c: 1, d: 2 } } });
        var m2 = immutable_1.fromJS({ a: { b: { c: 10, e: 20 }, f: 30 }, g: 40 });
        expect(m1.mergeDeep(m2)).is(immutable_1.fromJS({ a: { b: { c: 10, d: 2, e: 20 }, f: 30 }, g: 40 }));
    });
    it('deep merge uses is() for return-self optimization', function () {
        var date1 = new Date(1234567890000);
        var date2 = new Date(1234567890000);
        var m = immutable_1.Map().setIn(['a', 'b', 'c'], date1);
        var m2 = m.mergeDeep({ a: { b: { c: date2 } } });
        expect(m2 === m).toBe(true);
    });
    it('deep merges raw JS', function () {
        var m1 = immutable_1.fromJS({ a: { b: { c: 1, d: 2 } } });
        var js = { a: { b: { c: 10, e: 20 }, f: 30 }, g: 40 };
        expect(m1.mergeDeep(js)).is(immutable_1.fromJS({ a: { b: { c: 10, d: 2, e: 20 }, f: 30 }, g: 40 }));
    });
    it('deep merges raw JS with a merge function', function () {
        var m1 = immutable_1.fromJS({ a: { b: { c: 1, d: 2 } } });
        var js = { a: { b: { c: 10, e: 20 }, f: 30 }, g: 40 };
        expect(m1.mergeDeepWith(function (a, b) { return a + b; }, js)).is(immutable_1.fromJS({ a: { b: { c: 11, d: 2, e: 20 }, f: 30 }, g: 40 }));
    });
    it('returns self when a deep merges is a no-op', function () {
        var m1 = immutable_1.fromJS({ a: { b: { c: 1, d: 2 } } });
        expect(m1.mergeDeep({ a: { b: { c: 1 } } })).toBe(m1);
    });
    it('returns arg when a deep merges is a no-op', function () {
        var m1 = immutable_1.fromJS({ a: { b: { c: 1, d: 2 } } });
        expect(immutable_1.Map().mergeDeep(m1)).toBe(m1);
    });
    it('can overwrite existing maps', function () {
        expect(immutable_1.fromJS({ a: { x: 1, y: 1 }, b: { x: 2, y: 2 } })
            .merge({ a: null, b: { x: 10 } })
            .toJS()).toEqual({ a: null, b: { x: 10 } });
        expect(immutable_1.fromJS({ a: { x: 1, y: 1 }, b: { x: 2, y: 2 } })
            .mergeDeep({ a: null, b: { x: 10 } })
            .toJS()).toEqual({ a: null, b: { x: 10, y: 2 } });
    });
    it('can overwrite existing maps with objects', function () {
        var m1 = immutable_1.fromJS({ a: { x: 1, y: 1 } }); // deep conversion.
        var m2 = immutable_1.Map({ a: { z: 10 } }); // shallow conversion to Map.
        // raw object simply replaces map.
        expect(m1.merge(m2).get('a')).toEqual({ z: 10 }); // raw object.
        expect(m1.mergeDeep(m2).get('a')).toEqual({ z: 10 }); // raw object.
    });
    it('merges map entries with Vector values', function () {
        expect(immutable_1.fromJS({ a: [1] }).merge({ b: [2] })).is(immutable_1.fromJS({ a: [1], b: [2] }));
        expect(immutable_1.fromJS({ a: [1] }).mergeDeep({ b: [2] })).is(immutable_1.fromJS({ a: [1], b: [2] }));
    });
    it('maintains JS values inside immutable collections', function () {
        var m1 = immutable_1.fromJS({ a: { b: [{ imm: 'map' }] } });
        var m2 = m1.mergeDeep(immutable_1.Map({ a: immutable_1.Map({ b: immutable_1.List.of({ plain: 'obj' }) }) }));
        expect(m1.getIn(['a', 'b', 0])).is(immutable_1.Map([['imm', 'map']]));
        expect(m2.getIn(['a', 'b', 0])).toEqual({ plain: 'obj' });
    });
});
