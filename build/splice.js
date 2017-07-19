///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('splice', function () {
    it('splices a sequence only removing elements', function () {
        expect(immutable_1.Seq.of(1, 2, 3).splice(0, 1).toArray()).toEqual([2, 3]);
        expect(immutable_1.Seq.of(1, 2, 3).splice(1, 1).toArray()).toEqual([1, 3]);
        expect(immutable_1.Seq.of(1, 2, 3).splice(2, 1).toArray()).toEqual([1, 2]);
        expect(immutable_1.Seq.of(1, 2, 3).splice(3, 1).toArray()).toEqual([1, 2, 3]);
    });
    it('splices a list only removing elements', function () {
        expect(immutable_1.List.of(1, 2, 3).splice(0, 1).toArray()).toEqual([2, 3]);
        expect(immutable_1.List.of(1, 2, 3).splice(1, 1).toArray()).toEqual([1, 3]);
        expect(immutable_1.List.of(1, 2, 3).splice(2, 1).toArray()).toEqual([1, 2]);
        expect(immutable_1.List.of(1, 2, 3).splice(3, 1).toArray()).toEqual([1, 2, 3]);
    });
    it('has the same behavior as array splice in known edge cases', function () {
        // arbitary numbers that sum to 31
        var a = immutable_1.Range(0, 49).toArray();
        var v = immutable_1.List(a);
        a.splice(-18, 0, 0);
        expect(v.splice(-18, 0, 0).toList().toArray()).toEqual(a);
    });
    check.it('has the same behavior as array splice', [gen.array(gen.int), gen.array(gen.oneOf([gen.int, gen.undefined]))], function (values, args) {
        var v = immutable_1.List(values);
        var a = values.slice(); // clone
        var splicedV = v.splice.apply(v, args); // persistent
        a.splice.apply(a, args); // mutative
        expect(splicedV.toArray()).toEqual(a);
    });
});
