# Avoiding Common Attacks

## Limit files per user
Only the contract owner can set the limit of maximum files per user. This limit avoids the overload of the smart contract acting accordingly with the input validation.

## Privacy protection
Only the owner can see his own files, this protects the privacy of the users.

## Minimalist structure
The smart contract has a very straightforward structure, simple structures have less weak points and are easier to audit.

## Input length check
The maximum limit of the strings is hardcoded inside the smart contract, in order to protect the smart contract from attacks which use long strings.

## Open Zeppelin
I use libraries like Open Zeppelin, Ownable and Pausable, in order to restrict the critical smart contract interactions only to the contract owner.
