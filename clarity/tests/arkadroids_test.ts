
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.28.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Deployer can mint nft",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get('deployer')!;
        let recipient = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                'arkadroids', 
                'mint', 
                [types.principal(recipient.address)], 
                deployer.address)
        ]);

        let [receipt] = block.receipts;
        
        receipt.result.expectOk().expectUint(1);
        
        let lastTokenId = chain.callReadOnlyFn(
            'arkadroids', 
            'get-last-token-id', 
            [], 
            deployer.address);

        lastTokenId.result.expectOk().expectUint(1);
        
        let tokenOwner = chain.callReadOnlyFn(
            'arkadroids', 
            'get-owner', 
            [types.uint(1)], 
            deployer.address);

        tokenOwner.result.expectOk().expectSome().expectPrincipal(recipient.address);
    }
});

Clarinet.test({
    name: "Non-deployer can't mint nft",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let nonDeployer = accounts.get('wallet_1')!;
        let recipient = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall(
                'arkadroids', 
                'mint', 
                [types.principal(recipient.address)],
                nonDeployer.address)
        ]);

        let [receipt] = block.receipts;

        receipt.result.expectErr().expectUint(100);
    }
});

Clarinet.test({
    name: "Nft owner only can transfer the nft",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get('deployer')!;
        let wallet_1 = accounts.get("wallet_1")!;
        let wallet_2 = accounts.get("wallet_2")!;
        let wallet_3 = accounts.get("wallet_3")!;

        let mintingBlock = chain.mineBlock([
            Tx.contractCall(
                'arkadroids', 
                'mint', 
                [types.principal(deployer.address)], 
                deployer.address),
            Tx.contractCall(
                'arkadroids', 
                'mint', 
                [types.principal(wallet_1.address)], 
                deployer.address)
        ]);

        mintingBlock.receipts[0].result.expectOk().expectUint(1);
        mintingBlock.receipts[1].result.expectOk().expectUint(2);

        let tokenTwoOwner = chain.callReadOnlyFn(
            'arkadroids', 
            'get-owner', 
            [types.uint(2)], 
            deployer.address);

        tokenTwoOwner.result.expectOk().expectSome().expectPrincipal(wallet_1.address);

        let transferBlock = chain.mineBlock([
            Tx.contractCall(
                'arkadroids', 
                'transfer', 
                [types.uint(1), types.principal(deployer.address), types.principal(wallet_2.address)], 
                deployer.address),
            Tx.contractCall(
                'arkadroids', 
                'transfer', 
                [types.uint(2), types.principal(wallet_1.address), types.principal(wallet_2.address)], 
                deployer.address),
            Tx.contractCall(
                'arkadroids', 
                'transfer', 
                [types.uint(2), types.principal(deployer.address), types.principal(wallet_2.address)], 
                deployer.address)
        ]);

        transferBlock.receipts[0].result.expectOk();
        transferBlock.receipts[1].result.expectErr().expectUint(101);
        transferBlock.receipts[2].result.expectErr().expectUint(1);

        chain.callReadOnlyFn(
            'arkadroids', 
            'get-owner', 
            [types.uint(2)], 
            deployer.address)
        .result.expectOk().expectSome().expectPrincipal(wallet_1.address);

        let tokenOwner = chain.callReadOnlyFn(
            'arkadroids', 
            'get-owner', 
            [types.uint(1)], 
            deployer.address);

        tokenOwner.result.expectOk().expectSome().expectPrincipal(wallet_2.address);
    }
});