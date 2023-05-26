// import { ChainSettingsCommunicationSettings, ChainSymbolBrand, ModelsCryptoEd25519 } from '../../../models'
import { Models } from '@open-rights-exchange/chain-js'
import { AlgorandAddress, AlgorandKeyPair } from './cryptoModels'

/**  Multisig options required to create a multisignature account for Algorand */
export type AlgorandMultisigOptions = {
  version: number
  threshold: number
  addrs: AlgorandAddress[]
}

/** multisig options for creating an account */
export type AlgorandMultisigCreateAccountOptions = AlgorandMultisigOptions

/** multisig options for signing a transaction */
export type AlgorandMultisigTransactionOptions = AlgorandMultisigOptions

/**  Algorand multisig account is similar to a native algorand address */
export type AlgorandMultisigAccount = AlgorandAddress

/**  Algorand keys generated for a new account */
export type AlgorandGeneratedKeys = AlgorandKeyPair

/**  Algorand new keys options including password and optional multisig parameters */
export type AlgorandNewKeysOptions = {
  password: string
  encryptionOptions?: Models.ModelsCryptoEd25519.Ed25519PasswordEncryptionOptions
}

/** Algorand value units */
export enum AlgorandUnit {
  Microalgo = 'microalgo',
  Algo = 'algo',
}

/** Algorand general value type */
export type AlgorandValue = string | number | Buffer | Uint8Array
export type AlgorandSymbol = string & Models.ChainSymbolBrand

/** SignMethod enum contains the methods that can be used to sign a message */
export enum AlgorandSignMethod {
  Default = 'default'
}

/** An object containing the string message to sign */
export type AlgorandSignDataInput = {
  stringToSign: string
}
