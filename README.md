# Defi Money Subgraph

Shared files are duplicated inside the correct folder you are deploying when you [manually deploy subgraph endpoint](https://github.com/defidotmoney/subgraph/actions)

- workflow copies shared files into the respective deploy
- workflow run codegen + build + deploy
- `graph add CONTRACT_ADDRESS` in shared folder adds a new contract
- `goldsky subgraph delete name/version` deletes subgraphs (so we don't pay for their availability)
