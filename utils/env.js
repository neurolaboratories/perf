const API_BASE_URL = __ENV.API_BASE_URL;
const HEADERS = {
  "X-Api-Key": __ENV.API_KEY,
  "Content-Type": "application/json",
};
const DETECTION_JOB_UUID = __ENV.DETECTION_JOB_UUID;

export { API_BASE_URL, HEADERS, DETECTION_JOB_UUID };
