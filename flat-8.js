import { executeAsyncDetectionJob } from "./utils/detectionJobs.js";
import { DETECTION_JOB_UUID } from "./utils/env.js";

const IMAGE_URLS = JSON.parse(open('./images.json'));

export const options = {
  scenarios: {
    default: {
      executor: 'constant-arrival-rate',
      duration: '10m',
      timeUnit: '1s',
      rate: 1,
      preAllocatedVUs: 10,
    }
  },
  thresholds: {
    "http_req_duration{scenario:default}": [{ threshold: "max>0" }],
  },
  noConnectionReuse: true,
};


export default async function () {
  const imagesList = IMAGE_URLS.slice(0, 8);

  console.log(`Sending ${imagesList.length} images`)
  await executeAsyncDetectionJob(DETECTION_JOB_UUID, imagesList);
}
