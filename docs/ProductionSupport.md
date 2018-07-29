## Deploy to CloudFoundry

1. Build the app first!

  ```bash
  $ ./gradlew build
  ```

2. Push the test app

  ```bash
  $ cf push parrit-test
  ```

3. Push the prod app

  ```bash
  $ cf push parrit
  ```

4. Make a release in github!

    1. Go to `https://github.com/Parrit/Parrit/releases`
    2. Make a new release with the changes since the last release
    3. Increment the tag version logically and make sure to select the specific commit that is being deployed

## Set Environment Variables

To configure Google Analytics, set your tracking ID:

```
GOOGLE_ANALYTICS_TRACKING_ID=UA-XXXXXXXX-X
```
