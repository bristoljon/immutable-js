///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('find', function () {
    it('find returns notSetValue when match is not found', function () {
        expect(immutable_1.Seq.of(1, 2, 3, 4, 5, 6).find(function () {
            return false;
        }, null, 9)).toEqual(9);
    });
    it('findEntry returns notSetValue when match is not found', function () {
        expect(immutable_1.Seq.of(1, 2, 3, 4, 5, 6).findEntry(function () {
            return false;
        }, null, 9)).toEqual(9);
    });
    it('findLastEntry returns notSetValue when match is not found', function () {
        expect(immutable_1.Seq.of(1, 2, 3, 4, 5, 6).findLastEntry(function () {
            return false;
        }, null, 9)).toEqual(9);
    });
});
