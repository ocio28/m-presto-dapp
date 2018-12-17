import Web3 from 'web3'

let web3 = null
/*
export function init() {
  return new Promise((res, rej) => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      window.ethereum.enable().then(res).catch(rej)
    } else if (typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
      res()
    }
    rej()
  })
}*/
export function init() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    return window.ethereum.enable()
  } else if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    return Promise.resolve()
  }
  return Promise.reject('no provider, install metamask')
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
  return web3.utils.hexToUtf8(hex)
}

export function asciiToHex(str) {
  return web3.utils.asciiToHex(str)
}
