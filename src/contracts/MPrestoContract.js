import {MPresto} from 'm-presto-contracts'
import {network, createContract, getAccounts, asciiToHex} from '../lib/Eth'

class MPrestoContract {
  constructor() {
    this.contract = null
  }

  init() {
    return network().then(network => {
      let artifact = MPresto.v1
      this.contract = createContract(artifact.abi, MPresto.v1.networks[network].address)
      return Promise.resolve(this)
    })
  }

  getItem(_itemId) {
    return this.contract.methods.items(_itemId).call()
  }

  getItemsByOwner(address) {
    return this.contract.methods.getItemsByOwner(address).call()
  }

  getNickname(_address) {
    return this.contract.methods.ownerNickname(_address).call()
  }

  createItem(_name, _quantity) {
    return getAccounts().then(this._firstAccount).then(from => {
        return this.contract.methods.createItem(_name, _quantity).send({from})
    })
  }

  transfer(_to, _itemId) {
    return getAccounts().then(this._firstAccount).then(from => {
        return this.contract.methods.transfer(_to, _itemId).send({from})
    })
  }

  setNickname(_nickname) {
    return getAccounts().then(this._firstAccount).then(from => {
      return this.contract.methods.setNickname(asciiToHex(_nickname)).send({from})
    })
  }

  _firstAccount = (accounts) => {
    if (accounts.length === 0) return Promise.reject('No hay cuenta seleccionada')
    return Promise.resolve(accounts[0])
  }
}

export default new MPrestoContract()
