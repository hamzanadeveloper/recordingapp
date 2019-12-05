# Team 23 SickKids Project

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 > The form of our project with our partner, SickKids is decided to be an mobile application that could be used on both mobile platforms, IOS and Android. This application was mainly designed to help the department to have an alternative option to track patients' health condition without coming to hopsital for an exam. It can potentially resolves the hardship for people coming from areas that have less medical resources or having difficulties commuting to hopsitals. Potentially, users of this application will be able to communicate to doctors who may located remotly through this app. 
 * What is the problem you're trying to solve?
 > As in the first meeting discussion with our partner, their urologists stated that the difference in stats of voiding (such as sound, volume, flow speed etc.)could indicates different potential diagnosis of a patient. Now the patients can only utilize an expensive equipment in SickKids to let the doctors perform such primary test before carried out an sequence of advanced tests to comfirm. The application we now built may help reducing the needs of coming to hospital for these common uroflow exam via our recording functionality. A sequence of recordings may help early detect the trend of a major disease or health concern. 
 * Is there any context required to understand **why** the application solves this problem?
 > By using this application, the patient now can make a recording when they void and will be able to sent such audio file to a doctor for a primary check up or diagonsis. Unless the doctor feels the need that this patient needs furthur exams, the patient could potentially have a simple phone meeting with the doctor to discuss any minor health issue he/she may encounter. 

## Key Features
 * Described the key features in the application that the user can access
 * Feel free to provide a breakdown or detail for each feature that is most appropriate for your application 
 
 - As you launch the app, a login page first shows up:
    - **Log in** features: email & password combination that matches record in the database will be needed, and will be authenticated for a period of time.
      - Log in user with correct combination of email and password. User password is hashed before storing the database. 
      - Since all users are pre-defined, there will not be an sign-up function at the moment.
      - After a successful login, an authorization token will be stored inside user's phone and user will not need to login again within 7 days. 

- After login, there are 3 tabs that you can navigate in this demo of the app: 
    - **Recording features(Tab)** (most important functionality) has following features developed and tested:
      - Start a new recording by press microphone icon.
      - **Timer** will start at the same time to indicate recording length.
      - Stop the recorder by pressing same icon again; it will then navigate to the **result page automatically**.
        > There are some post-recording features in ResultPage.
    - **Result (Page)**:
        - **Playback functionality**：\
        Play back the recording just made on the previous recording page.
        - **Send recording**: \
        Upload the recording file onto our file server and our server will save it in .wav form, and record file path in our database. 
        - **Rerecord recording**: \
        Scratch the previous recording just made and direct back to the Recording Page and ready for accepting new recording. 
        - **Add comment**: \
        Edit recording-specific information on this page. Check the box when symptoms applies and feel free to add any description to provide further details regarding this recording.
      

  - **Recording History(Tab) with functionality adjustment due to time limit**:
      - This page is now mainly for display any recordings made by current logged in user for now.
      - This page now displays the recordings made by this account and able to view details (Date Uploaded) of selected recording.
 

  - **Profile features(Tab)** 
    - This page will display basic user information that they provided upon registration including email, birthday and gender. 
    - User will be able to change their password, birthday and gender. 
    - **Press and hold** password, birthday and gender fields will be allowed to edit.
    - Once a change to above information is saved, database information will be updated respectively
    - At the bottom of this page, there is a **Log out**(button): which will take you back to the first log in page and revoke the Json Web Token even the expiration period isn't reached. 

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 > Due to the fact that this application is developed for internal testing purpose, the users are pre-defined on our partner's side with some sign up mechanism. Any users who filled their information and approved by the SickKids team, will be able to log in with their email and password they provided as they first launched this application. And after initial log in, the user will be authenticated for a fixed period of time before they need to validate their credential again.
 * Provide clear steps for using each feature described above
 
 - As you launch the app, a login page first shows up:
    - **Log in** features: email & password combination that matches record in the database will be needed, and will be authenticated for a period of time.
      - Input email and password, click Log in Button:
          - if wrong email was entered: will prompt user not found
          - if wrong password was entered: will prompt wrong password
          - if combination was all correct, will direct user into the application.
      - Since all users are pre-defined, there will not be an sign-up function  

      **For demo purpose, we have two pre-defined users:**  
      **email: frank@gmail.com, password: 123456**  
      **email: mark@gmail.com, password: 123456**

- After clicked login, there are 3 tabs that you can navigate in this demo of the app: 
    - **Recording features(Tab)** (most important functionality) has following features developed:
      - Pressing the **Microphone Icon**(button) will envoke the start of the recorder.
      - **Timer** will start at the same time to indicate recording length.
      - After a while, press the **Microphone Icon**(button) once again to stop the recorder; it will then navigate to the **result page automatically**.
      > There are some post-recording features in ResultPage.
    - **Result (Page)**:
        - **Playback functionality**：\
        A button called "Play Now"with a red play-icon will enable to play back the recording just made on the previous recording page.
        - **Send recording**: \
        Click "Send Now" button, will upload the recording file onto our file server and that file will be stored.
        - **Rerecord recording**: \
        "Re-record" will scratch the previous recording just made and direct back to the Recording Page and ready for accepting new recording. 
            > **Note: non-sent recording will be lost, be caution**
        - **Add comment**: \
        You will be able to edit recording-specific information on this page. Check the box when symptoms applies and feel free to add any description to provide further details regarding this recording.
      

  - **Recording History(Tab) with functionality adjustment due to time limit**:
      - This page now displays the recordings made by this account and able to view details of selected recording.
      - Click a single recording tab will popup a new page to display information of this recording.
      - User will be able to view information like the uploaded date time of the recording on selected.
      - Other buttons such as 'Send to my docotr' will be an placeholder for future development
 

  - **Profile features(Tab)** 
    - **Press and hold** password or birthday or gender fields will allow input text box to appear and accepting input.
    - User will then entered their wished new information
    - Once input has entered, click "Save" will then update information in the database.
    - At the bottom of this page, there is a **Log out**(button): which will take you back to the first log in page and revoke the Json Web Token even the expiration period isn't reached. 

 * If you cannot deploy your application for technical reasons, please let your TA know at the beginning of the iteration. You will need to demo the application to your partner either way.
     > The actual deployment of this application is not a must-have at this stage, as it is only developed to test the applicability of such device and to be used with internal perpective users as oppsed to public access. And we have reached an agreement on this very issue with our partner also. We will also mention this concern in the iteration document.
     > 
     > But we deployed the server onto heroku and database onto heroku postgres, for demonstration purpose. 
 
 ## Development requirements

 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 - To be able to run this application in general, a few software needs to be installed prior to run the application:
     - Node.js: Download link and instructions can be found on website:
         > https://nodejs.org/en/
     - npm: npm is distributed together with by Node.js
         - Download both package from the above link
         > Detailed step can be found on: https://www.npmjs.com/get-npm
     - expo cli & expo client app: expo cli holds a platform for React Native applications. It allows you to develop and test on your own mobile devices on iOS or Android apps from the same JavaScript code. expo client app is the mobile app that supports expo cli. You don't need expo client app if you want to use Android and iOS simulators. Both download can be found using this link: 
        > https://docs.expo.io/versions/latest/get-started/installation/
     - PostgreSQL database server: Installer and instructions can be found on official website:
         > https://www.postgresql.org/download/

 - Once have above softwares installed on the machine, obtained the code from the repositories from GitHub link; then just a few steps to be able to run the application:
     - Now open a terminal window
     - cd into the project folder from machine's root folder
     - cd into folder called **'api'** by run:
     ``` sh
         cd api
     ```
     - Run following command to have required packages installed for server side:
     ``` sh
         npm install
     ``` 
     - Then after package successfully installed, run following command to start the database server:
     ``` sh
         npm start
     ```

     - Now open up a new terminal window, also cd into project folder, then change into **'sickkids_uroflow'** folder:
     ``` sh
         cd sickkids_uroflow
     ```
     - Run following command to have required packages installed for front-end side:
     ``` sh
         npm install
     ``` 
     - Again, run:
     ``` sh
         npm start
     ```
    to start running this application.

    > A predefined user has already been created for log in credential:
         > Email: frank@gmail.com
         > Password: 123456

- Once the application is up and running, a webpage will popup with a QR Code ready to be scanned:
    - Install **Expo Client** App on your mobile device, and then scan the code will open up the application on your mobile device.
    - 

- Now you can play around with this application just as how you would interact with the application as needed!



 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

 
 SickKids has decided to make this project private due to various reasons: 
 * This project is still in research and they do not want to publicly display it. 
 * This app will eventually be published by SickKids developers, and they do not want it to be public in case future security risks rise. 
