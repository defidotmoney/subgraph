import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/CDP Main Controller/CDP Main Controller"

export function createAddMarketEvent(
  collateral: Address,
  market: Address,
  amm: Address,
  mp_idx: BigInt
): AddMarket {
  let addMarketEvent = changetype<AddMarket>(newMockEvent())

  addMarketEvent.parameters = new Array()

  addMarketEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromAddress(collateral)
    )
  )
  addMarketEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  addMarketEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  addMarketEvent.parameters.push(
    new ethereum.EventParam("mp_idx", ethereum.Value.fromUnsignedBigInt(mp_idx))
  )

  return addMarketEvent
}

export function createSetDelegateApprovalEvent(
  account: Address,
  delegate: Address,
  is_approved: boolean
): SetDelegateApproval {
  let setDelegateApprovalEvent = changetype<SetDelegateApproval>(newMockEvent())

  setDelegateApprovalEvent.parameters = new Array()

  setDelegateApprovalEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  setDelegateApprovalEvent.parameters.push(
    new ethereum.EventParam("delegate", ethereum.Value.fromAddress(delegate))
  )
  setDelegateApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "is_approved",
      ethereum.Value.fromBoolean(is_approved)
    )
  )

  return setDelegateApprovalEvent
}

export function createSetDelegationEnabledEvent(
  caller: Address,
  is_enabled: boolean
): SetDelegationEnabled {
  let setDelegationEnabledEvent = changetype<SetDelegationEnabled>(
    newMockEvent()
  )

  setDelegationEnabledEvent.parameters = new Array()

  setDelegationEnabledEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  setDelegationEnabledEvent.parameters.push(
    new ethereum.EventParam(
      "is_enabled",
      ethereum.Value.fromBoolean(is_enabled)
    )
  )

  return setDelegationEnabledEvent
}

export function createSetProtocolEnabledEvent(
  caller: Address,
  is_enabled: boolean
): SetProtocolEnabled {
  let setProtocolEnabledEvent = changetype<SetProtocolEnabled>(newMockEvent())

  setProtocolEnabledEvent.parameters = new Array()

  setProtocolEnabledEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  setProtocolEnabledEvent.parameters.push(
    new ethereum.EventParam(
      "is_enabled",
      ethereum.Value.fromBoolean(is_enabled)
    )
  )

  return setProtocolEnabledEvent
}

export function createSetImplementationsEvent(
  A: BigInt,
  amm: Address,
  market: Address
): SetImplementations {
  let setImplementationsEvent = changetype<SetImplementations>(newMockEvent())

  setImplementationsEvent.parameters = new Array()

  setImplementationsEvent.parameters.push(
    new ethereum.EventParam("A", ethereum.Value.fromUnsignedBigInt(A))
  )
  setImplementationsEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  setImplementationsEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )

  return setImplementationsEvent
}

export function createAddMarketHookEvent(
  market: Address,
  hook: Address,
  hook_type: BigInt,
  active_hooks: Array<boolean>
): AddMarketHook {
  let addMarketHookEvent = changetype<AddMarketHook>(newMockEvent())

  addMarketHookEvent.parameters = new Array()

  addMarketHookEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  addMarketHookEvent.parameters.push(
    new ethereum.EventParam("hook", ethereum.Value.fromAddress(hook))
  )
  addMarketHookEvent.parameters.push(
    new ethereum.EventParam(
      "hook_type",
      ethereum.Value.fromUnsignedBigInt(hook_type)
    )
  )
  addMarketHookEvent.parameters.push(
    new ethereum.EventParam(
      "active_hooks",
      ethereum.Value.fromBooleanArray(active_hooks)
    )
  )

  return addMarketHookEvent
}

export function createRemoveMarketHookEvent(
  market: Address,
  hook: Address,
  hook_debt_released: BigInt
): RemoveMarketHook {
  let removeMarketHookEvent = changetype<RemoveMarketHook>(newMockEvent())

  removeMarketHookEvent.parameters = new Array()

  removeMarketHookEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  removeMarketHookEvent.parameters.push(
    new ethereum.EventParam("hook", ethereum.Value.fromAddress(hook))
  )
  removeMarketHookEvent.parameters.push(
    new ethereum.EventParam(
      "hook_debt_released",
      ethereum.Value.fromUnsignedBigInt(hook_debt_released)
    )
  )

  return removeMarketHookEvent
}

export function createHookDebtAjustmentEvent(
  market: Address,
  hook: Address,
  adjustment: BigInt,
  new_hook_debt: BigInt,
  new_total_hook_debt: BigInt
): HookDebtAjustment {
  let hookDebtAjustmentEvent = changetype<HookDebtAjustment>(newMockEvent())

  hookDebtAjustmentEvent.parameters = new Array()

  hookDebtAjustmentEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  hookDebtAjustmentEvent.parameters.push(
    new ethereum.EventParam("hook", ethereum.Value.fromAddress(hook))
  )
  hookDebtAjustmentEvent.parameters.push(
    new ethereum.EventParam(
      "adjustment",
      ethereum.Value.fromSignedBigInt(adjustment)
    )
  )
  hookDebtAjustmentEvent.parameters.push(
    new ethereum.EventParam(
      "new_hook_debt",
      ethereum.Value.fromUnsignedBigInt(new_hook_debt)
    )
  )
  hookDebtAjustmentEvent.parameters.push(
    new ethereum.EventParam(
      "new_total_hook_debt",
      ethereum.Value.fromUnsignedBigInt(new_total_hook_debt)
    )
  )

  return hookDebtAjustmentEvent
}

export function createAddMonetaryPolicyEvent(
  mp_idx: BigInt,
  monetary_policy: Address
): AddMonetaryPolicy {
  let addMonetaryPolicyEvent = changetype<AddMonetaryPolicy>(newMockEvent())

  addMonetaryPolicyEvent.parameters = new Array()

  addMonetaryPolicyEvent.parameters.push(
    new ethereum.EventParam("mp_idx", ethereum.Value.fromUnsignedBigInt(mp_idx))
  )
  addMonetaryPolicyEvent.parameters.push(
    new ethereum.EventParam(
      "monetary_policy",
      ethereum.Value.fromAddress(monetary_policy)
    )
  )

  return addMonetaryPolicyEvent
}

export function createChangeMonetaryPolicyEvent(
  mp_idx: BigInt,
  monetary_policy: Address
): ChangeMonetaryPolicy {
  let changeMonetaryPolicyEvent = changetype<ChangeMonetaryPolicy>(
    newMockEvent()
  )

  changeMonetaryPolicyEvent.parameters = new Array()

  changeMonetaryPolicyEvent.parameters.push(
    new ethereum.EventParam("mp_idx", ethereum.Value.fromUnsignedBigInt(mp_idx))
  )
  changeMonetaryPolicyEvent.parameters.push(
    new ethereum.EventParam(
      "monetary_policy",
      ethereum.Value.fromAddress(monetary_policy)
    )
  )

  return changeMonetaryPolicyEvent
}

export function createChangeMonetaryPolicyForMarketEvent(
  market: Address,
  mp_idx: BigInt
): ChangeMonetaryPolicyForMarket {
  let changeMonetaryPolicyForMarketEvent =
    changetype<ChangeMonetaryPolicyForMarket>(newMockEvent())

  changeMonetaryPolicyForMarketEvent.parameters = new Array()

  changeMonetaryPolicyForMarketEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  changeMonetaryPolicyForMarketEvent.parameters.push(
    new ethereum.EventParam("mp_idx", ethereum.Value.fromUnsignedBigInt(mp_idx))
  )

  return changeMonetaryPolicyForMarketEvent
}

export function createSetGlobalMarketDebtCeilingEvent(
  debt_ceiling: BigInt
): SetGlobalMarketDebtCeiling {
  let setGlobalMarketDebtCeilingEvent = changetype<SetGlobalMarketDebtCeiling>(
    newMockEvent()
  )

  setGlobalMarketDebtCeilingEvent.parameters = new Array()

  setGlobalMarketDebtCeilingEvent.parameters.push(
    new ethereum.EventParam(
      "debt_ceiling",
      ethereum.Value.fromUnsignedBigInt(debt_ceiling)
    )
  )

  return setGlobalMarketDebtCeilingEvent
}

export function createSetPegKeeperRegulatorEvent(
  regulator: Address,
  with_migration: boolean
): SetPegKeeperRegulator {
  let setPegKeeperRegulatorEvent = changetype<SetPegKeeperRegulator>(
    newMockEvent()
  )

  setPegKeeperRegulatorEvent.parameters = new Array()

  setPegKeeperRegulatorEvent.parameters.push(
    new ethereum.EventParam("regulator", ethereum.Value.fromAddress(regulator))
  )
  setPegKeeperRegulatorEvent.parameters.push(
    new ethereum.EventParam(
      "with_migration",
      ethereum.Value.fromBoolean(with_migration)
    )
  )

  return setPegKeeperRegulatorEvent
}

export function createCreateLoanEvent(
  market: Address,
  account: Address,
  caller: Address,
  coll_amount: BigInt,
  debt_amount: BigInt
): CreateLoan {
  let createLoanEvent = changetype<CreateLoan>(newMockEvent())

  createLoanEvent.parameters = new Array()

  createLoanEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  createLoanEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  createLoanEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  createLoanEvent.parameters.push(
    new ethereum.EventParam(
      "coll_amount",
      ethereum.Value.fromUnsignedBigInt(coll_amount)
    )
  )
  createLoanEvent.parameters.push(
    new ethereum.EventParam(
      "debt_amount",
      ethereum.Value.fromUnsignedBigInt(debt_amount)
    )
  )

  return createLoanEvent
}

export function createAdjustLoanEvent(
  market: Address,
  account: Address,
  caller: Address,
  coll_adjustment: BigInt,
  debt_adjustment: BigInt
): AdjustLoan {
  let adjustLoanEvent = changetype<AdjustLoan>(newMockEvent())

  adjustLoanEvent.parameters = new Array()

  adjustLoanEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  adjustLoanEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  adjustLoanEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  adjustLoanEvent.parameters.push(
    new ethereum.EventParam(
      "coll_adjustment",
      ethereum.Value.fromSignedBigInt(coll_adjustment)
    )
  )
  adjustLoanEvent.parameters.push(
    new ethereum.EventParam(
      "debt_adjustment",
      ethereum.Value.fromSignedBigInt(debt_adjustment)
    )
  )

  return adjustLoanEvent
}

export function createCloseLoanEvent(
  market: Address,
  account: Address,
  caller: Address,
  coll_withdrawn: BigInt,
  debt_withdrawn: BigInt,
  debt_repaid: BigInt
): CloseLoan {
  let closeLoanEvent = changetype<CloseLoan>(newMockEvent())

  closeLoanEvent.parameters = new Array()

  closeLoanEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam(
      "coll_withdrawn",
      ethereum.Value.fromUnsignedBigInt(coll_withdrawn)
    )
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam(
      "debt_withdrawn",
      ethereum.Value.fromUnsignedBigInt(debt_withdrawn)
    )
  )
  closeLoanEvent.parameters.push(
    new ethereum.EventParam(
      "debt_repaid",
      ethereum.Value.fromUnsignedBigInt(debt_repaid)
    )
  )

  return closeLoanEvent
}

export function createLiquidateLoanEvent(
  market: Address,
  liquidator: Address,
  account: Address,
  coll_received: BigInt,
  debt_received: BigInt,
  debt_repaid: BigInt
): LiquidateLoan {
  let liquidateLoanEvent = changetype<LiquidateLoan>(newMockEvent())

  liquidateLoanEvent.parameters = new Array()

  liquidateLoanEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  liquidateLoanEvent.parameters.push(
    new ethereum.EventParam(
      "liquidator",
      ethereum.Value.fromAddress(liquidator)
    )
  )
  liquidateLoanEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  liquidateLoanEvent.parameters.push(
    new ethereum.EventParam(
      "coll_received",
      ethereum.Value.fromUnsignedBigInt(coll_received)
    )
  )
  liquidateLoanEvent.parameters.push(
    new ethereum.EventParam(
      "debt_received",
      ethereum.Value.fromUnsignedBigInt(debt_received)
    )
  )
  liquidateLoanEvent.parameters.push(
    new ethereum.EventParam(
      "debt_repaid",
      ethereum.Value.fromUnsignedBigInt(debt_repaid)
    )
  )

  return liquidateLoanEvent
}

export function createCollectAmmFeesEvent(
  market: Address,
  amm_coll_fees: BigInt,
  amm_debt_fees: BigInt
): CollectAmmFees {
  let collectAmmFeesEvent = changetype<CollectAmmFees>(newMockEvent())

  collectAmmFeesEvent.parameters = new Array()

  collectAmmFeesEvent.parameters.push(
    new ethereum.EventParam("market", ethereum.Value.fromAddress(market))
  )
  collectAmmFeesEvent.parameters.push(
    new ethereum.EventParam(
      "amm_coll_fees",
      ethereum.Value.fromUnsignedBigInt(amm_coll_fees)
    )
  )
  collectAmmFeesEvent.parameters.push(
    new ethereum.EventParam(
      "amm_debt_fees",
      ethereum.Value.fromUnsignedBigInt(amm_debt_fees)
    )
  )

  return collectAmmFeesEvent
}

export function createCollectFeesEvent(
  minted: BigInt,
  redeemed: BigInt,
  total_debt: BigInt,
  fee: BigInt
): CollectFees {
  let collectFeesEvent = changetype<CollectFees>(newMockEvent())

  collectFeesEvent.parameters = new Array()

  collectFeesEvent.parameters.push(
    new ethereum.EventParam("minted", ethereum.Value.fromUnsignedBigInt(minted))
  )
  collectFeesEvent.parameters.push(
    new ethereum.EventParam(
      "redeemed",
      ethereum.Value.fromUnsignedBigInt(redeemed)
    )
  )
  collectFeesEvent.parameters.push(
    new ethereum.EventParam(
      "total_debt",
      ethereum.Value.fromUnsignedBigInt(total_debt)
    )
  )
  collectFeesEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return collectFeesEvent
}
