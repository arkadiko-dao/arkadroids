# Setup HOWTO

1. Set up a local mocknet through docker compose (see https://github.com/blockstack/stacks-local-dev)
2. Change the default Stacks amount of the local mocknet addresses in the toml files (stacks-local-dev/configurations/mocknet/Config.toml and stacks-local-dev/configurations/mocknet/Config.toml.sample)
  This is optional but helpful if you wanna create vaults with higher STX collateral
4. From the `web` folder, `cp .env.example ./scripts/.env` and modify `CONTRACT_PRIVATE_KEY="your key"` and `API_SERVER=http://localhost:3999` to match your environment (you can use one of the keys in `stacks-local-dev/configurations/mocknet/Config.toml` or generate your own.
5. Run `yarn install` (in the `web` folder.
6. Deploy all smart contracts by running `ts-node deploy-contracts.ts` in the `web/scripts` folder (needs to be run twice because there are more than 25 contracts which is the limit per principal per block).
7. Start the web app using `yarn dev` or `npm run dev` (in the `web` folder)
8. Go to http://localhost:9000. You need the Stacks Web Wallet to authenticate.
