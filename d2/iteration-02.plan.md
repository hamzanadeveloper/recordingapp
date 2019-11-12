# SICKKIDS PROJECT

 >


## Iteration 01

 * Start date: Oct. 07, 2019
 * End date: Nov. 15, 2019

## Process

This product is a mobile application that allows patients to remotely send audio recordings of urinary voids to the hospital, where it will be received by doctors and analyzed. This app will be deployed on both Android and iOS platforms.

In this iteration, the team completed the front-end portion of the product with its recording functionality implemented.

#### Roles & responsibilities /TODO

-   Yuzhe Hua

    -   I will be using React Native to design front-end functionalities of our application for both Android and Apple platform, which as per our clients expectation of this project; implementing required features such as recording/ saving/ send the audio files. I will also be responsible for client-end API development, for example, sending and storing the target files into our partner's database. I will also be conducting tests as this project moves along in order to deliver a working product for each phase.

-   Chen Zhong Lu

    -  I will be responsible for using React Native to develop front-end functionalities such as recording audio, saving audio record, and sending the audio to our API for processing. I will also take part in developing an API that handles client-end audio files and save them into a local database.


-   Zuoqi Wang

    -   I will be using React Native to design front-end functionalities of our application for both Android and Apple platform, which as per our clients expectation of this project; implementing required features such as recording/ saving/ send the audio files. I am also responsible for back-end integration towards the end of the project mainly for deployment. I will also be responsible for client-end API development, for example, initiating request to our partner's database.


-   Yuanbo Zhang

    -   I will be taking part in developing front-end functionalities of our program in React Native. I will also be integrating the front-end functionalities with our web API. I will also help with integrating our API with the deployment environment at Sick Kids.
    
-   Jianlin Huang

    -   I will be using React Native to design front-end features and presentation of our application for both Android and Apple platform, which as per our clients expectation of this project. As needed, I will also be responsible for client-end API development, for instance, sending and storing audio files into our partner's database (with encryption if possible). I will also be doing documentation of our project which including taking meeting minutes; as well as potentially integrating this application into partner's server or database.

-   Ao Li

    -   I will be developing front-end components in React Native. I will also participate in coding the client-end web API. If needed, I will be integrating our program with Sick Kids’ provided database to ensure compatibility.

-   Youxuan Ma

    -   I will be responsible for front-end development in React Native. I will also be involved in developing the web API that will be used for client-database interaction. Towards project completion, I will be writing and conducting tests.

#### Strengths and Weaknesses
![strength_weakness](./strength_weakness.jpg)

#### Team Rules

Communications:
 -   CSC301 project team will meet with Sick Kids on a weekly basis, either in person or online. In these meetings, the team will give an update on our development progress. If there are new features pushed, we will desmonstrate these features to Sick Kids representatives using Expo as a simulator. We will log feedbacks, and adjust the application accordingly. 

-   CSC301 team will aim to have as many of its members in attendance at the meeting as possible. Should a member fail to be present at a meeting with Sick Kids, a legitmate reason for absence will be provided.
    
-   The team will, to the best of their ability, ensure that all commits to the master branch are clear, so that should a TA or professor wish to review our work, they will be able to do so easily. The team will also aim to notify the TA and professor as soon as possible if any unforeseen incidents occur and require special accomodation.
 
Meetings:
-   CSC301 project team will meet internally on a weekly basis where Sick Kids requirements will be completed following the Agile workflow. We will iterate through tickets, where each ticket represents a stage in the project's completion. These tickets will be set up according to Sick Kids requirements and Sick Kids representatives will be updated upon ticket completion.

-   In these meetings, a ticket will be divided into sections by features and sub-features, which will be assigned to subsets of CSC301 team.

-   For every weekly meeting, progress updates will be given and new
    responsibilities will be assigned, iterating overall progress.
    
-   All meetings will be logged in our google drive folder.
 
Conflict Resolution:
-   In the case of indecisions, the team will vote with no abstention, and the
    majority vote will be passed.

-   In the event of one of team members not completing assigned tasks with sufficient quality or within the deadline with no advanced notice or legitmate excuse, the group will conduct a discussion session with that individual. If no progess is made, this event will be logged and reported to TA during tutorial given unanimous consent from the team.

-   

#### Events /TODO

-   The team will meet in person, in Bahen if possible. If not, another suitable
    location will be chosen.

-   These meetings will consist of coding sessions, code reviews, connecting functionalities of different components (ex. Connecting Feathers.js and
    front-end code) and overall status updates.

-   Meetings will happen weekly.

-   A To-do list has been created to document project requirements. See artifacts for link.

#### Partner Meetings
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

- In the meeting that followed (11/01/2019):
    - ..
#### Artifacts

-   Create a GitHub repository where project source code and project management documents are hosted online. Also team members can create, modify, discuss and track project issues with GitHub issues.
    - Link: <https://github.com/csc301-fall-2019/team-project-sickkids-team>

-   Create a google drive folder shared among internal developers for documenting meeting contents, email conversations and to-do lists roughly resembling project roadmap.
    - Link: <https://drive.google.com/drive/folders/1ka4E3q3dlAuWNzbk3f0TR9FbCGFXt1W5?usp=sharing>

-   Create a Slack channel where team members and Sick Kids representatives are invited in to discuss and technical issue or management questions in order to minimize communication delay.
    - Link: <https://sickkidsuroflow.slack.com>



#### Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 > We strictly followed the software development method taught in class as we opened up a branch called develop branch to aviod pushing half-done code to master or chaotic traffic on the master branch. From the develop branch, different pages of the application each has a seperate branch for development. 
 > As we divided our tasks well , our branches so far do not interfere with one another; so that each branch will have 2-3 team members to work independently depends on the workload of that specific pages. 
 > Once each branch is ready for merge so that we can present product to our client, Yuzhe Huang, who is responsible for reviewing and merging branches will then complete merging onto the develop branch for presentation. 
 * If applicable, specify any naming conventions or standards you decide to adopt.
 > We agreed on using camal case for our naming conventions and we will try to add variable type to its variable name as much as possible.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 > We have downloaded an app called Expo which is usually recommanded when using react native since it allows us to run our project simultaneously when a code change has made. And it also allowed us simulates clicks, some implemented features, visualize our html code better. 
 > Once we are satisfying with our progress result, then we commit our code and pushed to our corresponding branch, ready for merge. After merging, all code pushed onto develop branch has been tested extensively on other testing branches to ensure its functionality and compatibility with the rest of the branches.
 * What deployment tool(s) are you using and why
 > We are now using the application Expo for the purpose of demonstration to our partner so that they can simulate the actual experience application use on their own cell phone. 
 * Don't forget to **explain why** you chose this workflow or particular aspects of it!
 > It is the most understandable and well-used workflow that we have encountered during our coding life so far. And it is suggested in the CSC301 lecture, therefore we decide to adopt this convention workflow as our best-fit choice.



## Product

#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.  
    
    **First goal(most urgent):**
     - Have an intuitive workable front-end design that will satisfy user's needs of the entire application for presentation to client for second meeting.
     - In order to confirm entire application user flow with our partner, we need to complete this goal prior to partner meeting.
     - We achieved this goal by dividing our pages into sub-component of this application and each of our team members is assigned one pages to work on.
     - As the Record Page requires the most attention as described below, this page is assgined to 3 members, Jianlin Huang, Chenzhong Lu and Ao Li.
     - Other pages like Landing Page(History Page) is assigned to Yuzhe Hua and Zuoqi Wang; Result Page(a subpage of Recording Page) is assigned to Yuanbo Zhang; and Youxuan Ma is assigned with the task of completing Profile Page.

    **Second goal(realtivly urgent):**
    
    - Implement the most prominant feature of this application recording feature.
    - This feature can be divided into 3 tasks: recording, playback, and saving audio file for sending.
    - To record and playback audio, expo-av library will be used.
    - In order to save/send audio file, a construction of database and API to connect to partner side will be needed. Details to be discussed in upcoming Friday meeting(11/15/2019) once has the ability to record sound when testing.
    - User flow of this feature:
    >  - First, user will get into Record Page from the navigation bar at the bottom. During first time using this app, a permission to access user's microphone will be asked.
    >  - Second, press the microphone icon/ "Start", it will invoke start record actions by prompting user "To start recording?". Once confirmed, the recorder will record the sound.
    >  - Third, press "Stop", it will stop the recorder from recording, and taking user to the next sub-page -- Result Page for future action on the audio recorded.
    
    **Third goal(tentitive goal):**
    - Create schema for database to store authenticed user information, and audio file. 
    - Need to confirm structure with partner at the upcoming meeting on Friday.

 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

1. Build a initial page where user can log in with pre-defined credentials provided by Sick Kids.
2. Build a landing page containing three tabs for logged-in user to switch between.
3. Build a tab page where user can inspect, play-back and delete any existed recording.
4. Implement the recording history page such that user can scroll down to force refresh.
5. Build a tab page where user can start and end a recording.
6. Build a modal page which is prompted after finished a recording for user to playback finished recording, save finished recording, record a new one or discard finished recording then return to landing page.
7. Build a tab page where user can view and modify his/her information (gender, etc.) or log out.
8. Create a Slack channel where team members and Sick Kids representatives are invited in to discuss and technical issue or management questions in order to minimize communication delay.
    - Link: <https://sickkidsuroflow.slack.com>

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.