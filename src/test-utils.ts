import { AlgorandChainState } from './plugin/algoChainState'
import { AlgorandChainEndpoint } from './plugin/models'
import { AlgorandActionHelper } from './plugin/algoAction'
import { compileIfSourceCodeIfNeeded } from './plugin/helpers'

const algoPureStakeTestnet = 'https://testnet-algorand.api.purestake.io/ps2'
const algoPureStakeTestnetIndexer = 'https://testnet-algorand.api.purestake.io/idx2'

export const algoTestnetEndpoints: AlgorandChainEndpoint[] = [
  {
    url: algoPureStakeTestnet,
    options: {
      indexerUrl: algoPureStakeTestnetIndexer,
      headers: [
        {
          'x-api-key': '3bk0oUJKr7aLJlcWnMOqu4OxLcXHaPpk5niyPGHR',
        },
      ],
    },
  },
]

// const algoTest = new ChainFactory().create(ChainType.AlgorandV1, algoTestnetEndpoints)

export class AlgoClient {
  public getTransactionParams() {
    return {
      genesisID: 'testnet-v1.0',
      lastRound: 8323228,
      consensusVersion: 8322229,
      minFee: 266000,
    }
  }
}

const getChainState = async () => {
  const chainState = new AlgorandChainState(algoTestnetEndpoints)
  await chainState.connect()
  return chainState
}

export const composeActionTest = async (args: any): Promise<[any, any]> => {
  const chainState = await getChainState()
  const action = {
    ...args,
    appApprovalProgram: await compileIfSourceCodeIfNeeded(args.appApprovalProgram, chainState.algoClient),
    appClearProgram: await compileIfSourceCodeIfNeeded(args.appClearProgram, chainState.algoClient),
  }

  const actionHelper = new AlgorandActionHelper(action)
  const chainTxHeaderParams = chainState.chainInfo?.nativeInfo?.transactionHeaderParams
  actionHelper.applyCurrentTxHeaderParamsWhereNeeded(chainTxHeaderParams)

  return [actionHelper.paramsOnly, actionHelper.transactionHeaderParams]
}

export const getDefaultTransactionHeaderParams = (): any => ({
  genesisID: 'testnet-v1.0',
  genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
  firstRound: 22827835,
  lastRound: 22828835,
  fee: 1000,
  flatFee: true,
})
