# CSC301 Deliverable 2 Part 2 -- Readme

# Sickkids Project Team #23


## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective

 Uroflow is an Android/iOS mobile app that allows patients to remotely send audio recordings of urinary voids to the hospital, where it will be received by doctors and analyzed. 

 * What is the problem you're trying to solve?

 Currently, patients use medical equipment known as a uroflowmeter to produce graphs outlining their ability to empty their bladder. This equipment can be expensive and is not widely available outside of urologist offices and hospitals. To increase accessibility and reduce the cost of equipment, the Urology department at SickKids is attempting to develop technology that will allow the diagnosis of urinary voiding conditions without a visit to the hospital.

 * Is there any context required to understand **why** the application solves this problem?

 This product will reduce the patient’s frequency of visits to the hospital. For patients living in remote areas, this will be a very convenient alternative. There is potential for significant patient and healthcare system cost savings.

## Key Features
 * Described the key features in the application that the user can access
     
     - The user can currently access the following features that are currently available within our application:
         - **Log in** features(without the database validation so far)
         - **Recording History(Tab)** viewing functionality (with most basic front-end interaction) includes the following sub-features(buttons):
             - **Send to docotor** feature(front-end utitlity)
             - **Delete a specific recording** functionality
        - **Recording features(Tab)** (most crucial functionality) has following features developed:
            - **Recorder** feature
            - **Timer**
            - **Playback functionality**
            - **Play**, **Stop**, **Volume Control**
                > These post-recording features will be moved to a ResultPage in future development.
        - **Profile features(Tab)** 
            - This page will **display** basic user information that they provided upon registration now including name, birthday, age and gender (detailed to be determined with partner)
            - **edit the current information**
            - **Log out** functionality (this feature is only implemented as front-end interaction)


<!--      * Once you launch this project, you will be first presented with the temporary Log in page, while the user database is still under construction now.
     * Simply click the Log-in text will log you into this application.
 (Future development will ask user for username and password to be validated in our database and issue an authentication token)
     * Once logged in,  -->
 

## Instructions


For now, there are two methods you can access our app using your phone: 
1. The non-technical way: 
    * Download Expo Client App from App Store/Google Play 
        https://expo.io/tools#client
    * Open the app, log in to Expo using this account: 
        * username: falanke
        * password: 0192837465

      This is because of some iOS limitations from Apple, you will have to use a publisher account to view the app demo. 
    * In the profile tab, you should be able to see a published project called **uroflow**. Now you can click on it and view the app demo. 

2. The technical way (This is a back-up plan if method 1 does not work): 
    * Go to https://github.com/csc301-fall-2019/team-project-sickkids-team 
    * Clone the repo (master branch) to your computer.
    * Install [Node.js](https://nodejs.org/en/) if you haven't. 
    * Cd into sickkids_uroflow folder.
    * Execute `npm install`.
    * After installation is finished, execute `npm start`
    * You should see a webpage on http://localhost:19002/ automatically pops up, once the page is loaded completely, you should see a QR code on the down-left side. 
    * Download Expo Client App from App Store/Google Play 
        https://expo.io/tools#client
    * After you have finished downloading the Expo app, scan the QR code in the webpage using your phone's native camera. 
    * You should see the expo's prompt on your phone which takes you to the expo app, and you will be able to view the app demo. 

### Clear instructions for how to use the application from the end-user's perspective

- As you launch the app, a login page first shows up:

  - **Log in** features(without the database validation so far)
  - email & password authentication will be added when we finish the back-end implementation

- After clicked login, there are 3 tabs that you can navigate in this demo of the app: 

  - **Recording History(Tab)** viewing functionality (with most basic front-end interaction) includes the following sub-features(buttons):
      - **Playback** feature(ui): click on the play button will enter the playing mode, which we will implement the real playback in the next iteration. 
      - **Send to docotor** feature(front-end utitlity): will issue a pop-up message. We will add a HTTP request in the next iteration
      - **Delete a specific recording** functionality: this will update the History page front-end; that specific recording will disappear from the list.
  - **Recording features(Tab)** (most crucial functionality) has following features developed:
      - Pressing the **Microphone Icon**(button) will envoke the start of the recorder.
      - **Timer** will start at the same time to indicate recording length.
      - After a while, press the **Microphone Icon**(button) once again to stop the recorder; in the mean time, the bottom **Playback functionality** will be enabled.
      - **Play**, **Stop**, **Volume Control**, and **Playback Control**(dragable slider over the duration of the recording), these functionalities can be used by using intuitive corresponding buttons/actions.
    > These post-recording features will be moved to a ResultPage in future development.
  - **Profile features(Tab)** 
    - This page will display basic user information that they provided upon registration now including name, birthday, age and gender (detailed to be determined with partner)
    - **Press and hold** name and birthday fields will allow user to edit the current information.
    - At the bottom of this page, there is a **Log out**(button): which will take you back to the first log in page (this feature is only implemented as front-end interaction)