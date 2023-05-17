import { Models, Crypto } from '@open-rights-exchange/chain-js'
import { AlgorandSignMessage } from '../../plugin/algoSignMessage'
import { toAlgorandPrivateKey } from '../helpers'

const privateKeyString =
  'd981cfed95079eddfabfacf6ae0e25532110ea574ee06879ec7d55d0a627ee372739bf899158b5be1c069f251c4d12c977781b349ef70d7e83b7c431e17745cc'
const privateKey = toAlgorandPrivateKey(privateKeyString)

describe('Algorand SignMessage Tests', () => {

  it('Algorand sign - validate fails when input is incorrect', async () => {
    const input2 = {
      BADstringToSign: 'Something to sign here',
    }

    const SignMessage = new AlgorandSignMessage(input2)
    const validateResult = await SignMessage.validate()
    expect(validateResult.valid).toBeFalsy()
  })

  it('Algorand sign - validate passes when input is correct', async () => {
    const input = {
      stringToSign: 'Something to sign here',
    }

    const SignMessageOptions = { signMethod: 'algorand-sign'}
    const SignMessage = new AlgorandSignMessage(input, SignMessageOptions)
    const validateResult = await SignMessage.validate()
    expect(validateResult.valid).toBeTruthy()

    const result = await SignMessage.sign([
      privateKey as unknown as Models.PrivateKeyBrand,
    ])
    expect(result.signature).toBeDefined()
  })

  it('Algorand validate - passes when input is correct and no options are provided', async () => {
    const input = {
      stringToSign: 'Something to sign here',
    }
    const SignMessage = new AlgorandSignMessage(input)
    const validateResult = await SignMessage.validate()
    expect(validateResult.valid).toBeTruthy()
    const result = await SignMessage.sign([
      privateKey as unknown as Models.PrivateKeyBrand,
    ])
    expect(result.signature).toBeDefined()
  })
})
