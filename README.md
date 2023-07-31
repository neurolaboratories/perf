# Performance benchmarks for Neurolabs platform


## Metrics


## Architecture overview


## Results

### Scenario 1
Every second 8 images are sent for processing

expected results: ...


### Scenario 2
Every 10 seconds 100 images are sent for processing


### Scenario 3
Random number of images from 8 to 100 send for processing each second.

**Processing duration per image**
mean: 7.01s

**HTTP response time**
mean: 262.24ms
p95: 535.33ms

![Requests timings](results/mixed-requests.png)

[report](results/mixed.pdf)

![Processing timings](results/mixed-processing.png)


### Scenario 4
Every second 8 images are sent for processing, but for ~6% requests in the middle of scenario 100 images sent instead.


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
