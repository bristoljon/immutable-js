///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/immutable.d.ts'/>
jest.autoMockOff();
var jasmineCheck = require('jasmine-check');
jasmineCheck.install();
var immutable_1 = require('immutable');
describe('Conversion', function () {
    beforeEach(function () {
        this.addMatchers({
            is: function (expected) {
                return immutable_1.is(this.actual, expected);
            }
        });
    });
    // Note: order of keys based on Map's hashing order
    var js = {
        deepList: [
            {
                position: "first"
            },
            {
                position: "second"
            },
            {
                position: "third"
            },
        ],
        deepMap: {
            a: "A",
            b: "B"
        },
        emptyMap: Object.create(null),
        point: { x: 10, y: 20 },
        string: "Hello",
        list: [1, 2, 3]
    };
    var Point = immutable_1.Record({ x: 0, y: 0 }, 'Point');
    var immutableData = immutable_1.Map({
        deepList: immutable_1.List.of(immutable_1.Map({
            position: "first"
        }), immutable_1.Map({
            position: "second"
        }), immutable_1.Map({
            position: "third"
        })),
        deepMap: immutable_1.Map({
            a: "A",
            b: "B"
        }),
        emptyMap: immutable_1.Map(),
        point: immutable_1.Map({ x: 10, y: 20 }),
        string: "Hello",
        list: immutable_1.List.of(1, 2, 3)
    });
    var immutableOrderedData = immutable_1.OrderedMap({
        deepList: immutable_1.List.of(immutable_1.OrderedMap({
            position: "first"
        }), immutable_1.OrderedMap({
            position: "second"
        }), immutable_1.OrderedMap({
            position: "third"
        })),
        deepMap: immutable_1.OrderedMap({
            a: "A",
            b: "B"
        }),
        emptyMap: immutable_1.OrderedMap(),
        point: new Point({ x: 10, y: 20 }),
        string: "Hello",
        list: immutable_1.List.of(1, 2, 3)
    });
    var immutableOrderedDataString = 'OrderedMap { ' +
        '"deepList": List [ ' +
        'OrderedMap { ' +
        '"position": "first"' +
        ' }, ' +
        'OrderedMap { ' +
        '"position": "second"' +
        ' }, ' +
        'OrderedMap { ' +
        '"position": "third"' +
        ' }' +
        ' ], ' +
        '"deepMap": OrderedMap { ' +
        '"a": "A", ' +
        '"b": "B"' +
        ' }, ' +
        '"emptyMap": OrderedMap {}, ' +
        '"point": Point { "x": 10, "y": 20 }, ' +
        '"string": "Hello", ' +
        '"list": List [ 1, 2, 3 ]' +
        ' }';
    var nonStringKeyMap = immutable_1.OrderedMap().set(1, true).set(false, "foo");
    var nonStringKeyMapString = 'OrderedMap { 1: true, false: "foo" }';
    it('Converts deep JS to deep immutable sequences', function () {
        expect(immutable_1.fromJS(js)).is(immutableData);
    });
    it('Converts deep JSON with custom conversion', function () {
        var seq = immutable_1.fromJS(js, function (key, sequence) {
            if (key === 'point') {
                return new Point(sequence);
            }
            return Array.isArray(this[key]) ? sequence.toList() : sequence.toOrderedMap();
        });
        expect(seq).is(immutableOrderedData);
        expect(seq.toString()).is(immutableOrderedDataString);
    });
    it('Prints keys as JSON values', function () {
        expect(nonStringKeyMap.toString()).is(nonStringKeyMapString);
    });
    it('Converts deep sequences to JSON', function () {
        var json = immutableData.toJS();
        expect(json).not.is(js); // raw JS is not immutable.
        expect(json).toEqual(js); // but should be deep equal.
    });
    it('JSON.stringify() works equivalently on immutable sequences', function () {
        expect(JSON.stringify(js)).toBe(JSON.stringify(immutableData));
    });
    it('JSON.stringify() respects toJSON methods on values', function () {
        var Model = immutable_1.Record({});
        Model.prototype.toJSON = function () { return 'model'; };
        expect(immutable_1.Map({ a: new Model() }).toJS()).toEqual({ "a": {} });
        expect(JSON.stringify(immutable_1.Map({ a: new Model() }))).toEqual('{"a":"model"}');
    });
    it('is conservative with array-likes, only accepting true Arrays.', function () {
        expect(immutable_1.fromJS({ 1: 2, length: 3 })).is(immutable_1.Map().set('1', 2).set('length', 3));
        expect(immutable_1.fromJS('string')).toEqual('string');
    });
    check.it('toJS isomorphic value', { maxSize: 30 }, [gen.JSONValue], function (js) {
        var imm = immutable_1.fromJS(js);
        expect(imm && imm.toJS ? imm.toJS() : imm).toEqual(js);
    });
    it('Explicitly convert values to string using String constructor', function () {
        expect(function () {
            immutable_1.fromJS({ foo: Symbol('bar') }) + '';
            immutable_1.Map().set('foo', Symbol('bar')) + '';
            immutable_1.Map().set(Symbol('bar'), 'foo') + '';
        }).not.toThrow();
    });
});
