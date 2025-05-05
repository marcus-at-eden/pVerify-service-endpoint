import { makePVerifyRequest } from "../apiRequest.mjs";
import { processInsuranceVerificationResponse } from "../processPVerifyResponse.mjs";

export async function handleInsuranceValidation(payloadArgs, debug) {

    const pVerifyResponse = await makePVerifyRequest(process.env.insuranceValidationEndpoint, payloadArgs, debug);
    return processInsuranceVerificationResponse(pVerifyResponse);
}