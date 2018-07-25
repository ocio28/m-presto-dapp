import {MPresto} from 'm-presto-contracts'
import {network, createContract, getAccounts} from '../lib/Eth'

export default class MPrestoContract {
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

  createItem(_name, _quantity) {
    return getAccounts().then(accounts => {
      if (accounts.length > 0) {
        return this.contract.methods.createItem(_name, _quantity).send({from: accounts[0]})
      }
      return Promise.reject('No hay cuenta seleccionada')
    })
  }

  getItemsByOwner() {

  }

  transfer() {

  }
}
