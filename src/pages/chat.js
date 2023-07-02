import { useState } from 'react';
import { newKit } from '@celo/contractkit'

let kit;
let goldtoken;

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const sendMessage = async () => {
    if (!kit) {
      kit = newKit('https://alfajores-forno.celo-testnet.org');
      goldtoken = await kit.contracts.getGoldToken();
    }
    const oneGold = kit.connection.web3.utils.toWei('1', 'ether')
    const tx = await goldtoken.transfer('ReceiverAddressHere', oneGold).send({ from: '0x88A8C3A1Daff5f88eD143e7814ac29F5f7e2fe49' });
    const receipt = await tx.waitReceipt();

    console.log('Transaction receipt: ', receipt);
    setMessages([...messages, message])
    setMessage("")
  };

  return (
    <div>
       {/* {messages.map((id, message)=> <p key={id}>{"0x88A8C3A1Daff5f88eD143e7814ac29F5f7e2fe49: " + message}</p>)} */}
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
