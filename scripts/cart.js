document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault(); // stop actual form submission

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  let cartText = cartItems.map(item => `${item.name} - $${item.priceUsd.toFixed(2)}`).join("\n");

  const totalUSD = document.getElementById("total-usd").textContent;
  const totalCrypto = document.getElementById("total-crypto").textContent;
  const symbol = document.getElementById("crypto-symbol").textContent;

  cartText += `\n\nTotal USD: $${totalUSD}\nTotal in Crypto: ${totalCrypto} ${symbol}`;

  const name = document.getElementById("user_name").value;
  const email = document.getElementById("user_email").value;
  const address = document.getElementById("user_address").value;
  const txid = document.getElementById("txid").value;

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nAddress:\n${address}\n\nTXID: ${txid}\n\nCart:\n${cartText}`
  );

  const mailtoLink = `mailto:jazzandthesort+order@gmail.com?subject=New%20Order%20from%20${encodeURIComponent(name)}&body=${body}`;
  window.location.href = mailtoLink;
  setTimeout(() => {
  alert("Your email client should have opened. Please make sure to send the email!");
}, 500);

});

