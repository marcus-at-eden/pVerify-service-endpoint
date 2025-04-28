import { handleInsuranceVerification } from "./features/insuranceVerification.mjs";
import { getLevenshteinDistance, normalizedLevenshteinDistance, substringMatch } from "./utils.mjs";
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
    const { payloadArgs, feature } = body;

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
      // Add more cases for other features like "insuranceValidation"
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
