const projectId = '<TOKEN_WALLET_CONNECT>';

const providerMetadata = {
  name: 'WalletConnect',
  description: 'WalletConnect',
  url: 'https://walletconnect.org/',
  icons: ['https://walletconnect.org/walletconnect-logo.png'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};


export default {projectId, providerMetadata};
