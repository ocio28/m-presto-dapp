import {MPresto} from 'm-presto-contracts'
import {network, createContract, getAccounts} from '../lib/Eth'

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

  createItem(_name, _quantity) {
    return getAccounts().then(this._firstAccount).then(from => {
        return this.contract.methods.createItem(_name, _quantity).send({from})
    })
  }

  getItemsByOwner(address) {
    return this.contract.methods.getItemsByOwner(address).call()
  }

  transfer(_to, _itemId) {
    return getAccounts().then(this._firstAccount).then(from => {
        return this.contract.methods.transfer(_to, _itemId).send({from})
    })
  }

  _firstAccount = (accounts) => {
    if (accounts.length === 0) return Promise.reject('No hay cuenta seleccionada')
    return Promise.resolve(accounts[0])
  }
}

export default new MPrestoContract()
