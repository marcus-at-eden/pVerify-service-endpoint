# pVerify Service Endpoint

This service provides APIs for insurance verification and validation using the pVerify platform.

## API Endpoints

### 1. **Insurance Verification**

**Endpoint:**  
`POST /insuranceVerification`

**Description:**  
Handles insurance verification by matching the provided payload against the list of payers.

**Request Format:**
```json
{
  "payloadArgs": { /* Payload specific to insurance verification */ },
  "feature": "insuranceVerification",
  "debug": true
}
```

- `payloadArgs`: Object containing the insurance verification payload.
- `feature`: Must be `"insuranceVerification"`.
- `debug`: Boolean flag to enable debug mode.

**Response Format:**
- **Success (200):**
  ```json
  {
    "result": { /* Verification result */ }
  }
  ```
- **Error (400):**
  ```json
  {
    "message": "Missing required parameters json"
  }
  ```
- **Error (500):**
  ```json
  {
    "message": "Internal Server Error",
    "error": "Error details"
  }
  ```

**Files Involved:**
- `index.mjs`
- `features/insuranceVerification.mjs`
- `constants.mjs`

---

### 2. **Insurance Validation**

**Endpoint:**  
`POST /insuranceValidation`

**Description:**  
Handles insurance validation by sending the payload to the pVerify API and processing the response.

**Request Format:**
```json
{
  "payloadArgs": { /* Payload specific to insurance validation */ },
  "feature": "insuranceValidation",
  "debug": true
}
```

- `payloadArgs`: Object containing the insurance validation payload.
- `feature`: Must be `"insuranceValidation"`.
- `debug`: Boolean flag to enable debug mode.

**Response Format:**
- **Success (200):**
  ```json
  {
    "result": { /* Validation result */ }
  }
  ```
- **Error (400):**
  ```json
  {
    "message": "Missing required parameters json"
  }
  ```
- **Error (500):**
  ```json
  {
    "message": "Internal Server Error",
    "error": "Error details"
  }
  ```

**Files Involved:**
- `index.mjs`
- `features/insuranceValidation.mjs`
- `apiRequest.mjs`
- `processPVerifyResponse.mjs`

---

## General Notes

- Both endpoints require a valid `payloadArgs` object in the request body.
- The `feature` field determines which functionality is invoked.
- Debug mode (`debug: true`) logs additional information without making external API calls.

