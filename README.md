  # rpgmaker-mv-crypt.js

  A simple Node.JS (and typescript) library to (de)crypt RPGMaker MV .rpgmvX files (.rpgmvp for images, etc).

  ## RPGMaker Encryption Scheme

  Encrypted files start with a 16 byte magic number. Encrypted files only have their first 16 bytes xor encrypted with the 16 byte encryption key. The encryption key can be found in the `encryptionKey` field of the System.json file of the game.
  
