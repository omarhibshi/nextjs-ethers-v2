"use client"
import Image from "next/image"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function Home() {
    //const ethers = require("ethers")
    const [isConnected, setIsConnected] = useState(false)
    const [hasMetamask, setHasMetamask] = useState(false)
    const [signer, setSigner] = useState(undefined)

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true)
        }
    })

    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await ethereum.request({ method: "eth_requestAccounts" })
                setIsConnected(true)
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                )
                setSigner(provider.getSigner())
            } catch (error) {
                console.log(isConnected)
            }
        } else {
            setIsConnected(false)
        }
    }

    async function execute() {
        /**
         * @Notice To execut a function, you need the following:
         *  - ddress :
         *  - contract ABI (blueprint to interac with a contract)
         *  - function
         *  - node connection : Metamask network
         */
        if (typeof window.ethereum !== "undefined") {
            const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
            const abi = [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "_name",
                            type: "string",
                        },
                        {
                            internalType: "uint256",
                            name: "_favoriteNumber",
                            type: "uint256",
                        },
                    ],
                    name: "addPerson",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "",
                            type: "string",
                        },
                    ],
                    name: "nameToFavoriteNumber",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    name: "people",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "favoriteNumber",
                            type: "uint256",
                        },
                        {
                            internalType: "string",
                            name: "name",
                            type: "string",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "retrieve",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "_favoriteNumber",
                            type: "uint256",
                        },
                    ],
                    name: "store",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ]

            const SSContract = new ethers.Contract(contractAddress, abi, signer)
            try {
                await SSContract.store(78)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                Hello frog!
                {hasMetamask ? (
                    isConnected ? (
                        "Connected! "
                    ) : (
                        <button onClick={() => connect()}>Connect</button>
                    )
                ) : (
                    "Please install metamask"
                )}
                {isConnected ? (
                    <button onClick={() => execute()}>Execute</button>
                ) : (
                    ""
                )}
            </div>
        </main>
    )
}
