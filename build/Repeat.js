///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var immutable_1 = require('immutable');
describe('Repeat', function () {
    it('fixed repeat', function () {
        var v = immutable_1.Repeat('wtf', 3);
        expect(v.size).toBe(3);
        expect(v.first()).toBe('wtf');
        expect(v.rest().toArray()).toEqual(['wtf', 'wtf']);
        expect(v.last()).toBe('wtf');
        expect(v.butLast().toArray()).toEqual(['wtf', 'wtf']);
        expect(v.toArray()).toEqual(['wtf', 'wtf', 'wtf']);
        expect(v.join()).toEqual('wtf,wtf,wtf');
    });
});
