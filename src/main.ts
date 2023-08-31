import { createScClient, WellKnownChain } from "@substrate/connect"
import { calamari } from "./calamari_spec"

const health = () => {
  calamari.sendJsonRpc(
    '{"jsonrpc":"2.0","id":"foo","method":"system_health","params":[]}',
  )
}

// Create the client
const client = createScClient()
// add the Kusama chain
await client.addWellKnownChain(WellKnownChain.ksmcc3)
//setup the initial json
let prev = { isSyncing: false, peers: -1, shouldHavePeers: false }

const calamari = await client.addChain(parachainspec, (response) => {
  setTimeout(health, 1_000)

  const { result } = JSON.parse(response)
  if (
    result.isSyncing !== prev.isSyncing ||
    result.peers !== prev.peers ||
    result.shouldHavePeers !== prev.shouldHavePeers
  ) {
    console.log("system health update:", result)
    prev = result
  } else {
    console.count("system health remains the same")
  }
})

health()
