import { findPayer } from "../utils.mjs";
import { makePVerifyRequest } from "../apiRequest.mjs";
import { processInsuranceVerificationResponse } from "../processPVerifyResponse.mjs";

export async function handleInsuranceVerification(payloadArgs, payers, debug) {

  if (!payloadArgs.payerCode) {
    const payerCode = findPayer(payloadArgs.payerName, payers);
    if (payerCode === "0") {
      throw new Error("Missing PayerCode or PayerCode could not be found");
    }
    payloadArgs.payerCode = payerCode;
  }

  // Validate the payload args
  const requiredFields = [
    "providerLastName",
    "providerNPI",
    "memberID",
    "patientDOB",
    "practiceTypeCode",
    "patientFirstName",
    "patientLastName",
    "dateOfService"
  ];

  const missingFields = requiredFields.filter(field => !payloadArgs[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // Reformat the payload according to pVerify
  const pVerifyPayload = {
    "payerCode": payloadArgs.payerCode,
    "Provider_LastName": payloadArgs.providerLastName,
    "Provider_NPI": payloadArgs.providerNPI,
    "Patient_First": payloadArgs.patientFirstName,
    "Patient_Last": payloadArgs.patientLastName,
    "memberId": payloadArgs.memberID,
    "Patient_DOB": payloadArgs.patientDOB,
    "PracticeTypeCode": payloadArgs.practiceTypeCode,
    "Date_Of_Service": payloadArgs.dateOfService,
  } 

  const pVerifyResponse = await makePVerifyRequest(process.env.insuranceVerificationEndpoint, pVerifyPayload, debug);
  return processInsuranceVerificationResponse(pVerifyResponse);

  // let copayPrimary = null;
  // let copaySpecialist = null;

  // const serviceDetails = data.ServiceDetails || [];
  // for (const service of serviceDetails) {
  //   if (service.ServiceName === "Professional(Physician) Visit - Office") {
  //     const details = service.EligibilityDetails || [];
  //     for (const detail of details) {
  //       if (
  //         detail.EligibilityOrBenefit === "Co-Payment" &&
  //         Array.isArray(detail.Message)
  //       ) {
  //         const message = detail.Message.join(" ").toLowerCase();
  //         if (message.includes("primary care visit") && !copayPrimary) {
  //           copayPrimary = detail.MonetaryAmount;
  //         }
  //         if (message.includes("specialist visit") && !copaySpecialist) {
  //           copaySpecialist = detail.MonetaryAmount;
  //         }
  //       }
  //     }
  //   }
  // }

  // return {
  //   Eligibility: data.PlanCoverageSummary?.Status || "Inactive",
  //   CoPayPrimaryCare: copayPrimary,
  //   CoPaySpecialist: copaySpecialist,
  //   ApiNotice: data.APIResponseMessage || "",
  //   RawDetails: data,
  // };
}
