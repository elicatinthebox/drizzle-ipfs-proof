const InterplanetaryStorage = artifacts.require('InterplanetaryStorage');
const should = require('chai').should();
const assertRevert = require('./lib/assertRevert');

contract('InterplanetaryStorage', async (accounts) => {

    let owner = accounts[0];




    describe('user maximum file limit validation', function() {
        beforeEach(async function () {
           this.InterplanetaryStorage = await InterplanetaryStorage.new({from: accounts[0]});
        });

        let testFiles1 = {
            name : "nana.jpg",
            hash : "Mtwirsqawjuoloq2gvtyug2t",
            tags : "golden retriever",
          };

        let testFiles2 = {
            name : "cabrio.jpg",
            hash : "A64pdf3vifnksr4oez2mth",
            tags : "electric car",
          }


        it("...should accept the file if the user is below the maximum limit", async function() {
            let result = await this.InterplanetaryStorage.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]});
            should.exist(result);
        });

        it("...should refuse the file if the user is over the maximum limit", async function() {
            try
            {
              await this.InterplanetaryStorage.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.InterplanetaryStorage.insertFile("1.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.InterplanetaryStorage.insertFile("2.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.InterplanetaryStorage.insertFile("3.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.InterplanetaryStorage.insertFile("4.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });


        it('...owner should be the first account', async function () {
            await this.InterplanetaryStorage.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]});

            let owner = await this.InterplanetaryStorage.ownersMap.call(0);
            should.equal(accounts[0], owner);
        });

        it("...only the contract owner should be able to change the file limit", async function() {
            try
            {
              await this.InterplanetaryStorage.setFileLimit(20, {from: accounts[1]});
              assert.fail('owner only');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });

        it("...should not change the file limit to a lower value", async function() {
            try
            {
              await this.InterplanetaryStorage.setFileLimit(2, {from: accounts[0]});
              assert.fail('cannot change the file limit to a lower value');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });
    });

    describe('input length validation', function() {
        beforeEach(async function () {
           this.InterplanetaryStorage = await InterplanetaryStorage.new({from: accounts[0]});
        });

        let testFiles1 = {
            name : "nana.jpg",
            hash : "Mtwirsqawjuoloq2gvtyug2t",
            tags : "golden retriever",
          };

        let testFiles2 = {
            name : "cabrio.jpg",
            hash : "A64pdf3vifnksr4oez2mth",
            tags : "electric car",
          }

        it("...should accept the input if is lower than the length limit", async function() {
            let result = await this.InterplanetaryStorage.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]});
            should.exist(result);
        });

        it("... should reject input if exceeds limit", async function() {
            try
            {
                await this.InterplanetaryStorage.insertFile("Turn around / Look at what you see / In her face / The mirror of your dreams / Look at what you see / In her face / The mirror of your dreams / Look at what you see / In her face / The mirror of your dreams",
                testFiles1.hash, testFiles1.tags, {from: accounts[0]});

                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });
    });

    describe("InterplanetaryStorage smart contract read and write tests", async () => {
        beforeEach(async function () {
           this.InterplanetaryStorage = await InterplanetaryStorage.new({from: accounts[0]});
        });

        let testFiles1 = {
            name : "nana.jpg",
            hash : "Mtwirsqawjuoloq2gvtyug2t",
            tags : "golden retriever",
          };

        let testFiles2 = {
            name : "cabrio.jpg",
            hash : "A64pdf3vifnksr4oez2mth",
            tags : "electric car",
          }


        it('..should add data to the smart contract and read data from it ', async function () {
            should.exist(await this.InterplanetaryStorage.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]}));
            should.exist(await this.InterplanetaryStorage.getFileIndexes({from: accounts[0]}));
            should.equal(accounts[0], await this.InterplanetaryStorage.ownersMap.call(0));

            let fileData = await this.InterplanetaryStorage.getFile(0, {from: accounts[0]});
            should.equal(testFiles1.name, fileData[0]);
            should.equal(testFiles1.hash, fileData[1]);
            should.equal(testFiles1.tags, fileData[2]);
            should.exist(fileData[3]);
        });

        it("...only the file owner should see her/his files", async function() {
            try
            {
                await this.InterplanetaryStorage.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]});
                await this.InterplanetaryStorage.getFile(1, {from: accounts[1]});
                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
                assertRevert(error);
            }
        });
    });

})
