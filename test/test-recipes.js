const chai = require('chai'); //does this need to be double quotes?
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Recipes', function() {
    
    before(function() {
        return runServer();
    });
    
    after(function() {
        return closeServer();
    });
    
    it('should list items on GET', function() {
        return chai
            .request(app)
            .get('/recipes')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.be.a('array');
                expect(res.body.length).to.be.at.least(1);
                res.body.forEach(function(item) {
                    expect(item).to.be.a('object');
                    expect(item).to.include.keys('id', 'name', 'ingrdients');
                });
            });
    });
    
    it('should list items on POST', function () {
        const newRecipe = {name: "rice", ingredients: ["rice", "water"]};
        return chai
            .request(app)
            .post('/recipes')
            .send(newRecipe)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res).to.be.a('object');
                expect(res).to.include.keys('id', 'name', 'ingredients');
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(
                    Object.assign(newRecipe, { id: res.body.id })
                );
            });
    });
    
    it('should list items on PUT', function () {

    });
    
    it('should list items on DELETE', function () {

    });
});