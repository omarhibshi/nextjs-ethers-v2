import Image from "next/image"
//import styles from "../styles/page.module.css"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi } from "../constants/abi"

export default function Home() {
    const { enableWeb3, isWeb3Enabled } = useMoralis()
    const { runContractFunction } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        functionName: "store",
        params: { _favoriteNumber: 49 },
    })

    return (
        <div>
            {isWeb3Enabled ? (
                "Connected! "
            ) : (
                <button onClick={() => enableWeb3()}>Connect</button>
            )}

            {isWeb3Enabled ? (
                <button onClick={() => runContractFunction()}>Execute</button>
            ) : (
                ""
            )}
        </div>
    )
}
