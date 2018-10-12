import * as types from './Types'
import mprestoContract from '../contracts/MPrestoContract'
import {hexToUtf8} from '../lib/Eth'

const KEY = 'mpresto-alerts'

function fetchFromLocal() {
  if (!window.localStorage) return []
  let alerts = JSON.parse(window.localStorage.getItem(KEY), 'utf-8')
  return alerts !== null ? alerts : []
}

export function stateToLocal(state) {
  if (!window.localStorage) return
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

export function fetchAlerts() {
  return {
    type: types.SET_ALERTS,
    alerts: fetchFromLocal()
  }
}

export function pushAlert(alert) {
  return {
    type: types.PUSH_ALERT,
    alert
  }
}

export function removeAlert(index) {
  return {
    type: types.REMOVE_ALERT,
    index
  }
}

export function setNickname(nickname) {
  return mprestoContract.setNickname(nickname).then(() => ({
    type: types.SET_NICKNAME,
    nickname
  }))
}

export const fetchNickname = (account) =>
  mprestoContract.getNickname(account).then(nickname => ({
    type: types.SET_NICKNAME,
    nickname: hexToUtf8(nickname).trim()
  }))
