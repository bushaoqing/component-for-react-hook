import ReactDOM from 'react-dom'
import Container from './Container'

const toastContainerDiv = document.createElement('div')
document.body.appendChild(toastContainerDiv)

const addMsg = (msg, type) => {
  ReactDOM.render(<Container info={{msg, type}} />, toastContainerDiv)
}

export default {
  info: msg => {addMsg(msg, 'info')},
  success: msg => {addMsg(msg, 'success')},
  warn: msg => {addMsg(msg, 'warn')},
  error: msg => {addMsg(msg, 'error')}
}
