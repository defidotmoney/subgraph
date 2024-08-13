# Defi Money Subgraph

each folder represents a subgraph instance in a network, so we have:
- op dev
- op prod
- arb dev
-arb prod

deploying one of the subgraphs:

- `cd subgraph_folder_name`
- `npm i`
- `graph codegen && graph build`
- `graph deploy --studio subgraph_folder_name`