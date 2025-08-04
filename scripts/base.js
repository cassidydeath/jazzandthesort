let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let prices = { xmr: 0, btc: 0 };

const walletAddresses = {
  xmr: '4867efphw4BayzrZDBGuncBkk1UvHpBX87MN3SMkVhKugksCG1H7TJnVXDPW7i66H4YiMg1uYR3iwCUax89yWKiJK5EiN3j',
  btc: 'bc1q4uuwgg3lsuq9gy9zmhcfazmn6wn4pdyj02zm7m'
};

async function fetchPrices() {
  try {
    const cacheBuster = new Date().getTime();
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=monero,bitcoin&vs_currencies=usd&cb=${cacheBuster}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    prices.xmr = parseFloat(data.monero.usd);
    prices.btc = parseFloat(data.bitcoin.usd);

    document.getElementById('xmr-price').textContent = `$${prices.xmr.toFixed(2)}`;
    document.getElementById('btc-price').textContent = `$${prices.btc.toFixed(2)}`;

    updateCart();
  } catch (err) {
    console.error("Failed to fetch prices:", err);
    document.getElementById('xmr-price').textContent = 'Error';
    document.getElementById('btc-price').textContent = 'Error';
  }
}

function addToCart(name, priceUsd) {
  cart.push({ name, priceUsd });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
}

function updateCart() {
  const currency = document.getElementById('currency-select').value;
  const rate = prices[currency];
  const cartItems = document.getElementById('cart-items');
  const totalUsdField = document.getElementById('total-usd');
  const totalCryptoField = document.getElementById('total-crypto');
  const cryptoSymbol = document.getElementById('crypto-symbol');
  const walletField = document.getElementById('wallet-address');
  const noteField = document.getElementById('order-note');

  cartItems.innerHTML = '';
  let totalUsd = 0;
  let note = 'Order: ';

  cart.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.priceUsd.toFixed(2)}`;
    cartItems.appendChild(li);
    totalUsd += item.priceUsd;
    note += `${item.name}${i < cart.length - 1 ? ', ' : ''}`;
  });

  const totalCrypto = rate > 0 ? (totalUsd / rate) : 0;
  totalUsdField.textContent = totalUsd.toFixed(2);
  totalCryptoField.textContent = totalCrypto.toFixed(8);
  cryptoSymbol.textContent = currency.toUpperCase();
  walletField.textContent = walletAddresses[currency];
  if (noteField) {
    noteField.textContent = `order: ${note} yourname@protonmail.com`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchPrices();
  setInterval(fetchPrices, 60000);

  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', () => {
      const cartDataField = document.getElementById('cart_data');

      const currency = document.getElementById('currency-select').value;
      const totalUsd = document.getElementById('total-usd').textContent;
      const totalCrypto = document.getElementById('total-crypto').textContent;
      const symbol = document.getElementById('crypto-symbol').textContent;

      let cartText = cart.map(item => `${item.name} - $${item.priceUsd.toFixed(2)}`).join('\n');
      cartText += `\n\nTotal USD: $${totalUsd}\nTotal in Crypto: ${totalCrypto} ${symbol}\nCurrency: ${currency}`;

      cartDataField.value = cartText;
    });
  }
});
