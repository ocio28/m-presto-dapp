import * as types from './Types'

export function fetchAlerts() {
  return {
    type: types.SET_ALERTS,
    alerts: fetchFromLocal()
  }
}

export function pushAlert(alert) {
  saveToLocal(alert)
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

const KEY = 'mpresto-alerts'

function fetchFromLocal() {
  if (!window.localStorage) return []
  let alerts = JSON.parse(window.localStorage.getItem(KEY), 'utf-8')
  console.log(alerts)
  return alerts !== null ? alerts : []
}

function saveToLocal(alert) {
  if (!window.localStorage) return
  let alerts = fetchFromLocal()
  window.localStorage.setItem(KEY, JSON.stringify([...alerts, alert]))
}
