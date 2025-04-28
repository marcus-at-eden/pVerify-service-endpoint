export async function makePVerifyRequest(payload) {
  const endpoint = process.env.endpoint;
  const clientApiId = process.env.clientApiID;
  const clientSecret = process.env.clientSecret;

  const headers = {
    "Content-Type": "application/json",
    "Client-Secret": clientSecret,
    "Client-API-Id": clientApiId,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  return response.json();
}
