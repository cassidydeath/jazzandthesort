document.getElementById("order-form").addEventListener("submit", function (e) {
  let cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  let cartText = cartItems.map(item => `${item.name} - $${item.price.toFixed(2)}`).join("\n");

  const totalUSD = document.getElementById("total-usd").textContent;
  const totalCrypto = document.getElementById("total-crypto").textContent;
  const symbol = document.getElementById("crypto-symbol").textContent;

  cartText += `\n\nTotal USD: $${totalUSD}\nTotal in Crypto: ${totalCrypto} ${symbol}`;

  document.getElementById("cart_data").value = cartText;
});
