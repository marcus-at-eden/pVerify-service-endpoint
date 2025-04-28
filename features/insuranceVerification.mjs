import { findPayer } from "../utils.mjs";
import { makePVerifyRequest } from "../apiRequest.mjs";

export async function handleInsuranceVerification(payloadArgs, payers) {
  if (!payloadArgs.payerCode) {
    const payerCode = findPayer(payloadArgs.payerName, payers);
    if (payerCode === "0") {
      throw new Error("Missing PayerCode or PayerCode could not be found");
    }
    payloadArgs.payerCode = payerCode;
  }

  const data = await makePVerifyRequest(payloadArgs);

  let copayPrimary = null;
  let copaySpecialist = null;

  const serviceDetails = data.ServiceDetails || [];
  for (const service of serviceDetails) {
    if (service.ServiceName === "Professional(Physician) Visit - Office") {
      const details = service.EligibilityDetails || [];
      for (const detail of details) {
        if (
          detail.EligibilityOrBenefit === "Co-Payment" &&
          Array.isArray(detail.Message)
        ) {
          const message = detail.Message.join(" ").toLowerCase();
          if (message.includes("primary care visit") && !copayPrimary) {
            copayPrimary = detail.MonetaryAmount;
          }
          if (message.includes("specialist visit") && !copaySpecialist) {
            copaySpecialist = detail.MonetaryAmount;
          }
        }
      }
    }
  }

  return {
    Eligibility: data.PlanCoverageSummary?.Status || "Inactive",
    CoPayPrimaryCare: copayPrimary,
    CoPaySpecialist: copaySpecialist,
    ApiNotice: data.APIResponseMessage || "",
    RawDetails: data,
  };
}
