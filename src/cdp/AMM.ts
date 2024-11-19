import { BigInt, BigDecimal, Bytes } from "@graphprotocol/graph-ts"
import {
  TokenExchange as TokenExchangeEvent,
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
  SetRate as SetRateEvent
} from "../../generated/AMM-0/AMM"
import {
  TokenExchange,
  DepositAMM,
  WithdrawAMM,
  SetRate,
  BorrowRate
} from "../../generated/schema"

export function handleTokenExchange(event: TokenExchangeEvent): void {
  let entity = new TokenExchange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.sold_id = event.params.sold_id
  entity.tokens_sold = event.params.tokens_sold
  entity.bought_id = event.params.bought_id
  entity.tokens_bought = event.params.tokens_bought
  entity.amm_address = event.address 

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new DepositAMM(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.provider = event.params.provider
  entity.amount = event.params.amount
  entity.n1 = event.params.n1
  entity.n2 = event.params.n2
  entity.amm_address = event.address 

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new WithdrawAMM(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.provider = event.params.provider
  entity.amount_borrowed = event.params.amount_borrowed
  entity.amount_collateral = event.params.amount_collateral
  entity.amm_address = event.address 

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetRate(event: SetRateEvent): void {
  let entity = new SetRate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.rate = event.params.rate
  entity.rate_mul = event.params.rate_mul
  entity.time = event.params.time
  entity.amm_address = event.address 

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Create or update BorrowRate entity
  let timestamp = event.block.timestamp
  let dateDay = timestamp.div(BigInt.fromI32(86400)).times(BigInt.fromI32(86400))
  let dateDayString = dateDay.toString()
  let amm_address = event.address

  let borrowRateId = `borrow_rate_${dateDayString}_${amm_address.toHexString()}`
  let borrowRate = BorrowRate.load(borrowRateId)

  if (borrowRate == null) {
    borrowRate = new BorrowRate(borrowRateId)
    borrowRate.dateDay = dateDayString
    borrowRate.amm_address = amm_address
  }

  // Convert rate to percentage per year
  // let ratePerYear = event.params.rate.toBigDecimal().times(BigDecimal.fromString("31536000")) // 365 * 24 * 60 * 60
  // borrowRate.rate = ratePerYear.div(BigDecimal.fromString("1000000000000000000")) // Divide by 1e18 to get percentage
  borrowRate.rate = event.params.rate

  borrowRate.save()
}