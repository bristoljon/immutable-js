///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('OrderedSet', function () {
    it('provides initial values in a mixed order', function () {
        var s = immutable_1.OrderedSet.of('C', 'B', 'A');
        expect(s.has('A')).toBe(true);
        expect(s.has('B')).toBe(true);
        expect(s.has('C')).toBe(true);
        expect(s.size).toBe(3);
        expect(s.toArray()).toEqual(['C', 'B', 'A']);
    });
    it('maintains order when new values are added', function () {
        var s = immutable_1.OrderedSet()
            .add('A')
            .add('Z')
            .add('A');
        expect(s.size).toBe(2);
        expect(s.toArray()).toEqual(['A', 'Z']);
    });
    it('resets order when a value is deleted', function () {
        var s = immutable_1.OrderedSet()
            .add('A')
            .add('Z')
            .remove('A')
            .add('A');
        expect(s.size).toBe(2);
        expect(s.toArray()).toEqual(['Z', 'A']);
    });
    it('removes correctly', function () {
        var s = immutable_1.OrderedSet(['A', 'Z']).remove('A');
        expect(s.size).toBe(1);
        expect(s.has('A')).toBe(false);
        expect(s.has('Z')).toBe(true);
    });
    it('respects order for equality', function () {
        var s1 = immutable_1.OrderedSet.of('A', 'Z');
        var s2 = immutable_1.OrderedSet.of('Z', 'A');
        expect(s1.equals(s2)).toBe(false);
        expect(s1.equals(s2.reverse())).toBe(true);
    });
    it('respects order when unioning', function () {
        var s1 = immutable_1.OrderedSet.of('A', 'B', 'C');
        var s2 = immutable_1.OrderedSet.of('C', 'B', 'D');
        expect(s1.union(s2).toArray()).toEqual(['A', 'B', 'C', 'D']);
        expect(s2.union(s1).toArray()).toEqual(['C', 'B', 'D', 'A']);
    });
});
