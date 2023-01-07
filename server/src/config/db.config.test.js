const chai = require('chai');
const expect = chai.expect;

describe('chai test', () => {
    it('should do something', () => {
        if(process.env.NODE_ENV == "development") {
            console.log("Development mode");
        }
    });
});