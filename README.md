# Siteimprove for Enonic XP

This app extends the administration console by allowing to collect
Siteimprove statistics and error reports for current page or site and use suggestions for improvement.

Here's the installation guide for this application:

* [Installing the App](docs/installing.md)


## Releases and Compatibility

| App version | Required XP version | Download |
| ----------- | ------------------- | -------- |
| 1.6.0 | 7.3.0 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.6.0/siteimprove-1.6.0.jar) |
| 1.5.0 | 7.3.0 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.5.0/siteimprove-1.5.0.jar) |
| 1.4.2 | 7.0.0 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.4.2/siteimprove-1.4.2.jar) |
| 1.4.1 | 7.0.0 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.4.1/siteimprove-1.4.1.jar) |
| 1.4.0 | 7.0.0 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.4.0/siteimprove-1.4.0.jar) |
| 1.3.0 | 6.14.3 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.3.0/siteimprove-1.3.0.jar) |
| 1.2.0 | 6.14.3 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.2.0/siteimprove-1.2.0.jar) |
| 1.1.0 | 6.14.3 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.1.0/siteimprove-1.1.0.jar) |
| 1.0.0 | 6.14.3 | [Download](http://repo.enonic.com/public/com/enonic/app/siteimprove/1.0.0/siteimprove-1.0.0.jar) |


## Building and deploying

Build this application from the command line. Go to the root of the project and enter:

    ./gradlew clean build

To deploy the app, set `$XP_HOME` environment variable and enter:

    ./gradlew deploy


## Releasing new version

To release a new version of this app, please follow the steps below:

1. Update `version` (and possibly `xpVersion`) in  `gradle.properties`.

2. Compile and deploy to our Maven repository:

    ./gradlew clean build publishMavenJavaPublicationToPublicRepository

3. Update `README.md` file with new version information and compatibility.

4. Tag the source code using `git tag` command (where `X.X.X` is the released version):

    git tag vX.X.X

5. Update `gradle.properties` with the next snapshot version and commit changes.

6. Push the updated code to GitHub.

    git push origin master --tags
