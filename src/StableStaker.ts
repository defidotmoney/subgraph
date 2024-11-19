import {
  // Approval as ApprovalEvent,
  // BridgeEnabledSet as BridgeEnabledSetEvent,
  Cooldown as CooldownEvent,
  // CooldownDurationUpdated as CooldownDurationUpdatedEvent,
  Deposit as DepositEvent,
  // EnforcedOptionSet as EnforcedOptionSetEvent,
  // FeeAggregatorSet as FeeAggregatorSetEvent,
  // GovStakerSet as GovStakerSetEvent,
  // MsgInspectorSet as MsgInspectorSetEvent,
  // NewRewardPeriod as NewRewardPeriodEvent,
  // NotifyNewFees as NotifyNewFeesEvent,
  // OFTReceived as OFTReceivedEvent,
  // OFTSent as OFTSentEvent,
  // OwnershipTransferred as OwnershipTransferredEvent,
  // PeerSet as PeerSetEvent,
  // PreCrimeSet as PreCrimeSetEvent,
  // RewardRegulatorSet as RewardRegulatorSetEvent,
  Transfer as TransferEvent,
  Unstake as UnstakeEvent
} from "../generated/StableStaker/StableStaker"
import {
  // Approval,
  // BridgeEnabledSet,
  Cooldown,
  // CooldownDurationUpdated,
  Deposit,
  // EnforcedOptionSet,
  // FeeAggregatorSet,
  // GovStakerSet,
  // MsgInspectorSet,
  // NewRewardPeriod,
  // NotifyNewFees,
  // OFTReceived,
  // OFTSent,
  // OwnershipTransferred,
  // PeerSet,
  // PreCrimeSet,
  // RewardRegulatorSet,
  Transfer,
  UserSMoneyTransfers,
  Unstake,
  UserSMoneyDeposits,
  HistoryItem
} from "../generated/schema"

import { BigInt, Bytes } from "@graphprotocol/graph-ts"

// export function handleApproval(event: ApprovalEvent): void {
//   let entity = new Approval(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.spender = event.params.spender
//   entity.value = event.params.value

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleBridgeEnabledSet(event: BridgeEnabledSetEvent): void {
//   let entity = new BridgeEnabledSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.caller = event.params.caller
//   entity.isEnabled = event.params.isEnabled

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

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

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "cooldown-smoney"
  historyItem.user = event.params.caller
  historyItem.contract_address = event.address
  historyItem.amount = event.params.assets
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()
}

// export function handleCooldownDurationUpdated(
//   event: CooldownDurationUpdatedEvent
// ): void {
//   let entity = new CooldownDurationUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.cooldownDuration = event.params.cooldownDuration

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

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

  // Update UserSMoneyDeposits
  let userDepositsId = Bytes.fromHexString(event.params.owner.toHexString())
  let userDeposits = UserSMoneyDeposits.load(userDepositsId)
  if (userDeposits == null) {
    userDeposits = new UserSMoneyDeposits(userDepositsId)
    userDeposits.balance = BigInt.fromI32(0)
  }
  userDeposits.balance = userDeposits.balance.plus(event.params.assets)
  userDeposits.lastUpdated = event.block.timestamp
  userDeposits.save()

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "deposit-smoney"
  historyItem.user = event.params.owner
  historyItem.contract_address = event.address
  historyItem.amount = event.params.assets
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()
}

// export function handleEnforcedOptionSet(event: EnforcedOptionSetEvent): void {
//   let entity = new EnforcedOptionSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
  
//   let enforcedOptionsBytes = event.params._enforcedOptions.map<Bytes>((option) => {
//     return Bytes.fromUint8Array(Bytes.fromHexString(option.options.toHexString()).subarray(0));
//   });
  
//   entity._enforcedOptions = enforcedOptionsBytes;

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleFeeAggregatorSet(event: FeeAggregatorSetEvent): void {
//   let entity = new FeeAggregatorSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.feeAggregator = event.params.feeAggregator

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleGovStakerSet(event: GovStakerSetEvent): void {
//   let entity = new GovStakerSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.govStaker = event.params.govStaker

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleMsgInspectorSet(event: MsgInspectorSetEvent): void {
//   let entity = new MsgInspectorSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.inspector = event.params.inspector

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleNewRewardPeriod(event: NewRewardPeriodEvent): void {
//   let entity = new NewRewardPeriod(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.day = event.params.day
//   entity.total = event.params.total
//   entity.stakerAmount = event.params.stakerAmount
//   entity.govAmount = event.params.govAmount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleNotifyNewFees(event: NotifyNewFeesEvent): void {
//   let entity = new NotifyNewFees(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.amount = event.params.amount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOFTReceived(event: OFTReceivedEvent): void {
//   let entity = new OFTReceived(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.guid = event.params.guid
//   entity.srcEid = event.params.srcEid
//   entity.toAddress = event.params.toAddress
//   entity.amountReceivedLD = event.params.amountReceivedLD

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOFTSent(event: OFTSentEvent): void {
//   let entity = new OFTSent(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.guid = event.params.guid
//   entity.dstEid = event.params.dstEid
//   entity.fromAddress = event.params.fromAddress
//   entity.amountSentLD = event.params.amountSentLD
//   entity.amountReceivedLD = event.params.amountReceivedLD

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent
// ): void {
//   let entity = new OwnershipTransferred(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.previousOwner = event.params.previousOwner
//   entity.newOwner = event.params.newOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handlePeerSet(event: PeerSetEvent): void {
//   let entity = new PeerSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.eid = event.params.eid
//   entity.peer = event.params.peer

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handlePreCrimeSet(event: PreCrimeSetEvent): void {
//   let entity = new PreCrimeSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.preCrimeAddress = event.params.preCrimeAddress

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRewardRegulatorSet(event: RewardRegulatorSetEvent): void {
//   let entity = new RewardRegulatorSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.regulator = event.params.regulator

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

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

  let sMoneyAddress = Bytes.fromHexString("0x4626C0D31c52991573DDd4dF8F2bB1Bc5101284F")

  // Only update transfer balances is from the sMONEY contract (which means it's anunstake)
  if (!event.params.from.equals(sMoneyAddress)) {
    // Only update transfer balances if the sender is not the zero address (which means it's a deposit)
    if (event.params.from.notEqual(Bytes.fromHexString("0x0000000000000000000000000000000000000000"))) {
      let senderTransfersId = event.params.from
      let senderTransfers = UserSMoneyTransfers.load(senderTransfersId)
      if (senderTransfers == null) {
        senderTransfers = new UserSMoneyTransfers(senderTransfersId)
        senderTransfers.totalTransfers = BigInt.fromI32(0)
      }
      senderTransfers.totalTransfers = senderTransfers.totalTransfers.minus(event.params.value)
      senderTransfers.lastUpdated = event.block.timestamp
      senderTransfers.save()

      let receiverTransfersId = event.params.to
      let receiverTransfers = UserSMoneyTransfers.load(receiverTransfersId)
      if (receiverTransfers == null) {
        receiverTransfers = new UserSMoneyTransfers(receiverTransfersId)
        receiverTransfers.totalTransfers = BigInt.fromI32(0)
      }
      receiverTransfers.totalTransfers = receiverTransfers.totalTransfers.plus(event.params.value)
      receiverTransfers.lastUpdated = event.block.timestamp
      receiverTransfers.save()
    }
  }

  // Create history item for the transfer
  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "transfer-smoney"
  historyItem.user = event.params.from
  historyItem.contract_address = event.address
  historyItem.amount = event.params.value
  historyItem.receiver = event.params.to
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()
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

  // Update UserSMoneyDeposits
  let userDepositsId = Bytes.fromHexString(event.params.owner.toHexString())
  let userDeposits = UserSMoneyDeposits.load(userDepositsId)
  if (userDeposits == null) {
    userDeposits = new UserSMoneyDeposits(userDepositsId)
    userDeposits.balance = BigInt.fromI32(0)
  }
  userDeposits.balance = userDeposits.balance.minus(event.params.assets)
  userDeposits.lastUpdated = event.block.timestamp
  userDeposits.save()

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "unstake-smoney"
  historyItem.user = event.params.owner
  historyItem.contract_address = event.address
  historyItem.amount = event.params.assets
  historyItem.receiver = event.params.receiver
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()
}
