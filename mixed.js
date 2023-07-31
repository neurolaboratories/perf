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
  // Every timeUnit (1s by default) one of these values used as number of images sent to processing.
  const LOAD_PROFILE = [
    8, 8, 8, 8, 8, 8, 8, 8,
    16, 16, 16, 16, 32, 32, 64,
    100,
  ]
  const imagesCount = getRandomFromArray(LOAD_PROFILE);
  const imagesList = IMAGE_URLS.slice(0, imagesCount);
  console.log(`Sending ${imagesCount} images`)

  await executeAsyncDetectionJob(DETECTION_JOB_UUID, imagesList);
}
