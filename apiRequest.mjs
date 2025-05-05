export async function makePVerifyRequest(payload, debug) {
  const endpoint = process.env.endpoint;
  const clientApiId = process.env.clientApiID;
  const clientSecret = process.env.clientSecret;

  const reqHeaders = {
    "Content-Type": "application/json",
    "Client-Secret": clientSecret,
    "Client-API-Id": clientApiId,
  };

  // If the debug flag is set, do not execute the request, but log it instead.
  if (debug) {
    console.log(`Debug flag set. \n Request to pVerify: ${{method: "POST", headers: reqHeaders, body: JSON.stringify(payload)}}`);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify(payload),
  });

  return response.json();
}
