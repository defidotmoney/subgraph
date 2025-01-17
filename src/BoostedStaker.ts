import {
  // AccountWeightUpdated as AccountWeightUpdatedEvent,
  // ApprovedUnstakerSet as ApprovedUnstakerSetEvent,
  // LocksDisabled as LocksDisabledEvent,
  Staked as StakedEvent,
  Unstaked as UnstakedEvent
} from "../generated/BoostedStaker-0/BoostedStaker"
import {
  // AccountWeightUpdated,
  // ApprovedUnstakerSet,
  // LocksDisabled,
  Staked,
  Unstaked,
  HistoryItem
} from "../generated/schema"

// export function handleAccountWeightUpdated(
//   event: AccountWeightUpdatedEvent
// ): void {
//   let entity = new AccountWeightUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.account = event.params.account
//   entity.epoch = event.params.epoch
//   entity.timestamp = event.params.timestamp
//   entity.newWeight = event.params.newWeight

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleApprovedUnstakerSet(
//   event: ApprovedUnstakerSetEvent
// ): void {
//   let entity = new ApprovedUnstakerSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.account = event.params.account
//   entity.caller = event.params.caller
//   entity.isApproved = event.params.isApproved

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleLocksDisabled(event: LocksDisabledEvent): void {
//   let entity = new LocksDisabled(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

export function handleStaked(event: StakedEvent): void {
  let entity = new Staked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.epoch = event.params.epoch
  entity.amount = event.params.amount
  entity.weightAdded = event.params.weightAdded
  entity.isLocked = event.params.isLocked

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "stake-boostedstaker"
  historyItem.user = event.params.account
  historyItem.contract_address = event.address
  historyItem.amount = event.params.amount
  historyItem.epoch = event.params.epoch
  historyItem.weightAdded = event.params.weightAdded
  historyItem.isLocked = event.params.isLocked
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()
}

export function handleUnstaked(event: UnstakedEvent): void {
  let entity = new Unstaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.epoch = event.params.epoch
  entity.amount = event.params.amount
  entity.weightRemoved = event.params.weightRemoved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let historyItem = new HistoryItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  historyItem.type = "unstake-boostedstaker"
  historyItem.user = event.params.account
  historyItem.contract_address = event.address
  historyItem.amount = event.params.amount
  historyItem.epoch = event.params.epoch
  historyItem.weightRemoved = event.params.weightRemoved
  historyItem.blockNumber = event.block.number
  historyItem.blockTimestamp = event.block.timestamp
  historyItem.transactionHash = event.transaction.hash
  historyItem.save()
}
