// ! This should be the model to be followed in the tests. But the tests are not working the way they should.
// ! Some additional configuration must be done, but I couldn't find the answer. Someone who understands more of this lib needs to finish the setup
import { composeActionTest } from '../../../../test-utils'
import { composeAction, decomposeAction } from './asset_create'

const getComposedAction = () => ({
  name: 'Transaction',
  tag: 'TX',
  from: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  fee: 387000,
  firstRound: 8322719,
  lastRound: 8323719,
  note: 'create',
  assetDefaultFrozen: false,
  assetManager: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetReserve: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetFreeze: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetClawback: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetUnitName: 'exp',
  assetName: 'examplecoin',
  type: 'acfg',
})

const getDefaultArgs = () => ({
  from: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  note: 'create',
  totalIssuance: 1000,
  assetDefaultFrozen: false,
  assetDecimals: 0,
  assetReserve: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetFreeze: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetClawback: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetManager: 'VBS2IRDUN2E7FJGYEKQXUAQX3XWL6UNBJZZJHB7CJDMWHUKXAGSHU5NXNQ',
  assetUnitName: 'exp',
  assetName: 'examplecoin',
  assetURL: '',
  assetMetadataHash: '',
})

test('Compose AssetConfig object', async () => {
  const [args, options] = await composeActionTest(getDefaultArgs())
  const actAction = await composeAction(args, options)

  expect(actAction).toEqual(getComposedAction())
})

test('Decomposes AssetConfig object', () => {
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

test('Compose and Decompose AssetConfig', async () => {
  const [args, options] = await composeActionTest(getDefaultArgs())
  const action = await composeAction(args, options)
  const decomposed = decomposeAction(action)

  expect(decomposed.args).toEqual(getDefaultArgs())
})
