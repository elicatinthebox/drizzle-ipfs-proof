# Design Pattern Decisions
Combining IPFS and Ethereum allows us to verify the existence of a file. IPFS provides us an hash, Ethereum due to its immutability stores the files' hashes and timestamps useful for verification about the files.


## Restricting access
* Only the cotract's owener can set the limit of the maximum files number per user.
* Only the file's owner can see its own files.
* Open Zeppelin ownable allows the smart contract to provide ownership features using an audited library.

## Circuit Breaker Pattern
The smart contract execution can be interrupted by the contract's owner, using the amazing audited library, Open Zeppelin Pausable.
