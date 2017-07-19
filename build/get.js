///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('get', function () {
    it('gets any index', function () {
        var seq = immutable_1.Range(0, 100);
        expect(seq.get(20)).toBe(20);
    });
    it('gets first', function () {
        var seq = immutable_1.Range(0, 100);
        expect(seq.first()).toBe(0);
    });
    it('gets last', function () {
        var seq = immutable_1.Range(0, 100);
        expect(seq.last()).toBe(99);
    });
    it('gets any index after reversing', function () {
        var seq = immutable_1.Range(0, 100).reverse();
        expect(seq.get(20)).toBe(79);
    });
    it('gets first after reversing', function () {
        var seq = immutable_1.Range(0, 100).reverse();
        expect(seq.first()).toBe(99);
    });
    it('gets last after reversing', function () {
        var seq = immutable_1.Range(0, 100).reverse();
        expect(seq.last()).toBe(0);
    });
    it('gets any index when size is unknown', function () {
        var seq = immutable_1.Range(0, 100).filter(function (x) { return x % 2 === 1; });
        expect(seq.get(20)).toBe(41);
    });
    it('gets first when size is unknown', function () {
        var seq = immutable_1.Range(0, 100).filter(function (x) { return x % 2 === 1; });
        expect(seq.first()).toBe(1);
    });
    it('gets last when size is unknown', function () {
        var seq = immutable_1.Range(0, 100).filter(function (x) { return x % 2 === 1; });
        expect(seq.last()).toBe(99); // Note: this is O(N)
    });
});
