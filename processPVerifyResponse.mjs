export async function processInsuranceVerificationResponse(pVerifyResponse) {
    // Check for unsuccessful response
    if (pVerifyResponse.APIResponseCode != "0"){
        return {
            success: false,
            message: `Unsuccessful pVerify response: ${pVerifyResponse.ErrorCode} - ${pVerifyResponse.ErrorDescription}`,
            statusCode: 1
        }
    }

    var parsedResponseObject = {
        payerName: pVerifyResponse.PayerName,
        payerCode: pVerifyResponse.PayerCode,
        dateOfService: pVerifyResponse.DOS,
        practiceDescription: pVerifyResponse.ResultPracticeType,
        priorAuthenticationRequired: pVerifyResponse.IsPriorAuthRequired,
        subscriberInformation: pVerifyResponse.DemographicInfo.Subscriber,
        dependentInformation: pVerifyResponse.DemographicInfo.Dependent,
        otherPayerInformation: pVerifyResponse.OtherPayerInfo,
        pcpAuthorizationInformationSummery: pVerifyResponse.PCPAuthInfoSummary,
        medicareInformation: pVerifyResponse.MedicareInfoSummary,
        miscInformation: pVerifyResponse.MiscellaneousInfoSummary,
        specialistOfficeInformation: pVerifyResponse.SpecialistOfficeSummary,
        copayInformation: {
            inNetwork: pVerifyResponse.SpecialistOfficeSummary.CoPayInNet,
            outNetwork: pVerifyResponse.SpecialistOfficeSummary.CoPayOutNet
        }
    };

    // Look for any specialist fields that are not null
    const additionalFields = [
        "VisionOptometrySummary",
        "PharmacySummary",
        "HospitalOutPatientSummary",
        "DentalSummary",
        "TelemedicinePrimaryCareSummary",
        "TelemedicineSpecialistSummary",
        "TelemedicineUrgentCareSummary",
        "TelemedicinePhysicalTherapySummary",
        "TelemedicineMentalHealthSummary",
        "PsychotherapySummary",
        "SNFSummary",
        "SNFRoomBoardSummary",
        "ProfessionalPhysicianVisitInpatientSummary",
        "HomeHealthCareSummary",
        "HospiceSummary",
        "AllergiesSummary",
        "DiagnosticMedicalSummary",
        "MaternitySummary",
        "ImmunizationsSummary",
        "TelemedicineOccupationalTherapySummary",
        "TelemedicineSpeechTherapySummary",
        "RadiationTherapySummary",
        "InfertilitySummary",
        "AllergyTestingSummary",
        "InvitroFertilizationSummary",
        "PsychiatricSummary",
        "AcupunctureSummary",
        "GynecologicalSummary",
        "ObstetricalSummary",
        "ObstetricalGynecologicalSummary",
        "FamilyPlanningSummary",
        "SurgicalBenefitsProfessionalPhysicianSummary",
        "SurgicalBenefitsFacilitySummary",
        "DialysisSummary",
        "MentalHealthFacilityOutPatientSummary",
        "IsCptInfoUpdated",
        "PreventiveServices"
    ];

    additionalFields.forEach(field => {
        if (pVerifyResponse[field] != null) {
            parsedResponseObject[field] = pVerifyResponse[field];
        }
    });

    return parsedResponseObject;
}