import { handleInsuranceVerification } from "./features/insuranceVerification.mjs";
import { payers } from "./constants.mjs";

export const handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required parameters body" }),
      };
    }

    const body = JSON.parse(event.body);
    const { payloadArgs, feature, debug } = body;

    // If the debug flag is set, do not execute the request to pVerify, just log the body and behavior
    if (debug) {
      console.log(`Received event with debug flag. \n${payloadArgs} \n${feature}`);
    }

    if (!payloadArgs) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required parameters json" }),
      };
    }

    let result;

    switch (feature) {
      case "insuranceVerification":
        result = await handleInsuranceVerification(payloadArgs, payers);
        break;
      case "insuranceValidation":
        result = await handleInsuranceValidation(payloadArgs);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Unsupported feature" }),
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
