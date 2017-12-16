## Deploy to CloudFoundry

1. Build the app first!
```
$ ./gradlew build
```

2. Push the test app
```
$ cf push parrit-test
```

3. Push the prod app
```
$ cf push parrit
```

4. Make a release in github!

  1. Go to `https://github.com/Parrit/Parrit/releases`
  2. Make a new release with the changes since the last release
  3. Increment the tag version logically and make sure to select the specific commit

## Restoring a prod backup to a test site

1. Log into ElephantSQL and download backup for the prod site
2. Get the connection string for the test site:
```
$ cf env parrit-test
```
3. Drop the tables in the test site
```
$ cat drop-tables.sql | psql "$TEST_SITE_CONNECTION_STRING"
```
4. Restore the backup
```
lzop -cd "$BACKUP_FILENAME" | psql "$TEST_SITE_CONNECTION_STRING"
```

## Set Environment Variables

To configure Google Analytics, set your tracking ID:

```
GOOGLE_ANALYTICS_TRACKING_ID=UA-XXXXXXXX-X
```