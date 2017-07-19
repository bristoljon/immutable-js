///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('zip', function () {
    it('zips lists into a list of tuples', function () {
        expect(immutable_1.Seq.of(1, 2, 3).zip(immutable_1.Seq.of(4, 5, 6)).toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
    });
    it('zips with infinite lists', function () {
        expect(immutable_1.Range().zip(immutable_1.Seq.of('A', 'B', 'C')).toArray()).toEqual([[0, 'A'], [1, 'B'], [2, 'C']]);
    });
    it('has unknown size when zipped with unknown size', function () {
        var seq = immutable_1.Range(0, 10);
        var zipped = seq.zip(seq.filter(function (n) { return n % 2 === 0; }));
        expect(zipped.size).toBe(undefined);
        expect(zipped.count()).toBe(5);
    });
    check.it('is always the size of the smaller sequence', [gen.notEmpty(gen.array(gen.posInt))], function (lengths) {
        var ranges = lengths.map(function (l) { return immutable_1.Range(0, l); });
        var first = ranges.shift();
        var zipped = first.zip.apply(first, ranges);
        var shortestLength = Math.min.apply(Math, lengths);
        expect(zipped.size).toBe(shortestLength);
    });
    describe('zipWith', function () {
        it('zips with a custom function', function () {
            expect(immutable_1.Seq.of(1, 2, 3).zipWith(function (a, b) { return a + b; }, immutable_1.Seq.of(4, 5, 6)).toArray()).toEqual([5, 7, 9]);
        });
        it('can zip to create immutable collections', function () {
            expect(immutable_1.Seq.of(1, 2, 3).zipWith(function () { return immutable_1.List(arguments); }, immutable_1.Seq.of(4, 5, 6), immutable_1.Seq.of(7, 8, 9)).toJS()).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
        });
    });
    describe('interleave', function () {
        it('interleaves multiple collections', function () {
            expect(immutable_1.Seq.of(1, 2, 3).interleave(immutable_1.Seq.of(4, 5, 6), immutable_1.Seq.of(7, 8, 9)).toArray()).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9]);
        });
        it('stops at the shortest collection', function () {
            var i = immutable_1.Seq.of(1, 2, 3).interleave(immutable_1.Seq.of(4, 5), immutable_1.Seq.of(7, 8, 9));
            expect(i.size).toBe(6);
            expect(i.toArray()).toEqual([1, 4, 7, 2, 5, 8]);
        });
        it('with infinite lists', function () {
            var r = immutable_1.Range();
            var i = r.interleave(immutable_1.Seq.of('A', 'B', 'C'));
            expect(i.size).toBe(6);
            expect(i.toArray()).toEqual([0, 'A', 1, 'B', 2, 'C']);
        });
    });
});
