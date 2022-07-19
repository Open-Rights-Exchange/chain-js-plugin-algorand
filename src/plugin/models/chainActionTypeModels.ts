import { Models } from '@open-rights-exchange/chain-js'

/** ChainJS action type names */
export enum AlgorandChainActionType {
  AppClear = 'AppClear', // clear
  AppCloseOut = 'AppCloseOut', // closeout
  AppCreate = 'AppCreate', // create
  AppDelete = 'AppDelete', // delete
  AppNoOp = 'AppNoOp', // call
  AppOptIn = 'AppOptIn', // optIn
  AppUpdate = 'AppUpdate', // update
  AssetCreate = 'AssetCreate',
  AssetConfig = 'AssetConfig',
  AssetDestroy = 'AssetDestroy',
  AssetFreeze = 'AssetFreeze',
  AssetTransfer = 'AssetTransfer',
  KeyRegistration = 'KeyRegistration',
  Payment = 'Payment',
}

export type AlgorandDecomposeReturn = {
  chainActionType: Models.ChainActionType | AlgorandChainActionType
  args: any
  partial?: boolean
}
