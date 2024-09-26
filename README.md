# subgraph @ godlsky

this repository hosts the source code for our subgraph which is currently
deployed on Goldsky.

We have 4 different subgraphs
 - optimism/dev
 - optimism/prod
 - arbitrum/dev
 - arbitrum/prod

They're basically the same but different :lol:

There are a couple of small exceptions, for instance the sMONEY pool
only exists on optimism, not on arbitrum.

## installing

```sh
pnpm install
curl https://goldsky.com | sh
goldsky login
```

## deploying dev op

```sh
pnpm codegen:op:dev
pnpm build
goldsky subgraph deploy dev-defi-money-op/1.0.{X}
```

## deploying dev arb
```sh
pnpm codegen:arb:dev
pnpm build
goldsky subgraph deploy dev-defi-money-arb/1.0.{X}
```

## deploying prod op
```sh
pnpm codegen:op:prod
pnpm build
goldsky subgraph deploy defi-money-op/1.0.{X}
```

## deploying prod arb
```sh
pnpm codegen:arb:prod
pnpm build
goldsky subgraph deploy defi-money-arb/1.0.{X}
```

## misc
- `graph init` in a new folder or `graph add CONTRACT_ADDRESS` gives you all the files you need to add a new contract in /shared

- `goldsky subgraph delete name/version` deletes subgraphs (so we don't pay for their availability)
