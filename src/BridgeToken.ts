import {
  // Approval as ApprovalEvent,
  // BridgeEnabledSet as BridgeEnabledSetEvent,
  // EIP712DomainChanged as EIP712DomainChangedEvent,
  // EnforcedOptionSet as EnforcedOptionSetEvent,
  // FlashMintEnabledSet as FlashMintEnabledSetEvent,
  // MinterSet as MinterSetEvent,
  // MsgInspectorSet as MsgInspectorSetEvent,
  OFTReceived as OFTReceivedEvent,
  OFTSent as OFTSentEvent,
  // OwnershipTransferred as OwnershipTransferredEvent,
  // PeerSet as PeerSetEvent,
  // PreCrimeSet as PreCrimeSetEvent,
  // Transfer as TransferEvent
} from "../generated/BridgeToken/BridgeToken"
import {
  // Approval,
  // BridgeEnabledSet,
  // EIP712DomainChanged,
  // EnforcedOptionSet,
  // FlashMintEnabledSet,
  // MinterSet,
  // MsgInspectorSet,
  OFTReceived,
  OFTSent,
  // OwnershipTransferred,
  // PeerSet,
  // PreCrimeSet,
  // Transfer
} from "../generated/schema"
import { HistoryItem } from "../generated/schema"
import { TotalBridged } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

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

// export function handleEIP712DomainChanged(
//   event: EIP712DomainChangedEvent
// ): void {
//   let entity = new EIP712DomainChanged(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleEnforcedOptionSet(event: EnforcedOptionSetEvent): void {
//   let entity = new EnforcedOptionSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity._enforcedOptions = event.params._enforcedOptions

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleFlashMintEnabledSet(
//   event: FlashMintEnabledSetEvent
// ): void {
//   let entity = new FlashMintEnabledSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.caller = event.params.caller
//   entity.isEnabled = event.params.isEnabled

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleMinterSet(event: MinterSetEvent): void {
//   let entity = new MinterSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.minter = event.params.minter
//   entity.isApproved = event.params.isApproved

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

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "bridge-oftreceived"
  historyItem.user = event.params.toAddress
  historyItem.contract_address = event.address
  historyItem.amount = event.params.amountReceivedLD
  historyItem.guid = event.params.guid
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()

  let totalBridged = TotalBridged.load("total")
  if (!totalBridged) {
    totalBridged = new TotalBridged("total")
    totalBridged.total = BigInt.fromI32(0)
  }
  
  totalBridged.total = totalBridged.total.plus(event.params.amountReceivedLD)
  totalBridged.lastUpdated = event.block.timestamp
  totalBridged.save()
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

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "bridge-otfsent"
  historyItem.user = event.params.fromAddress
  historyItem.contract_address = event.address
  historyItem.amount = event.params.amountSentLD
  historyItem.guid = event.params.guid
  historyItem.dstEid = event.params.dstEid
  historyItem.amountSentLD = event.params.amountSentLD
  historyItem.amountReceivedLD = event.params.amountReceivedLD
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()

  let totalBridged = TotalBridged.load("total")
  if (!totalBridged) {
    totalBridged = new TotalBridged("total")
    totalBridged.total = BigInt.fromI32(0)
  }
  
  totalBridged.total = totalBridged.total.minus(event.params.amountSentLD)
  totalBridged.lastUpdated = event.block.timestamp
  totalBridged.save()
}

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

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.value = event.params.value

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
