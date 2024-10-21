# NFT Showcase Project
A hobby project for listing down minted NFTs for the current MetaMask account.

The project utilizes the Amoy testnet for demo purposes, using a ERC721 smart contract that was written manually for this purpose. A copy of the contract files are included here for reference and testing.

## Objectives
1. Connect to a MetaMask wallet
2. Detection during account change/switch
3. Logout functionality (just clearing cache)
4. Identify account address
5. An interface with the following:<br/>
    5.1 Header<br/>
        5.1.1 Connect button<br/>
        5.1.2 Account address<br/>
    5.2 Gallery of account's minted NFTs<br/>
6. Infinite scrolling for pagination
7. Demonstrate implementation of React lazyloading
7. Handling error and showing them on a modal
8. Managing states with React's Context API


## Set-up

### Dependencies & Installation

For this project, we use the primary plugins:
- Web3 4.13.0
- Next 14.2.15
- TypeScript 5
- Tailwind 3.4.1

I priamrily used Yarn, and shall be the reference throughout this document. But feel free to use NPM as you wish.

Using the command below to install them:
```
yarn install
```

Once everything is installed, let's do some good measures and run the linter command just to check we don't have critical code errors and stylistic issues:
```
yarn lint
```

If there are no critical errors, then we are good to go - let's now build the project:
```
yarn build
```

Awesome! I bet everything went well during the build. This proves our project has no major installation issues. You may check the app on [http://localhost:3000](http://localhost:3000)

Let us now proceed to setting up our environment variable.

### Environment Variable
For this project, we 3 critical variables that must be present in the `.env` file, located in the project root.

#### NEXT_PUBLIC_SUPPORTED_NETWORKS
For flexibility, our app can connect to different networks, specified in this variable. The value is a JSON format in this example:
```
NEXT_PUBLIC_SUPPORTED_NETWORKS={ "80002": { "name": "Amoy Testnet" }, "1": { "name": "Ethereum Mainnet" } }
```
> NOTE:
> It's important that all properties (as shown above) are defined e.g. name and slug of the network as we will use these to supply the correct parameters to the OpenSea API

The first main key is the chain ID of the network, that takes in a value of an object that describes the name of the network.

#### NEXT_PUBLIC_OPENSEA_API_KEY
We use OpenSea to grab the NFTs of the connected MetaMask account. We need the OpenSea API key if we are going to connect to the mainnet. Otherwise, we are good without when calling the APIs from the testnet.

[Check here](https://docs.opensea.io/reference/api-keys) to learn how to generate your API key in OpenSea.

Overall, we shall have a `.env` file that looks likes this:
```
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_SUPPORTED_NETWORKS={ "80002": { "name": "Amoy Testnet", "slug": "amoy" }, "1": { "name": "Ethereum Mainnet", "slug": "ethereum" } }
NEXT_PUBLIC_OPENSEA_API_KEY=18f1b296eaec4716997f4b410ee60dfe
```

### SMART CONTRACT
I have also written a simple ERC721 contract just enough for us to perform minting operation.
The sample NFT arts as well as the relevant metadata files we used in this project are uploaded to Piñata.

The smart contract files are included in this project within `./utils/contract` directory. And here is the contract address for the one deployed in the demo video:<br />
[0xec2A11A48D8A96FC952A5eff90414cfcC0c51fc4](https://amoy.polygonscan.com/address/0xec2a11a48d8a96fc952a5eff90414cfcc0c51fc4)

For overall demonstration brief discussion from me, I have created a short video which you can check via the Google Drive link below: <br/>
[Demo Video](https://drive.google.com/file/d/1H0X2ZbMvwp3EM7m4vIKApD8cdsY2_w9q/view?usp=sharing)

If you have any questions about the project, feel free to reach out via the following:<br/><br/>
[michaeljay.arizala100294@gmail.com](to:michaeljay.arizala100294@gmail.com)<br/>
[michaeljayarizala@agusandelnorte.gov.ph](to:michaeljayarizala@agusandelnorte.gov.ph)<br/>
[LinkedIn](https://www.linkedin.com/in/michaeljayarizala/)