/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interfaces, Models, Errors } from '@open-rights-exchange/chain-js'
import {
  AlgoSignDataInput,
  AlgorandPrivateKey,
  SignMethod,
} from './models'
import { sign } from "./algoCrypto"

export class AlgorandSignMessage implements Interfaces.SignMessage {
  constructor(message: string, options?: Models.SignMessageOptions ) {
    this.applyOptions(options)
    this.setSignMethod()
    this.applyMessage(message)
    this._isValidated = false
  }

  private _isValidated: boolean

  private _signMethod: string

  private _options: Models.SignMessageOptions

  private _message: string

  private applyOptions(options: Models.SignMessageOptions) {
    this._options = options ? options : { signMethod: SignMethod.Default}
  }

  private applyMessage(message: string) {
    this._message = message
  }

  /** Options provided when the SignMessage class was created */
  get options(): Models.SignMessageOptions {
    return this._options
  }

  /** Date provided when the SignMessage class was created */
  get message(): AlgoSignDataInput {
    return {
      stringToSign: this._message
    }
  }

  /* Set the signMethod and ensure that is lowercase */
  private setSignMethod() {
    const signMethod = this.options?.signMethod.toLowerCase()
    this._signMethod = signMethod
  }

  get signMethod() {
    return this._signMethod
  }

  /** Whether message structure has been validated - via validate() */
  get isValidated() {
    return this._isValidated
  }

  /** Verifies that the structure of the signature request is valid.
   *  Throws if any problems */
  public async validate(): Promise<Models.SignMessageValidateResult> {
    if (this.signMethod !== SignMethod.Default) {
      Errors.throwNewError(`signMethod not recognized. signMethod provided = ${this.signMethod}`)
    }
    const isValid = this.validateAlgoSignInput(this.message).valid
    this._isValidated = isValid
    return  {
      valid: isValid
    }
  }

  /** Throws if not validated */
  private assertIsValidated(): void {
    if (!this._isValidated) {
      Errors.throwNewError('SignMessage not validated. Call SignMessage.validate() first.')
    }
  }

  private validateAlgoSignInput(data: AlgoSignDataInput): Models.SignMessageValidateResult {
    let result: Models.SignMessageValidateResult
  
    let message = ''
    let valid = true
  
    // Check that the stringToSign property exists.
    if (!data || !data.stringToSign) {
      message += ' stringToSign property is missing.'
      valid = false
    }
  
    // Check that message is string
    if (typeof data.stringToSign !== 'string') {
      message += ' stringToSign property must be a string.'
      valid = false
    }
  
    /* If any part of the input is not valid then let's build an example to reply with */
    if (!valid) {
      const fullMessage = `The data supplied to personalSign is incorrectly formatted or missing: ${message}`
  
      const example = {
        stringToSign: 'The message you would like to sign here',
      }
  
      result = {
        valid,
        message: fullMessage,
        example,
      }
    } else {
      result = {
        valid: true,
        message: '',
        example: {},
      }
    }
  
    return result
  }
  

  /** Sign the string or structured data */
  public async sign(privateKeys: AlgorandPrivateKey[]): Promise<Models.SignMessageResult> {
    this.assertIsValidated()
    let result: Models.SignMessageResult
    try {
      const privateKey = privateKeys[0]
      const signature = sign (this.message.stringToSign, privateKey)
      result = {
        signature,
      }
    } catch (error) {
      Errors.throwNewError('Erorr in SignMessage.sign() - ', error)
    }

    return result
  }
}
