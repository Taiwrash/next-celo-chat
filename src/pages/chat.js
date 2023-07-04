import { useEffect, useState } from 'react'
import { getMessages } from '../lib/chat-utils'
import Chatbox from '../components/chatbox'
import Layout from '../components/layout'
import useWallet from '../lib/connectWallet'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const isConnected = useWallet()

  useEffect(() => {
    setMessages(getMessages())
  }, [])

  if (!isConnected) {
    return <div>Connecting...</div>
  }

  return (
    <Layout>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <p>
              <strong>{msg.sender}:</strong> {msg.content}
            </p>
          </div>
        ))}
        <Chatbox />
      </div>
    </Layout>
  )
}
