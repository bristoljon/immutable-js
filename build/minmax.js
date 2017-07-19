///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
var genHeterogeneousishArray = gen.oneOf([
    gen.array(gen.oneOf([gen.string, gen.undefined])),
    gen.array(gen.oneOf([gen.int, gen.NaN]))
]);
describe('max', function () {
    it('returns max in a sequence', function () {
        expect(immutable_1.Seq([1, 9, 2, 8, 3, 7, 4, 6, 5]).max()).toBe(9);
    });
    it('accepts a comparator', function () {
        expect(immutable_1.Seq([1, 9, 2, 8, 3, 7, 4, 6, 5]).max(function (a, b) { return b - a; })).toBe(1);
    });
    it('by a mapper', function () {
        var family = immutable_1.Seq([
            { name: 'Oakley', age: 7 },
            { name: 'Dakota', age: 7 },
            { name: 'Casey', age: 34 },
            { name: 'Avery', age: 34 },
        ]);
        expect(family.maxBy(function (p) { return p.age; }).name).toBe('Casey');
    });
    it('by a mapper and a comparator', function () {
        var family = immutable_1.Seq([
            { name: 'Oakley', age: 7 },
            { name: 'Dakota', age: 7 },
            { name: 'Casey', age: 34 },
            { name: 'Avery', age: 34 },
        ]);
        expect(family.maxBy(function (p) { return p.age; }, function (a, b) { return b - a; }).name).toBe('Oakley');
    });
    it('surfaces NaN, null, and undefined', function () {
        expect(immutable_1.is(NaN, immutable_1.Seq.of(1, 2, 3, 4, 5, NaN).max())).toBe(true);
        expect(immutable_1.is(NaN, immutable_1.Seq.of(NaN, 1, 2, 3, 4, 5).max())).toBe(true);
        expect(immutable_1.is(null, immutable_1.Seq.of('A', 'B', 'C', 'D', null).max())).toBe(true);
        expect(immutable_1.is(null, immutable_1.Seq.of(null, 'A', 'B', 'C', 'D').max())).toBe(true);
    });
    it('null treated as 0 in default iterator', function () {
        expect(immutable_1.is(2, immutable_1.Seq.of(-1, -2, null, 1, 2).max())).toBe(true);
    });
    check.it('is not dependent on order', [genHeterogeneousishArray], function (vals) {
        expect(immutable_1.is(immutable_1.Seq(shuffle(vals.slice())).max(), immutable_1.Seq(vals).max())).toEqual(true);
    });
});
describe('min', function () {
    it('returns min in a sequence', function () {
        expect(immutable_1.Seq([1, 9, 2, 8, 3, 7, 4, 6, 5]).min()).toBe(1);
    });
    it('accepts a comparator', function () {
        expect(immutable_1.Seq([1, 9, 2, 8, 3, 7, 4, 6, 5]).min(function (a, b) { return b - a; })).toBe(9);
    });
    it('by a mapper', function () {
        var family = immutable_1.Seq([
            { name: 'Oakley', age: 7 },
            { name: 'Dakota', age: 7 },
            { name: 'Casey', age: 34 },
            { name: 'Avery', age: 34 },
        ]);
        expect(family.minBy(function (p) { return p.age; }).name).toBe('Oakley');
    });
    it('by a mapper and a comparator', function () {
        var family = immutable_1.Seq([
            { name: 'Oakley', age: 7 },
            { name: 'Dakota', age: 7 },
            { name: 'Casey', age: 34 },
            { name: 'Avery', age: 34 },
        ]);
        expect(family.minBy(function (p) { return p.age; }, function (a, b) { return b - a; }).name).toBe('Casey');
    });
    check.it('is not dependent on order', [genHeterogeneousishArray], function (vals) {
        expect(immutable_1.is(immutable_1.Seq(shuffle(vals.slice())).min(), immutable_1.Seq(vals).min())).toEqual(true);
    });
});
function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
