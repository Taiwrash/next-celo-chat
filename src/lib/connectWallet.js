import { useEffect, useState } from 'react'
import { kit } from './celo'

export default function useWallet() {
  const [isConnected, setConnected] = useState(false)

  const connect = async () => {
    if (window.celo) {
      try {
        await window.celo.enable()
        kit.defaultAccount = window.celo.selectedAddress
        setConnected(true)
      } catch (error) {
        alert('Failed to connect wallet')
      }
    } else {
      alert('Please install a Celo wallet extension')
    }
  }

  useEffect(() => {
    connect()
  }, [])

  return isConnected
}
