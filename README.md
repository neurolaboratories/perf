# Performance benchmarks for Neurolabs platform


## Metrics


## Architecture overview


## Results

### Scenario 1 (flat 8)
Every second 8 images are sent for processing

**Processing duration per image**

* mean: 1.77s

**Time to process last image in batch**

* mean: 14s
* p5: 12s
* p95: 63s

![Processing timings](results/flat-8-processing.png)

**HTTP response time ([pdf](results/flat-8.pdf))**:

* mean: 234.64ms
* p95: 281.11ms

![Requests timings](results/flat-8-requests.png)

----

### Scenario 2 (flat 100)
Every 10 seconds 100 images are sent for processing


**Processing duration per image**

* mean: 0.87s

**Time to process last image in batch**

* mean: 87s
* p5: 24s
* p95: 196s


![Processing timings](results/flat-100-processing.png)

**HTTP response time ([pdf](results/flat-100.pdf))**:

* mean: 395.15ms
* p95: 557.19ms

![Requests timings](results/flat-100-requests.png)

----

### Scenario 3 (mixed)
Random number of images from 8 to 100 send for processing each second.

**Processing duration per image**

* mean: 7s

**Time to process last image in batch**

* mean: 168s
* p5: 26s
* p95: 259s

![Processing timings](results/mixed-processing.png)

**HTTP response time ([pdf](results/mixed.pdf))**:

* mean: 262.24ms
* p95: 535.33ms

![Requests timings](results/mixed-requests.png)

----

### Scenario 4 (spike)
Every second 8 images are sent for processing, but for ~6% requests in the middle of scenario 100 images sent instead.


**Processing duration per image**

* mean: 1.4s

**Time to process last image in batch**

* mean: 19s
* p5: 12s
* p95: 214s

![Processing timings](results/spike-processing.png)

**HTTP response time ([pdf](results/spike.pdf))**:

* mean: 242.27ms
* p95: 438.98ms

![Requests timings](results/spike-requests.png)


----

## Replicate results

### Setup

To replicate results from this report set these environment variables:

* `API_BASE_URL`
* `API_KEY`
* `DETECTION_JOB_UUID`

### Run

Then for each scenario execute one of the following commands (replace `k6` for `k6-mac` if you're using MacOS):

```bash
./k6 run --out 'dashboard=open' mixed.js
```

```bash
./k6 run --out 'dashboard=open' flat-8.js
```

```bash
./k6 run --out 'dashboard=open' flat-100.js
```

```bash
./k6 run --out 'dashboard=open' spike.js
```

### Get the results

1. Http response timings will be available in open browser tab and in console output

2. Processing durations will be available at `https://staging.neurolabs.ai/detection-job/${DETECTION_JOB_UUID}/performance`
The page will show graph with processing times over last hour
