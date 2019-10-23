# Sick Kids
> _Note:_ This document is meant to evolve throughout the planning phase of your project.    
 > That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section).
 > Most importantly, it is a reflection of all the planning you work you've done in the first iteration.
 > **This document will serve as an agreement between your team and your partner.**

## Product Details

#### **Q1: What are you planning to build?**

This product is a mobile application that allows patients to remotely send audio
recordings of urinary voids to the hospital, where it will be received by
doctors and analyzed. This app will be deployed on both Android and iOS
platforms.

Currently, patients use medical equipment known as a uroflowmeter to produce
graphs outlining their ability to empty their bladder. This equipment can be
expensive and is not widely available outside of urologist offices and
hospitals. To increase accessibility and reduce the cost of equipment, the
Urology department at SickKids is attempting to develop technology that will
allow the diagnosis of urinary voiding conditions without a visit to the
hospital.

The proposed technology is that the patient will, using their mobile device,
record the sound of themselves/their child voiding. This audio data will be
relayed to the hospital and mapped to a urinary flow model built by SickKids so
that a prediction of the patient’s voiding condition can be made. If further
actions are needed, the doctors can then conduct an in-person appointment with
the patient.

Helpful Links: <https://www.healthline.com/health/uroflowmetry>

#### **Q2: Who are your target users?**

The user group will consist initially of pediatric patients with voiding conditions such as urethral strictures and meatal stenosis. This technology may eventually be translated for use in adult patients with urinary voiding conditions. 

Doctors who will be needing the user-submitted information are also considered as a part of the target users.


#### **Q3: Why would your users choose your product? What are they using today to solve their problem/need?**

This product has not been built before. This product will reduce the patient’s
frequency of visits to the hospital. For patients living in remote areas, this
will be a very convenient alternative. There is potential for significant
patient and healthcare system cost savings.

#### **Q4: How will you build it?**

The app will be built using React Native, this is to ensure the product’s
compatibility on both Android and IOS platforms. The application will use a
front-end structure that will be built to interact with the existing database
and servers provided by Sick Kids. This app will be written in JavaScript. React
Native, Expo and Feather.js will be used in the app. Front-end scripting logic
will be completed by JS, including sending and receiving HTTP requests to and
from API. Feather.js will be used to build a custom API that responds to such
requests as well as reading and saving to Sick Kids databases. This app will be
tested both with Jest and on physical devices including both Android and iOS.
Expo will enable us to carry out such testings.  

![dataflow_chart](./dataflow_diagram.png)

The application will be deployed in the App Store and Google Play Store, where
they can be downloaded by all users but only those authorized will have access
to its full functionality.

#### **Q5: What are the user stories that make up the MVP?**

1.  As a person living in Northern Ontario who has no access to a urologist, I
    want to remotely send a sample of my voiding information for assessment, so
    that I can be tested without going to the hospital.

2.  As a very busy parent who cannot make time during working hours to bring my
    child to appointments, I want to be able to submit voiding information from
    my child for assessment during non-business hours, so the doctors can help
    with my child’s voiding problem.

3.  As an elderly man with accessibility issues who cannot commute to a
    hospital, I want to remotely submit a voiding log, so that a history of my
    voiding information can be built up in a hospital database.

4.  As a urologist, I want to request a patient’s latest voiding data, so I can
    monitor their health condition.

5.  As a urology researcher, I want to study the relationship between voiding
    flow and health condition, so I can make better predictions and arrive at a
    more accurate diagnosis.
   
**Accepting Criteria**
1. The user will be able to record voiding audio file, save this file locally on their mobile device, and send the audio file to the hospital for assessment. The user should then be able to be notified once the audio file is successfully sent.

2. The users will be able to record voiding audio file for their child, save this file locally on their mobile device, and send the audio file to the hospital, on behalf of their child, for assessment. The user should then be able to be notified once the audio file is successfully sent.

3. The user will be able to record voiding audio file, save this file locally on their mobile device, and send the audio file to the hospital for assessment. The user should then be able to be notified once the audio file is successfully sent.

4. The app should have the ability to store user-sent audio files into the database provided by Sick Kids. This sent resource should contain identifiers that can uniquely identify the audio file with the patient that this file belongs to.

5. The app should be able to communicate with SickKids’ server and store information in their database in order for the researchers to analyse the relationship between voiding flow and health condition.  

**Process Details**
-------------------
**Strength and Weakness**
![strength_weakness](./strength_weakness.jpg)
#### **Roles & responsibilities**
|
-   Yuzhe Hua
    -   I will be using React Native to design front-end functionalities of our application for both Android and Apple platform, which as per our clients expectation of this project; implementing required features such as recording/ saving/ send the audio files. I will also be responsible for client-end API development, for example, sending and storing the target files into our partner's database. I will also be conducting tests as this project moves along in order to deliver a working product for each phase.
    -   React Native development

    -   Tester

    -   Client-end API development


-   Chen Zhong Lu

    -  I will be responsible for using React Native to develop front-end functionalities such as recording audio, saving audio record, and sending the audio to our API for processing. I will also take part in developing an API that handles client-end audio files and save them into a local database.


-   Zuoqi Wang

    -   React Native development

    -   Back-end integration (if necessary)

    -   Client-end API development

    -   Strength:

        1.  Documentation

        2.  React

        3.  Javascript

    -   Weakness:

        1.  Web debugging

        2.  UI design

        3.  Optimization

-   Yuanbo Zhang

    -   React Native development

    -   Client-end API development

    -   Strength:

        1.  Documentation

        2.  Java

        3.  Android Development
    -   Weakness:

        1.  Run time control

        2.  Front-end design

        3.  C

-   Jianlin Huang

    -   I will be using React Native to design front-end features and presentation of our application for both Android and Apple platform, which as per our clients expectation of this project. As needed, I will also be responsible for client-end API development, for instance, sending and storing audio files into our partner's database (with encryption if possible). I will also be doing documentation of our project which including taking meeting minutes; as well as potentially integrating this application into partner's server or database.

-   Ao Li

    -   React Native development

    -   Client-end API development

    -   Back-end integration (if necessary)

    -   Strength:

        1.  Black Box Testing

        2.  API Design

        3.  Database Manipulation

    -   Weakness:

        1.  Large Scale Software Segregation

        2.  Front end interaction

        3.  Documentation

-   Youxuan Ma

    -   React Native development

    -   Client-end API development

    -   Testing (if necessary)

    -   Strength:

        1.  Front-end design (HTML, CSS & AntD), Front-end logic (JS, React & Jquery)

        2.  Testing (debugging)

        3.  Database (SQL & a bit Spring Boot)

    -   Weakness:

        1.  C

        2.  Documentation

        3.  Design patterns (inexperienced with organizing large projects)

#### **Team Rules:**

#### **Communications:**

-   CSC301 project team will meet with Sick Kids on a weekly basis, either in
    person or online.

-   CSC301 team will aim to have as many of its members in attendance at the
    meeting as possible.

#### **Meeting:**

-   CSC301 project team will meet internally on a weekly basis.

-   SickKids requirements will be completed using the Agile workflow.

-   Features and sub-features will be assigned to subsets of CSC301 team.

-   For every weekly meeting, progress updates will be given and new
    responsibilities will be assigned, iterating overall progress.

#### **Conflict resolution:**

-   In the case of indecisions, the team will vote with no abstention, and the
    majority vote will be passed.

-   In the case of a teammate being unable to make a meeting physically, he must
    attend the meeting online.

-   In the case of a difference in coding style, the team will follow a style of
    code structure and documentation that is used by the majority.

-   Resolve conflicts with LOVE and PEACE.

#### **Events**

-   The team will meet in person, in Bahen if possible. If not, another suitable
    location will be chosen.

-   These meetings will consist of coding sessions, code reviews, connecting
    functionalities of different components (ex. Connecting Feathers.js and
    front-end code) and overall status updates.

-   Meetings will happen weekly.

#### **Partner Meetings:**

-   Partner meetings will happen in person, at a Sick Kids approved location,
    where at least a majority of team members will be present.

-   In the first two meetings we have:

    -   Clarified the app’s functionalities from both a technical and
        non-technical perspective

    -   Decided the teach stack components (see: Q4 How will you build it?)

    -   Decided on development priorities:

        -   First, complete the functionalities of recording and sending
            user-recorded audio files to Sick Kids database (complete JS and API
            functions to support this feature)

        -   Then, complete user authentication processes.

        -   Lastly, complete UI components (refine HTML and CSS layout)

#### **Artifacts**

-   A GitHub repository has been created for the project code files.

-   A google drive is created documenting meetings, emails, and to-do lists.

**Highlights**
--------------

-   If anything noteworthy comes up, we will make sure to add them here.
