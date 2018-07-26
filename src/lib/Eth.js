import Web3 from 'web3'

let web3 = null

export function init() {
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    return true
  }
  return false
}

export function network() {
  return web3.eth.net.getId()
}

export function createContract(abi, address) {
  return new web3.eth.Contract(abi, address)
}

export function getAccounts() {
  return web3.eth.getAccounts()
}

export function hexToUtf8(hex) {
  console.log(hex)
  return web3.utils.hexToUtf8(hex)
}

export function asciiToHex(str) {
  return web3.utils.asciiToHex(str)
}
