export async function makePVerifyRequest(endpoint, payload, debug) {
  const clientApiId = process.env.clientApiID;
  const clientSecret = process.env.clientSecret;

  const reqHeaders = {
    "Content-Type": "application/json",
    "Client-Secret": clientSecret,
    "Client-API-Id": clientApiId,
  };

  const request = {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify(payload),
  }; 

  // If the debug flag is set, do not execute the request, but log it instead.
  if (debug) {
    console.log(`Debug flag set. \n Request to pVerify: ${JSON.stringify(request)}`);
    return {};
  }

  const response = await fetch(endpoint, request);

  return response.json();
}
