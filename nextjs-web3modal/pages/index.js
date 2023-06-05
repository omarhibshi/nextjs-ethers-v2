import Image from "next/image"
//import styles from "./page.module.css"
import Web3Modal from "web3modal"
import walletConnectProvider from "@walletconnect/web3-provider"

let web3Modal

const providerOptions = {
    walletconnect: {
        package: walletConnectProvider,
        options: {
            rpc: { 42: process.env.SEPOLIA_RPC_URL },
        },
    },
}
export default function Home() {
    async function connect() {
        web3Modal = new Web3Modal({ cacheProvider: false, providerOptions })
        const web3ModalProvider = await web3Modal.connect()
    }
    return (
        <div>
            <button onClick={() => connect()}>Connect</button>
            <button onClick={() => connect()}>Execute</button>
        </div>
    )
}
