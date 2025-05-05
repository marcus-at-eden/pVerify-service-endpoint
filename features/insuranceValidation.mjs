export async function handleInsuranceValidation(payloadArgs, debug) {
    const pVerifyResponse = await makePVerifyRequest(payloadArgs, debug);
    return processInsuranceVerificationResponse(pVerifyResponse);
}