import {
  AddMarket as AddMarketEvent,
  SetDelegateApproval as SetDelegateApprovalEvent,
  SetDelegationEnabled as SetDelegationEnabledEvent,
  SetProtocolEnabled as SetProtocolEnabledEvent,
  SetImplementations as SetImplementationsEvent,
  AddMarketHook as AddMarketHookEvent,
  RemoveMarketHook as RemoveMarketHookEvent,
  HookDebtAjustment as HookDebtAjustmentEvent,
  AddMonetaryPolicy as AddMonetaryPolicyEvent,
  ChangeMonetaryPolicy as ChangeMonetaryPolicyEvent,
  ChangeMonetaryPolicyForMarket as ChangeMonetaryPolicyForMarketEvent,
  SetGlobalMarketDebtCeiling as SetGlobalMarketDebtCeilingEvent,
  SetPegKeeperRegulator as SetPegKeeperRegulatorEvent,
  CreateLoan as CreateLoanEvent,
  AdjustLoan as AdjustLoanEvent,
  CloseLoan as CloseLoanEvent,
  LiquidateLoan as LiquidateLoanEvent,
  CollectAmmFees as CollectAmmFeesEvent,
  CollectFees as CollectFeesEvent
} from "../generated/CDPMainController/CDPMainController"
import {
  AddMarket,
  SetDelegateApproval,
  SetDelegationEnabled,
  SetProtocolEnabled,
  SetImplementations,
  AddMarketHook,
  RemoveMarketHook,
  HookDebtAjustment,
  AddMonetaryPolicy,
  ChangeMonetaryPolicy,
  ChangeMonetaryPolicyForMarket,
  SetGlobalMarketDebtCeiling,
  SetPegKeeperRegulator,
  CreateLoan,
  AdjustLoan,
  CloseLoan,
  LiquidateLoan,
  CollectAmmFees,
  CollectFees
} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"
import { MoneyDebt } from "../generated/schema"

export function handleAddMarket(event: AddMarketEvent): void {
  let entity = new AddMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.collateral = event.params.collateral
  entity.market = event.params.market
  entity.amm = event.params.amm
  entity.mp_idx = event.params.mp_idx

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetDelegateApproval(
  event: SetDelegateApprovalEvent
): void {
  let entity = new SetDelegateApproval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.delegate = event.params.delegate
  entity.is_approved = event.params.is_approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetDelegationEnabled(
  event: SetDelegationEnabledEvent
): void {
  let entity = new SetDelegationEnabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.is_enabled = event.params.is_enabled

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetProtocolEnabled(event: SetProtocolEnabledEvent): void {
  let entity = new SetProtocolEnabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.is_enabled = event.params.is_enabled

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetImplementations(event: SetImplementationsEvent): void {
  let entity = new SetImplementations(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.A = event.params.A
  entity.amm = event.params.amm
  entity.market = event.params.market

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddMarketHook(event: AddMarketHookEvent): void {
  let entity = new AddMarketHook(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.hook = event.params.hook
  entity.hook_type = event.params.hook_type
  entity.active_hooks = event.params.active_hooks

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveMarketHook(event: RemoveMarketHookEvent): void {
  let entity = new RemoveMarketHook(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.hook = event.params.hook
  entity.hook_debt_released = event.params.hook_debt_released

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHookDebtAjustment(event: HookDebtAjustmentEvent): void {
  let entity = new HookDebtAjustment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.hook = event.params.hook
  entity.adjustment = event.params.adjustment
  entity.new_hook_debt = event.params.new_hook_debt
  entity.new_total_hook_debt = event.params.new_total_hook_debt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddMonetaryPolicy(event: AddMonetaryPolicyEvent): void {
  let entity = new AddMonetaryPolicy(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.mp_idx = event.params.mp_idx
  entity.monetary_policy = event.params.monetary_policy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeMonetaryPolicy(
  event: ChangeMonetaryPolicyEvent
): void {
  let entity = new ChangeMonetaryPolicy(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.mp_idx = event.params.mp_idx
  entity.monetary_policy = event.params.monetary_policy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeMonetaryPolicyForMarket(
  event: ChangeMonetaryPolicyForMarketEvent
): void {
  let entity = new ChangeMonetaryPolicyForMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.mp_idx = event.params.mp_idx

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetGlobalMarketDebtCeiling(
  event: SetGlobalMarketDebtCeilingEvent
): void {
  let entity = new SetGlobalMarketDebtCeiling(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.debt_ceiling = event.params.debt_ceiling

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetPegKeeperRegulator(
  event: SetPegKeeperRegulatorEvent
): void {
  let entity = new SetPegKeeperRegulator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.regulator = event.params.regulator
  entity.with_migration = event.params.with_migration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function getOrCreateMoneyDebt(timestamp: BigInt): MoneyDebt {
  let dayId = timestamp.div(BigInt.fromI32(86400)).toString()
  let moneyDebt = MoneyDebt.load(dayId)
  
  if (!moneyDebt) {
    moneyDebt = new MoneyDebt(dayId)
    moneyDebt.date = timestamp.div(BigInt.fromI32(86400)).times(BigInt.fromI32(86400))
    moneyDebt.totalDebt = BigInt.fromI32(0)
  }
  
  return moneyDebt
}

export function handleCreateLoan(event: CreateLoanEvent): void {
  let entity = new CreateLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.account = event.params.account
  entity.caller = event.params.caller
  entity.coll_amount = event.params.coll_amount
  entity.debt_amount = event.params.debt_amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  
  let moneyDebt = getOrCreateMoneyDebt(event.block.timestamp)
  moneyDebt.totalDebt = moneyDebt.totalDebt.plus(event.params.debt_amount)
  moneyDebt.save()

  entity.save()
}

export function handleAdjustLoan(event: AdjustLoanEvent): void {
  let entity = new AdjustLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.account = event.params.account
  entity.caller = event.params.caller
  entity.coll_adjustment = event.params.coll_adjustment
  entity.debt_adjustment = event.params.debt_adjustment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let moneyDebt = getOrCreateMoneyDebt(event.block.timestamp)
  moneyDebt.totalDebt = moneyDebt.totalDebt.plus(event.params.debt_adjustment)
  moneyDebt.save()

  entity.save()
}

export function handleCloseLoan(event: CloseLoanEvent): void {
  let entity = new CloseLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.account = event.params.account
  entity.caller = event.params.caller
  entity.coll_withdrawn = event.params.coll_withdrawn
  entity.debt_withdrawn = event.params.debt_withdrawn
  entity.debt_repaid = event.params.debt_repaid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  
  let moneyDebt = getOrCreateMoneyDebt(event.block.timestamp)
  moneyDebt.totalDebt = moneyDebt.totalDebt.minus(event.params.debt_repaid)
  moneyDebt.save()

  entity.save()
}

export function handleLiquidateLoan(event: LiquidateLoanEvent): void {
  let entity = new LiquidateLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.liquidator = event.params.liquidator
  entity.account = event.params.account
  entity.coll_received = event.params.coll_received
  entity.debt_received = event.params.debt_received
  entity.debt_repaid = event.params.debt_repaid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  let moneyDebt = getOrCreateMoneyDebt(event.block.timestamp)
  moneyDebt.totalDebt = moneyDebt.totalDebt.minus(event.params.debt_repaid)
  moneyDebt.save()

  entity.save()
}

export function handleCollectAmmFees(event: CollectAmmFeesEvent): void {
  let entity = new CollectAmmFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.market = event.params.market
  entity.amm_coll_fees = event.params.amm_coll_fees
  entity.amm_debt_fees = event.params.amm_debt_fees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCollectFees(event: CollectFeesEvent): void {
  let entity = new CollectFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.minted = event.params.minted
  entity.redeemed = event.params.redeemed
  entity.total_debt = event.params.total_debt
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
