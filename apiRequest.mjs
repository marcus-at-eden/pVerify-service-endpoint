async function getBearerToken() {

  var urlencoded = new URLSearchParams();
  urlencoded.append("Client_Id", process.env.clientApiID);
  urlencoded.append("Client_Secret", process.env.clientSecret);
  urlencoded.append("grant_type", "client_credentials");

  var requestOptions = {
    method: 'POST',
    body: urlencoded,
    redirect: 'follow'
  };
  try {
    const response = await fetch("https://api.pverify.com/Token", requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bearer token:", error);
    throw error; 
  }
}

export async function makePVerifyRequest(endpoint, payload, debug) {

  // First get the bearer token from pVerify
  bearerTokenResponse = await getBearerToken();
  token = bearerTokenResponse.access_token;
  
  // Confirm bearer token if debug is on
  if (debug) {
    console.log(`Retrieved bearer token from pVerify: ${token}`);
  }

  const reqHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Client-API-Id": process.env.clientApiID
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
