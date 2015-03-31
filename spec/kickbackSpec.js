describe('kickback', function() {
    it('should exist', function() {
        expect(kickback).toBeDefined();
    });
    it('should be an Object', function() {
        expect(typeof kickback === 'object').toEqual(true);
    });
    describe('request', function() {
        it('should exist', function() {
            expect(kickback.request).toBeDefined();
        });
        it('should be a method of kickback', function() {
            expect(kickback.hasOwnProperty('request')).toEqual(true);
        });
    });
    describe('serialize', function() {
        it('should be a private method', function() {
            expect(kickback._serialize).toBeDefined(); 
        });
    });
});

describe('Browser Features', function() {
    describe('Promises', function() {
        it('should exist', function() {
            expect(typeof window.Promise !== 'undefined').toBe(true);
        });
        it('should be used as a constructor', function() {
            var promise = new Promise(function(res,rej){});
            expect(promise).toBeDefined();
        });
    });
    describe('FormData', function() {
        it('should exist', function() {
            expect(typeof window.FormData !== 'undefined').toBe(true);
        });
    });
    describe('FileRead API', function() {
        it('should exist', function() {
            expect(typeof window.FileReader !== 'undefined').toBe(true);
        });
    });

    describe('XMLHttpRequest', function() {
        it('should exist', function() {
            expect(typeof window.XMLHttpRequest !== 'undefined').toBe(true);
        });
    });

}); 
