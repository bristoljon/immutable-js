///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('sort', function () {
    it('sorts a sequence', function () {
        expect(immutable_1.Seq.of(4, 5, 6, 3, 2, 1).sort().toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('sorts a list', function () {
        expect(immutable_1.List.of(4, 5, 6, 3, 2, 1).sort().toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('sorts a keyed sequence', function () {
        expect(immutable_1.Seq({ z: 1, y: 2, x: 3, c: 3, b: 2, a: 1 }).sort().entrySeq().toArray())
            .toEqual([['z', 1], ['a', 1], ['y', 2], ['b', 2], ['x', 3], ['c', 3]]);
    });
    it('sorts an OrderedMap', function () {
        expect(immutable_1.OrderedMap({ z: 1, y: 2, x: 3, c: 3, b: 2, a: 1 }).sort().entrySeq().toArray())
            .toEqual([['z', 1], ['a', 1], ['y', 2], ['b', 2], ['x', 3], ['c', 3]]);
    });
    it('accepts a sort function', function () {
        expect(immutable_1.Seq.of(4, 5, 6, 3, 2, 1).sort(function (a, b) { return b - a; }).toArray()).toEqual([6, 5, 4, 3, 2, 1]);
    });
    it('sorts by using a mapper', function () {
        expect(immutable_1.Range(1, 10).sortBy(function (v) { return v % 3; }).toArray())
            .toEqual([3, 6, 9, 1, 4, 7, 2, 5, 8]);
    });
    it('sorts by using a mapper and a sort function', function () {
        expect(immutable_1.Range(1, 10).sortBy(function (v) { return v % 3; }, function (a, b) { return b - a; }).toArray())
            .toEqual([2, 5, 8, 1, 4, 7, 3, 6, 9]);
    });
});
