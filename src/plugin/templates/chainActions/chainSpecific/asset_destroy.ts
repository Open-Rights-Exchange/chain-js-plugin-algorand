import * as algosdk from 'algosdk'
import { Helpers } from '@open-rights-exchange/chain-js'
import {
  AlgorandDecomposeReturn,
  AlgorandChainActionType,
  AlgorandSuggestedParams,
  AlgorandTransactionTypeCode,
  AlgorandTxAction,
  AlgorandTxActionRaw,
  AlgorandActionAssetDestroyParams,
} from '../../../models'
import { AlgorandActionHelper } from '../../../algoAction'
// import { isNullOrEmpty } from '../../../../../helpers'

/**
 * Composes asset destroy action */
export const composeAction = async (
  args: AlgorandActionAssetDestroyParams,
  suggestedParams: AlgorandSuggestedParams,
) => {
  const argsEncodedForSdk = new AlgorandActionHelper(args as AlgorandTxAction).actionEncodedForSdk
  const { from, note, assetIndex, reKeyTo } = argsEncodedForSdk
  const composedAction = algosdk.makeAssetDestroyTxnWithSuggestedParams(from, note, assetIndex, suggestedParams)
  if (!Helpers.isNullOrEmpty(reKeyTo)) {
    composedAction.addRekey(reKeyTo)
  }
  const actionHelper = new AlgorandActionHelper(composedAction)
  return actionHelper.action // convert raw action to use hex strings
}

export const decomposeAction = (action: AlgorandTxAction | AlgorandTxActionRaw): AlgorandDecomposeReturn => {
  const actionHelper = new AlgorandActionHelper(action)
  const actionParams = actionHelper.paramsOnly
  // Cant identify using only type (more than one action uses AssetConfig type) - must check params too
  if (
    actionParams?.type === AlgorandTransactionTypeCode.AssetConfig &&
    Helpers.isNullOrEmpty(actionParams?.assetManager) &&
    Helpers.isNullOrEmpty(actionParams?.assetReserve) &&
    Helpers.isNullOrEmpty(actionParams?.assetFreeze) &&
    Helpers.isNullOrEmpty(actionParams?.assetClawback) &&
    Helpers.isNullOrEmpty(actionParams?.assetName)
  ) {
    const returnData = {
      ...actionParams,
    }
    return {
      chainActionType: AlgorandChainActionType.AssetDestroy,
      args: returnData,
    }
  }
  return null
}
