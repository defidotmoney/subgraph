import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddMarket } from "../generated/schema"
import { AddMarket as AddMarketEvent } from "../generated/CDPMainController/CDPMainController"
import { handleAddMarket } from "../src/cdp-main-controller"
import { createAddMarketEvent } from "./cdp-main-controller-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let collateral = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let market = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amm = Address.fromString("0x0000000000000000000000000000000000000001")
    let mp_idx = BigInt.fromI32(234)
    let newAddMarketEvent = createAddMarketEvent(
      collateral,
      market,
      amm,
      mp_idx
    )
    handleAddMarket(newAddMarketEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddMarket created and stored", () => {
    assert.entityCount("AddMarket", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddMarket",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "collateral",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddMarket",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "market",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddMarket",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amm",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddMarket",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "mp_idx",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
