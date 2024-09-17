import {
  Approval,
  BridgeEnabledSet,
  Cooldown,
  CooldownDurationUpdated,
  Deposit,
  EnforcedOptionSet,
  FeeAggregatorSet,
  GovStakerSet,
  MsgInspectorSet,
  NewRewardPeriod,
  NotifyNewFees,
  OFTReceived,
  OFTSent,
  OwnershipTransferred,
  PeerSet,
  PreCrimeSet,
  RewardRegulatorSet,
  Transfer,
  Unstake,
  UserBalance
} from "../generated/StableStaker/StableStaker"

import { BigInt, Bytes } from "@graphprotocol/graph-ts"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBridgeEnabledSet(event: BridgeEnabledSetEvent): void {
  let entity = new BridgeEnabledSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.isEnabled = event.params.isEnabled

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCooldown(event: CooldownEvent): void {
  let entity = new Cooldown(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.assets = event.params.assets
  entity.shares = event.params.shares
  entity.cooldownEnd = event.params.cooldownEnd

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCooldownDurationUpdated(
  event: CooldownDurationUpdatedEvent
): void {
  let entity = new CooldownDurationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.cooldownDuration = event.params.cooldownDuration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.owner = event.params.owner
  entity.assets = event.params.assets
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Update UserBalance
  let userBalanceId = event.params.owner.toHexString()
  let userBalance = UserBalance.load(userBalanceId)
  if (userBalance == null) {
    userBalance = new UserBalance(userBalanceId)
    userBalance.balance = BigInt.fromI32(0)
  }
  userBalance.balance = userBalance.balance.plus(event.params.assets)
  userBalance.lastUpdated = event.block.timestamp
  userBalance.save()
}

export function handleEnforcedOptionSet(event: EnforcedOptionSetEvent): void {
  let entity = new EnforcedOptionSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  
  let enforcedOptionsBytes = event.params._enforcedOptions.map<Bytes>((option) => {
    return Bytes.fromUint8Array(Bytes.fromHexString(option.options.toHexString()).subarray(0));
  });
  
  entity._enforcedOptions = enforcedOptionsBytes;

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeAggregatorSet(event: FeeAggregatorSetEvent): void {
  let entity = new FeeAggregatorSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeAggregator = event.params.feeAggregator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovStakerSet(event: GovStakerSetEvent): void {
  let entity = new GovStakerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.govStaker = event.params.govStaker

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMsgInspectorSet(event: MsgInspectorSetEvent): void {
  let entity = new MsgInspectorSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.inspector = event.params.inspector

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewRewardPeriod(event: NewRewardPeriodEvent): void {
  let entity = new NewRewardPeriod(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.day = event.params.day
  entity.total = event.params.total
  entity.stakerAmount = event.params.stakerAmount
  entity.govAmount = event.params.govAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNotifyNewFees(event: NotifyNewFeesEvent): void {
  let entity = new NotifyNewFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOFTReceived(event: OFTReceivedEvent): void {
  let entity = new OFTReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guid = event.params.guid
  entity.srcEid = event.params.srcEid
  entity.toAddress = event.params.toAddress
  entity.amountReceivedLD = event.params.amountReceivedLD

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOFTSent(event: OFTSentEvent): void {
  let entity = new OFTSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.guid = event.params.guid
  entity.dstEid = event.params.dstEid
  entity.fromAddress = event.params.fromAddress
  entity.amountSentLD = event.params.amountSentLD
  entity.amountReceivedLD = event.params.amountReceivedLD

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePeerSet(event: PeerSetEvent): void {
  let entity = new PeerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.eid = event.params.eid
  entity.peer = event.params.peer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePreCrimeSet(event: PreCrimeSetEvent): void {
  let entity = new PreCrimeSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.preCrimeAddress = event.params.preCrimeAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardRegulatorSet(event: RewardRegulatorSetEvent): void {
  let entity = new RewardRegulatorSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.regulator = event.params.regulator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnstake(event: UnstakeEvent): void {
  let entity = new Unstake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.receiver = event.params.receiver
  entity.assets = event.params.assets

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Update UserBalance
  let userBalanceId = event.params.owner.toHexString()
  let userBalance = UserBalance.load(userBalanceId)
  if (userBalance == null) {
    userBalance = new UserBalance(userBalanceId)
    userBalance.balance = BigInt.fromI32(0)
  }
  userBalance.balance = userBalance.balance.minus(event.params.assets)
  userBalance.lastUpdated = event.block.timestamp
  userBalance.save()
}
