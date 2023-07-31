import exec from 'k6/execution';
import { executeAsyncDetectionJob } from "./utils/detectionJobs.js";
import { DETECTION_JOB_UUID } from "./utils/env.js";
import { getRandomFromArray } from "./utils/random.js";

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

  const SPIKE_PROFILE = [
    8, 8, 8, 8, 8, 8, 8, 8,
    100,
    8, 8, 8, 8, 8, 8, 8, 8,
  ]
  const imagesCount = SPIKE_PROFILE[Math.floor(exec.scenario.progress * SPIKE_PROFILE.length)];
  const imagesList = IMAGE_URLS.slice(0, imagesCount);
  console.log(`Sending ${imagesCount} images`)

  await executeAsyncDetectionJob(DETECTION_JOB_UUID, imagesList);
}
