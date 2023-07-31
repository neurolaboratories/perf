import http from "k6/http";
import { API_BASE_URL, HEADERS } from "./env.js";

export async function executeAsyncDetectionJob(detectionJobUuid, urls, callbackUrl) {
  return http.post(
    `${API_BASE_URL}/v1/detection-jobs/${detectionJobUuid}/urls`,
    JSON.stringify({
      urls,
      callback: callbackUrl,
    }),
    { headers: HEADERS }
  );
}
