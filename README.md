# Defi Money Subgraph

Shared files are duplicated inside the correct folder you are deploying when you [manually deploy subgraph endpoint](https://github.com/defidotmoney/subgraph/actions)

- workflow copies shared files into the respective deploy
- workflow run codegen + build + deploy
- `graph init` in a new folder or `graph add CONTRACT_ADDRESS` gives you all the files you need to add a new contract in /shared
- `goldsky subgraph delete name/version` deletes subgraphs (so we don't pay for their availability)
