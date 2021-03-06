///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('count', function () {
    it('counts sequences with known lengths', function () {
        expect(immutable_1.Seq.of(1, 2, 3, 4, 5).size).toBe(5);
        expect(immutable_1.Seq.of(1, 2, 3, 4, 5).count()).toBe(5);
    });
    it('counts sequences with unknown lengths, resulting in a cached size', function () {
        var seq = immutable_1.Seq.of(1, 2, 3, 4, 5, 6).filter(function (x) { return x % 2 === 0; });
        expect(seq.size).toBe(undefined);
        expect(seq.count()).toBe(3);
        expect(seq.size).toBe(3);
    });
    it('counts sequences with a specific predicate', function () {
        var seq = immutable_1.Seq.of(1, 2, 3, 4, 5, 6);
        expect(seq.size).toBe(6);
        expect(seq.count(function (x) { return x > 3; })).toBe(3);
    });
    describe('countBy', function () {
        it('counts by keyed sequence', function () {
            var grouped = immutable_1.Seq({ a: 1, b: 2, c: 3, d: 4 }).countBy(function (x) { return x % 2; });
            expect(grouped.toJS()).toEqual({ 1: 2, 0: 2 });
            expect(grouped.get(1)).toEqual(2);
        });
        it('counts by indexed sequence', function () {
            expect(immutable_1.Seq.of(1, 2, 3, 4, 5, 6).countBy(function (x) { return x % 2; }).toJS()).toEqual({ 1: 3, 0: 3 });
        });
        it('counts by specific keys', function () {
            expect(immutable_1.Seq.of(1, 2, 3, 4, 5, 6).countBy(function (x) { return x % 2 ? 'odd' : 'even'; }).toJS()).toEqual({ odd: 3, even: 3 });
        });
    });
    describe('isEmpty', function () {
        it('is O(1) on sequences with known lengths', function () {
            expect(immutable_1.Seq.of(1, 2, 3, 4, 5).size).toBe(5);
            expect(immutable_1.Seq.of(1, 2, 3, 4, 5).isEmpty()).toBe(false);
            expect(immutable_1.Seq().size).toBe(0);
            expect(immutable_1.Seq().isEmpty()).toBe(true);
        });
        it('lazily evaluates Seq with unknown length', function () {
            var seq = immutable_1.Seq.of(1, 2, 3, 4, 5, 6).filter(function (x) { return x % 2 === 0; });
            expect(seq.size).toBe(undefined);
            expect(seq.isEmpty()).toBe(false);
            expect(seq.size).toBe(undefined);
            var seq = immutable_1.Seq.of(1, 2, 3, 4, 5, 6).filter(function (x) { return x > 10; });
            expect(seq.size).toBe(undefined);
            expect(seq.isEmpty()).toBe(true);
            expect(seq.size).toBe(undefined);
        });
        it('with infinitely long sequences of known length', function () {
            var seq = immutable_1.Range();
            expect(seq.size).toBe(Infinity);
            expect(seq.isEmpty()).toBe(false);
        });
        it('with infinitely long sequences of unknown length', function () {
            var seq = immutable_1.Range().filter(function (x) { return x % 2 === 0; });
            expect(seq.size).toBe(undefined);
            expect(seq.isEmpty()).toBe(false);
            expect(seq.size).toBe(undefined);
        });
    });
});
