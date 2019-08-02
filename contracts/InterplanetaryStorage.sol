pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';

contract InterplanetaryStorage is Ownable, Pausable {


  event LogUploadFile(address indexed accountAddress, string ipfsName, string ipfsHash, string ipfsTags, uint ipfsDate);

  struct IpfsDataStruct {
    string ipfsName;
    string ipfsHash;
    string ipfsTags;
    uint ipfsDate;
  }

  IpfsDataStruct[] public ipfsDataStruct;

  uint private fileLimit = 4;

  mapping (address => uint[]) private addressToFiles;
  mapping (address => uint) private userFilesCount;
  mapping (uint => address) public ownersMap;


  /**
   * @dev Checking user file limit
   */
  modifier notExceedsFileLimit() {
    require(userFilesCount[msg.sender] < fileLimit);
    _;
  }

  /**
  * @notice Set maximum file limit
  * @dev contract owner set fileLimit
  * @param _fileLimit maximum file limit
  * @return new file limit
  */
  function setFileLimit(uint _fileLimit) public
   onlyOwner
  returns (uint) {
    //The new file limit should be always bigger than the previous
    require(_fileLimit > fileLimit);
    fileLimit = _fileLimit;
    return fileLimit;
  }

  /**
  * @notice only contract owner get file limit
  * @dev only contract owner get fileLimit
  * @return file limit
  */
  function getFileLimit()
   onlyOwner
   public view returns (uint) {
    return fileLimit;
  }

  /**
  * @notice user get file count
  * @dev user get userFilesCount by msg.sender address 
  * @return file count
  */
  function getYourFileCount()
  public view returns (uint) {
    return userFilesCount[msg.sender];
  }

  /**
  * @notice contract owner get any user file count
  * @dev contract owner get _userAddress using userFilesCount mapping
  * @param _userAddress the user address
  * @return user files count
  */
  function getUserFileCount(address _userAddress)
  onlyOwner
  public view returns (uint) {
    return userFilesCount[_userAddress];
  }


  /**
   * @dev Checking lenght of the input
   */
  modifier inputCheck(string memory _ipfsName, string memory _ipfsHash, string memory _ipfsTags) {
    require(bytes(_ipfsName).length <= 50);
    require(bytes(_ipfsTags).length <= 50);
    require(bytes(_ipfsHash).length <= 46);
    _;
  }

  /**
  * @notice Insert a new file
  * @dev add new ipfsDataStruct element
  * @param _ipfsName Name of the file
  * @param _ipfsHash Hash of IPFS file
  * @param _ipfsTags ipfsTags string
  * @return fileId the id of the inserted file

  */
  function insertFile(string memory _ipfsName, string memory _ipfsHash, string memory _ipfsTags)
    public
    whenNotPaused
    notExceedsFileLimit
    inputCheck(_ipfsName,_ipfsHash,_ipfsTags)
    returns (uint)
  {
    uint fileId = ipfsDataStruct.push(IpfsDataStruct(
                                                      _ipfsName,
                                                      _ipfsHash,
                                                      _ipfsTags,
                                                      block.timestamp
                                                      )) - 1;
    addressToFiles[msg.sender].push(fileId);
    ownersMap[fileId] = msg.sender;
    emit LogUploadFile(
                      msg.sender,
                      _ipfsName,
                      _ipfsHash,
                      _ipfsTags,
                      block.timestamp);
    userFilesCount[msg.sender]++;
    return fileId;
  }


  /**
  * @notice Get a new file
  * @dev Get ipfsDataStruct info using _index
  * @return ipfsName, ipfsHash, ipfsTags, ipfsDate
  */
  function getFile(uint _index) public view returns (string memory, string memory, string memory, uint) {
    require(msg.sender == ownersMap[_index]);

    return (
      ipfsDataStruct[_index].ipfsName,
      ipfsDataStruct[_index].ipfsHash,
      ipfsDataStruct[_index].ipfsTags,
      ipfsDataStruct[_index].ipfsDate
      );
  }

  /**
  * @notice Get user stored files indexes
  * @dev Get a addressToFiles indexes by msg.sender address 
  * @return an array of uint indexes
  */
  function getFileIndexes() public view returns (uint[] memory) {
    return addressToFiles[msg.sender];
  }
}
