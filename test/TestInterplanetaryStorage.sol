import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/InterplanetaryStorage.sol";

contract TestInterplanetaryStorage{
  // Truffle will send the TestContract one Ether after deploying the contract.

  address private _owner = msg.sender;
  InterplanetaryStorage interplanetaryStorage = InterplanetaryStorage(DeployedAddresses.InterplanetaryStorage());

  //The files number at the beginning should be empty
  function testInitialNumberOfFiles() public {
    uint[] memory indexes = interplanetaryStorage.getFileIndexes();
    Assert.equal(0, indexes.length, "should be empty");
  }

  //The files number at the beginning should not be empty
  function testIncrementIndexesAfterInsertFile() public {

    string memory expectedipfsName = "cat.jpg";
    string memory expectedipfsHash = "Qmxddsgmskojowtwfok";
    string memory expectedipfsTags = "cute animal little";

    interplanetaryStorage.insertFile(expectedipfsName, expectedipfsHash, expectedipfsTags);
    uint[] memory indexes = interplanetaryStorage.getFileIndexes();

    Assert.isAbove(indexes.length, 0, "should be more than zero");

  }

  // Increment user file count after adding a File

  function testIncrementUserFileCountAfterInsertFile() public {
    uint firstCount = interplanetaryStorage.getYourFileCount();

    string memory expectedipfsName = "cat.jpg";
    string memory expectedipfsHash = "Qmxddsgmskojowtwfok";
    string memory expectedipfsTags = "cute animal little";

    interplanetaryStorage.insertFile(expectedipfsName, expectedipfsHash, expectedipfsTags);
    uint secondCount = interplanetaryStorage.getYourFileCount();

    Assert.isAbove(secondCount, firstCount, "user count should increment after adding a file");

  }

  function testInsertFile() public {

    string memory expectedipfsName = "cat.jpg";
    string memory expectedipfsHash = "Qmxddsgmskojowtwfok";
    string memory expectedipfsTags = "cute animal little";

    uint fileId = interplanetaryStorage.insertFile(expectedipfsName, expectedipfsHash, expectedipfsTags);

    string memory ipfsName;
    string memory ipfsHash;
    string memory ipfsTags;
    uint ipfsDate;

    (ipfsName, ipfsHash, ipfsTags, ipfsDate) = interplanetaryStorage.getFile(fileId);

    Assert.equal(ipfsName, expectedipfsName, "Item name should match");
    Assert.equal(ipfsHash, expectedipfsHash, "Item name should match");
    Assert.equal(ipfsTags, expectedipfsTags, "Item name should match");
  }


}
