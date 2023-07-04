import { kit } from './celo'
import Chat from './Chat.json'

let messages = []
let contract

async function initContract() {
  const networkId = await kit.contracts.getGoldToken()
//   const deployedNetwork = await kit.contracts.getStableToken()

  contract = new kit.web3.eth.Contract(
    Chat.abi,
    networkId && networkId.address,
  )

  contract.events.Message({}, (error, event) => {
    if (error) console.error('Error on event', error)
    else {
      const { sender, content } = event.returnValues
      messages.push({ sender, content })
    }
  })
}

initContract()

export function sendMessage(sender, content) {
  const tx = contract.methods.sendMessage(sender, content).send({ from: kit.defaultAccount })
  console.log('Sent message:', tx)
}

export function getMessages() {
  return messages
}
