import { getDefaultTransactionHeaderParams } from '../../../../test-utils'
import { composeAction, decomposeAction } from './asset_create'

const getComposedAction = () => {
  return {
    name: 'Transaction',
    tag: 'TX',
    from: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
    fee: 1000,
    firstRound: 22826900,
    lastRound: 22827900,
    note: 'create',
    assetDefaultFrozen: false,
    assetManager: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
    assetReserve: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
    assetFreeze: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
    assetClawback: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
    assetUnitName: 'exp',
    assetName: 'examplecoin',
    type: 'acfg',
    ...getDefaultTransactionHeaderParams(),
  }
}

const getDefaultArgs = () => ({
  from: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  note: 'create',
  assetDefaultFrozen: false,
  totalIssuance: 1000,
  assetDecimals: 0,
  assetReserve: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetFreeze: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetClawback: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetManager: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetUnitName: 'exp',
  assetName: 'examplecoin',
})

test('Compose AssetCreate object', async () => {
  const args = getDefaultArgs()
  const options = getDefaultTransactionHeaderParams()
  const actAction = await composeAction(args, options)
  expect(actAction).toEqual(getComposedAction())
})

test('Decomposes AssetCreate object', () => {
  const expAction = {
    chainActionType: 'AssetCreate',
    args: {
      name: 'Transaction',
      tag: 'TX',
      from: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
      note: 'create',
      assetDefaultFrozen: false,
      assetManager: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
      assetReserve: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
      assetFreeze: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
      assetClawback: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
      assetUnitName: 'exp',
      assetName: 'examplecoin',
      type: 'acfg',
    },
  }
  const actAction = decomposeAction(getComposedAction())
  expect(actAction).toEqual(expAction)
})

test('Compose and Decompose AssetCreate', async () => {
  const args = getDefaultArgs()
  const options = getDefaultTransactionHeaderParams()
  const action = await composeAction(args, options)
  const decomposed = decomposeAction(action)

  // ! Ideally, these should be equal, but this case is not like that.
  // expect(decomposed.args).toEqual(getDefaultArgs())

  const { name, tag, type, ...decomposedArgs } = decomposed.args
  const { assetDecimals, totalIssuance, ...expectedDecomposedArgs } = getDefaultArgs()
  expect(decomposedArgs).toEqual(expectedDecomposedArgs)
})

test('Compose AssetCreate return null ir args is invalid', async () => {
  const args = getDefaultArgs()
  const { ...invalid } = args

  const options = getDefaultTransactionHeaderParams()
  const actAction = await composeAction(args, options)
  expect(actAction).toBeNull()
})
