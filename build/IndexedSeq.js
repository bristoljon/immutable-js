///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('IndexedSequence', function () {
    it('maintains skipped offset', function () {
        var seq = immutable_1.Seq(['A', 'B', 'C', 'D', 'E']);
        // This is what we expect for IndexedSequences
        var operated = seq.skip(1);
        expect(operated.entrySeq().toArray()).toEqual([
            [0, 'B'],
            [1, 'C'],
            [2, 'D'],
            [3, 'E']
        ]);
        expect(operated.first()).toEqual('B');
    });
    it('reverses correctly', function () {
        var seq = immutable_1.Seq(['A', 'B', 'C', 'D', 'E']);
        // This is what we expect for IndexedSequences
        var operated = seq.reverse();
        expect(operated.get(0)).toEqual('E');
        expect(operated.get(1)).toEqual('D');
        expect(operated.get(4)).toEqual('A');
        expect(operated.first()).toEqual('E');
        expect(operated.last()).toEqual('A');
    });
    it('negative indexes correctly', function () {
        var seq = immutable_1.Seq(['A', 'B', 'C', 'D', 'E']);
        expect(seq.first()).toEqual('A');
        expect(seq.last()).toEqual('E');
        expect(seq.get(-0)).toEqual('A');
        expect(seq.get(2)).toEqual('C');
        expect(seq.get(-2)).toEqual('D');
        var indexes = seq.keySeq();
        expect(indexes.first()).toEqual(0);
        expect(indexes.last()).toEqual(4);
        expect(indexes.get(-0)).toEqual(0);
        expect(indexes.get(2)).toEqual(2);
        expect(indexes.get(-2)).toEqual(3);
    });
});
