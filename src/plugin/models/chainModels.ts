import { Algodv2, Indexer } from 'algosdk'
// import { ChainSettingsCommunicationSettings, ChainSymbolBrand, ModelsCryptoEd25519 } from '../../../models'
import { Models } from '@open-rights-exchange/chain-js'
import { AlgorandChainTransactionParamsStruct } from './algoStructures'
import { TransactionExpirationOptions } from './transactionModels'
import { AlgorandValue } from './generalModels'

export type AlgoClient = Algodv2
export type AlgoClientIndexer = Indexer

/** Chain urls and related details used to connect to chain */
export type AlgorandChainEndpoint = {
  /** api endpoint url - including http(s):// prefix */
  url: string
  /** Options are name/value pairs used to configure chain endpoint */
  options?: {
    /** Algorand indexer endpoint url - including http(s):// prefix */
    indexerUrl?: string
    /** Array of headers to be included in HTTP requests to chain endpoint
     *  e.g. options.headers = [{"Authorization":"Bearer..."}] */
    headers?: [{ [key: string]: string }]
  }
  /** Between 0 and 1 - 0 is not responding, 1 is very fast */
  health?: number
}

/**
 * Algorand token: {'x-api-key': '...'}
 */
export type AlgorandHeader = {
  'x-api-key': string
}

/** Chain information including head block number and time and software version */
export type AlgorandChainInfo = {
  headBlockNumber: number
  headBlockTime: Date
  version: string
  nativeInfo: {
    transactionHeaderParams: AlgorandChainTransactionParamsStruct
  }
}

/** Currently nothing is needed in algorand chain settings.
 * Once any such parameter is there, change the type from any to an object containing specific properties */
export type AlgorandChainSettings = {
  communicationSettings?: Models.ChainSettingsCommunicationSettings
  defaultTransactionSettings?: {
    expirationOptions?: TransactionExpirationOptions
    fee?: AlgorandValue
    flatFee?: boolean
  }
}
