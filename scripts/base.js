const walletAddresses = {
  xmr: '4867efphw4BayzrZDBGuncBkk1UvHpBX87MN3SMkVhKugksCG1H7TJnVXDPW7i66H4YiMg1uYR3iwCUax89yWKiJK5EiN3j',
  btc: 'bc1q4uuwgg3lsuq9gy9zmhcfazmn6wn4pdyj02zm7m'
};

let prices = { xmr: 0, btc: 0 };
let cart = [];

function fetchPrices() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=monero,bitcoin&vs_currencies=usd')
    .then(res => res.json())
    .then(data => {
      prices.xmr = data.monero.usd;
      prices.btc = data.bitcoin.usd;
      document.getElementById('xmr-price').textContent = `$${prices.xmr.toFixed(2)}`;
      document.getElementById('btc-price').textContent = `$${prices.btc.toFixed(2)}`;
      updateCart();
    })
    .catch(err => {
      console.error('Price fetch failed:', err);
      document.getElementById('xmr-price').textContent = 'Error';
      document.getElementById('btc-price').textContent = 'Error';
    });
}

function addToCart(name, priceUsd) {
  cart.push({ name, priceUsd });
  updateCart();
}

function updateCart() {
  const currency = document.getElementById('currency-select').value;
  const walletAddress = walletAddresses[currency];
  const rate = prices[currency] || 0;

  const cartItemsEl = document.getElementById('cart-items');
  const totalUsdEl = document.getElementById('total-usd');
  const totalCryptoEl = document.getElementById('total-crypto');
  const cryptoSymbolEl = document.getElementById('crypto-symbol');
  const walletAddressEl = document.getElementById('wallet-address');

  cartItemsEl.innerHTML = '';
  let totalUsd = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.priceUsd.toFixed(2)}`;
    cartItemsEl.appendChild(li);
    totalUsd += item.priceUsd;
  });

  const totalCrypto = rate ? (totalUsd / rate).toFixed(8) : '0.00000000';

  totalUsdEl.textContent = totalUsd.toFixed(2);
  totalCryptoEl.textContent = totalCrypto;
  cryptoSymbolEl.textContent = currency.toUpperCase();
  walletAddressEl.textContent = walletAddress;
}

document.addEventListener('DOMContentLoaded', () => {
  fetchPrices();
  document.getElementById('currency-select').addEventListener('change', updateCart);
});
