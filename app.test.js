const { arrayMean, arrayMedian, arrayMode } = require('./app.js');

describe('mean function', function () {
    test('mean should return mean', function () {
        expect(arrayMean([1, 2, 3, 4, 5])).toEqual(3);
        expect(arrayMean([3, 4, 5, 6])).toEqual(4.5);
    });
});

describe('median function', function () {
    test('median should return median', function () {
        expect(arrayMedian([7, 2, 5, 4, 9])).toEqual(5);
        expect(arrayMedian([9, 4, 5, 1])).toEqual(4.5);
    });
});

describe('mode function', function () {
    test('mode should return mode', function () {
        expect(arrayMode([5, 3, 3, 7, 7, 3, 8])).toEqual(3);
        expect(arrayMode([3, 3, 7, 1, 1, 1, 4, 1, 1])).toEqual(1);
    });

    test('mode should return an array if multiple modes exist', function () {
        const array = [4, 4, 5, 5, 9, 7, 9];
        expect(typeof arrayMode(array)).toBe('object');
        expect(arrayMode(array)).toContain(4, 5, 9);
    });
});