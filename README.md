# Defi Money Subgraph

Shared files are duplicated inside the correct folder you are deploying when you [manually deploy subgraph endpoint](https://github.com/defidotmoney/subgraph/actions)

- workflow copies shared files into the respective deploy
- workflow run codegen + build + deploy
- make sure to bump subgraph version in workflow file (or delete previous if redeploying same version)
