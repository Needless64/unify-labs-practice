export default async function fetchCoins() {
  let res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1",
  );
  return await res.json();
}
