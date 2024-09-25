import {
  TokenExchange as TokenExchangeEvent,
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
  SetRate as SetRateEvent
} from "../generated/LLAMMA-AMM-0x9cabC4d0eD66Ff48625D6f973A784c7234eB2B80/LLAMMA_AMM"
import { TokenExchange, Deposit, Withdraw, SetRate } from "../generated/schema"
import { Address } from "@graphprotocol/graph-ts"

// Helper function to handle TokenExchange events
function handleTokenExchangeHelper(event: TokenExchangeEvent, ammAddress: Address): void {
  let entity = new TokenExchange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.sold_id = event.params.sold_id
  entity.tokens_sold = event.params.tokens_sold
  entity.bought_id = event.params.bought_id
  entity.tokens_bought = event.params.tokens_bought
  entity.amm_address = ammAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// Helper function to handle Deposit events
function handleDepositHelper(event: DepositEvent, ammAddress: Address): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.provider = event.params.provider
  entity.amount = event.params.amount
  entity.n1 = event.params.n1
  entity.n2 = event.params.n2
  entity.amm_address = ammAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// Helper function to handle Withdraw events
function handleWithdrawHelper(event: WithdrawEvent, ammAddress: Address): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.provider = event.params.provider
  entity.amount_borrowed = event.params.amount_borrowed
  entity.amount_collateral = event.params.amount_collateral
  entity.amm_address = ammAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// Helper function to handle SetRate events
function handleSetRateHelper(event: SetRateEvent, ammAddress: Address): void {
  let entity = new SetRate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.rate = event.params.rate
  entity.rate_mul = event.params.rate_mul
  entity.time = event.params.time
  entity.amm_address = ammAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
// Event handlers for LLAMMA-AMM-0x9cabC4d0eD66Ff48625D6f973A784c7234eB2B80
export function handleTokenExchange0x9cabC(event: TokenExchangeEvent): void {
  handleTokenExchangeHelper(event, Address.fromString("0x9cabC4d0eD66Ff48625D6f973A784c7234eB2B80"))
}

export function handleDeposit0x9cabC(event: DepositEvent): void {
  handleDepositHelper(event, Address.fromString("0x9cabC4d0eD66Ff48625D6f973A784c7234eB2B80"))
}

export function handleWithdraw0x9cabC(event: WithdrawEvent): void {
  handleWithdrawHelper(event, Address.fromString("0x9cabC4d0eD66Ff48625D6f973A784c7234eB2B80"))
}

export function handleSetRate0x9cabC(event: SetRateEvent): void {
  handleSetRateHelper(event, Address.fromString("0x9cabC4d0eD66Ff48625D6f973A784c7234eB2B80"))
}

// Event handlers for LLAMMA-AMM-0xE73a960cD30659714aa8275Aa12aeec918e729D8
export function handleTokenExchange0xE73a(event: TokenExchangeEvent): void {
  handleTokenExchangeHelper(event, Address.fromString("0xE73a960cD30659714aa8275Aa12aeec918e729D8"))
}

export function handleDeposit0xE73a(event: DepositEvent): void {
  handleDepositHelper(event, Address.fromString("0xE73a960cD30659714aa8275Aa12aeec918e729D8"))
}

export function handleWithdraw0xE73a(event: WithdrawEvent): void {
  handleWithdrawHelper(event, Address.fromString("0xE73a960cD30659714aa8275Aa12aeec918e729D8"))
}

export function handleSetRate0xE73a(event: SetRateEvent): void {
  handleSetRateHelper(event, Address.fromString("0xE73a960cD30659714aa8275Aa12aeec918e729D8"))
}

