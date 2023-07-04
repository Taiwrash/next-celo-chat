import { useState } from 'react'
import { sendMessage } from '../lib/chat-utils'

export default function Chatbox() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // For the purpose of this tutorial, the sender will be 'User1'
    sendMessage('User1', message)

    // Clear the text field
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
      <button type="submit">Send</button>
    </form>
  )
}
