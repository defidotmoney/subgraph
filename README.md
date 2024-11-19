# DFM Subgraph at Goldsky

This repository hosts the source code for our subgraphs currently deployed at Goldsky.

> Internal Goldsky dashboard with all the subgraphs: https://app.goldsky.com/project_cm0o4lqf0gcwk01wgfvngagf0/dashboard/subgraphs
  
## Endpoints
  
- 🔴 Optimism: [`/dev`](https://api.goldsky.com/api/public/project_cm0o4lqf0gcwk01wgfvngagf0/subgraphs/defi-money-optimism/dev/gn) and [`/prod`](https://api.goldsky.com/api/public/project_cm0o4lqf0gcwk01wgfvngagf0/subgraphs/defi-money-optimism/prod/gn) 
- ⚪️ Arbitrum: [`/dev`](https://api.goldsky.com/api/public/project_cm0o4lqf0gcwk01wgfvngagf0/subgraphs/defi-money-arbitrum/dev/gn) and [`/prod`](https://api.goldsky.com/api/public/project_cm0o4lqf0gcwk01wgfvngagf0/subgraphs/defi-money-arbitrum/prod/gn)
- 🔵 Base: [`/dev`](https://api.goldsky.com/api/public/project_cm0o4lqf0gcwk01wgfvngagf0/subgraphs/defi-money-base/dev/gn) and [`/prod`](https://api.goldsky.com/api/public/project_cm0o4lqf0gcwk01wgfvngagf0/subgraphs/defi-money-base/prod/gn)

We use the same codebase for all chains, but we deploy a different subgraph for each chain.

They're basically the same but different :lol:

The differences between them are:
- The sMONEY events only exist on Optimism (because sMONEY is only available on Optimism).
- Addresses for collateral, AMMs, and stakers may be different for each chain.

All of them behave the same besides the above differences.

### Tracked Contracts

The following contracts and events are tracked:

- **MainController**: This is the main contract where loan operations are managed, it emits:
  - `CreateLoan` (an user created a loan)
  - `AdjustLoan` (an user adjusted a loan)
  - `CloseLoan` (an user closed a loan)
  - `LiquidateLoan` (an user loan was liquidated)
- **BridgeToken**: This is the $MONEY token and we listen for the bridge events:
  - `OFTReceived` (an user received $MONEY from another chain)
  - `OFTSent` (an user sent $MONEY to another chain)
- **AMM**: The AMM contracts contain Automated Loan Protection activity
  - `TokenExchange` (LLAMMA exchanged collateral token for $MONEY)
  - `DepositAMM` (LLAMMA activity deposit event)
  - `WithdrawAMM` (LLAMMA activity withdraw event)
  - `SetRate` (the borrow rate for this collateral was changed)
- **BoostedStaker**: The staker contracts that handle staking for all tokens but sMoney
  - `Staked` (an user staked a token)
  - `Unstaked` (an user unstaked a token)
- **StableStaker**: The staker contract that handles staking for sMoney (only available on Optimism)
  - `Deposit` (an user staked $MONEY for $sMONEY)
  - `Unstake` (an user unstaked $sMONEY)
  - `Cooldown` (an user entered cooldown to withdraw $sMONEY into $MONEY)

### Custom Entities

- **UserSMoneyDeposits**: Tracks the absolute $MONEY deposited for a user into $sMONEY (used to calculate the money earned while deposited in smoney)
- **UserSMoneyTransfers**: Tracks the absolute $MONEY transferred for a user (used to calculate the money earned while deposited in smoney)
- **BorrowRate**: Tracks the borrowing rate for a collateral and aggregates results by day
- **MoneyDebt**: Tracks the total debt across all loans (deprecated, we use an internal API for this now)
- **LoanCount**: Tracks the total number of loans created in a chain
- **HistoryItem**: Tracks all the events that we show in the history page in our app
- **TotalBridged**: Tracks the total amount of $MONEY bridged from and to this chain

## Deploy

You can deploy any subgraph easily using our Github Actions: https://github.com/defidotmoney/subgraph/actions

- First you use the "Deploy" action to deploy the subgraph which automatically makes it the `/dev` endpoint
  - This requires a SemVer version bump, see Goldsky dashboard for current versions
- Then you can promote it to `/prod` by using the "Tag Prod" actions
- Then you can delete the previous subgraph version with the "Delete" action after `/prod` is confirmed to be working (each subgraph running incurs recurring costs)

### Development

Install dependencies and login to Goldsky

```sh
pnpm install
curl https://goldsky.com | sh
goldsky login
```

Before deploying we need to run `graph codegen` and `graph build`, you should run this and see no errors before trying to deploy a new subgraph

### Manually Deploying Optimism

```sh
pnpm codegen:op
pnpm build
goldsky subgraph deploy defi-money-op/1.x.x --tag dev
```

### Manually Deploying Arbitrum

```sh
pnpm codegen:arb
pnpm build
goldsky subgraph deploy defi-money-arb/1.x.x --tag dev
```

### Manually Deploying Base

```sh
pnpm codegen:base
pnpm build
goldsky subgraph deploy defi-money-base/1.x.x --tag dev
```

## Hot Tips for Maintenance

### Adding new collateral

When new collateral is added to DFM MainController, we need to add the collateral AMM to the subgraph

- Go to MainController contract and find the collateral market address there
- Find the AMM address in the market contract, copy the **address** and the **block number** of the oldest "internal transaction".
- Add the AMM to `prod.yaml` for the chain you're deploying to
  - find the AMMs in `prod.yaml` and duplicate the last amm  
  - change the address and bump the AMM index in the name (e.g., `AMM-1` -> `AMM-2`,)

### Adding a new network

Adding a new network is as simple as duplicating the existing chain folder and changing the name. (duplicate from Arb or Base, sMONEY is exclusive to Optimism so you don't want the sMONEY stuff duplicated)

Duplicate the GitHub workflows for deployment.

### Adding new contracts

`graph init` in a new folder or `graph add CONTRACT_ADDRESS` gives you all the files you need to add a new contract to a subgraph, you only need the `schema.graphql`, the `subgraph.yaml` dataSources, and the `.ts` in files in `src` folder
