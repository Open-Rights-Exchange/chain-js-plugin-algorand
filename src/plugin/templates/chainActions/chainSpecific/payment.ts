import * as algosdk from 'algosdk'
import { Helpers } from '@open-rights-exchange/chain-js'
import {
  AlgorandDecomposeReturn,
  AlgorandActionPaymentParams,
  AlgorandChainActionType,
  AlgorandSuggestedParams,
  AlgorandTransactionTypeCode,
  AlgorandTxAction,
  AlgorandTxActionRaw,
} from '../../../models'
import { AlgorandActionHelper } from '../../../algoAction'
// import { isNullOrEmpty } from '../../../../../helpers'

/** Compose action */
export const composeAction = async (args: AlgorandActionPaymentParams, suggestedParams: AlgorandSuggestedParams) => {
  const argsEncodedForSdk = new AlgorandActionHelper(args as AlgorandTxAction).actionEncodedForSdk
  const { from, to, amount, note, closeRemainderTo, reKeyTo } = argsEncodedForSdk
  const composedAction = algosdk.makePaymentTxnWithSuggestedParams(
    from,
    to,
    amount,
    closeRemainderTo || undefined,
    note,
    suggestedParams,
  )
  if (!Helpers.isNullOrEmpty(reKeyTo)) {
    composedAction.addRekey(reKeyTo)
  }
  const actionHelper = new AlgorandActionHelper(composedAction)
  return actionHelper.action // convert raw action to use hex strings
}

export const decomposeAction = (action: AlgorandTxAction | AlgorandTxActionRaw): AlgorandDecomposeReturn => {
  const actionHelper = new AlgorandActionHelper(action)
  const actionParams = actionHelper.paramsOnly
  // Identify chainActionType using type
  if (actionParams?.type === AlgorandTransactionTypeCode.Payment) {
    const returnData = {
      ...actionParams,
    }
    return {
      chainActionType: AlgorandChainActionType.Payment,
      args: returnData,
    }
  }
  return null
}
