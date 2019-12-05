# Team 23 SickKids Project

## Iteration 03 - Final

 * Start date: November 16th, 2019
 * End date: December 4th, 2019

#### Note for this iteration regarding deployment
Deployment of this application is not necessary at this stage; therefore no deployment action has been done yet. Detail reason to be found in README file.

### Changes from you `product.md`

List the most significant changes you made to your product (if any). It's normal to change features mid-project or reduce the scope to meet timelines. 

 * Start with the most significant change
 * Identify either a change in features or a reduction of your original scope
 * For each change, explain why you are making it and what you are hoping to achieve from it 

 - **Switched** from using Feathers to using Express (choice of server implementation)
     - This is a compromise to the time constraint we have for our project. We were originally suggested by our partner that use Feathers to build our server; however, due to limited time, we are not comfortable about using such Library which we spend little researching to implement our code. Therefore, we consulted with our TA and decided that it is a worthy compromise for the completeness and level of extensibility of this project to switch to Express, which we have learned and practiced in our other course. And we consulted our partner afterwards and got an approval.
     - After the decision we made, we have made huge progress on our back end development so that we caught up with our timeline designed. Since Feathers build on top of Express, therefore the extensibility of this project is maintained; and Express can be transformed to Feathers with simple alternation to the code.
     - Details regarding this change will be provided to our partner during Hand-off
 - **Reduction** in features within the History Page
     - This is a reduction of our origin purpose of this application mainly due to time limit of this project. As we discussed with our TA, we decided to drop some less important features from our application so that we could use the time to refine other more prominant features. 
     - As a result, we spent more time on database interactions, incluiding authentication, fetch calls. In addition, we also made improvement to our main recording feature's front end design, so the user flow is more clearer. And we reformated the profile tab in our application.
 - **Additional** features of Recording functionality
     - This is a change of required features from our partner as we have progress meeting with our partner. This request pop up was an idea brought to the table as we have regular weekly meeting with our partner. They would like to allow users(patients) to include their recording specific comments after they records an audio file in addition to the origin record-send functionality.
     - We fullfilled this requests by dropping some features in History Page as stated above. To achieve this functionality, we add a few checkbox placeholder for any binary information they would like to include in the future, as well as a description text input box for any word comment for that specific recording.  

 > *Note:* If you are not making (or haven't made) any changes to your product, it means you successfully scoped, planned and executed the development of your application.This is a very rare occurrence - describe what you believed enabled your team to do so and why. 

### Handoff plan

Describe your plan for handing off your product and all technical assets to your partner

 * Will you have a handoff meeting? If so, what will be discussed?
 * What assets/artifacts will you be handing off to your partner (e.g. codebase, deployment tools, running application, task tracker, etc.)?
 > We will have a handoff meeting with our partner's tech team in the near future, possibly during next week. And more detailed set-up instruction, clear usage of existing features will be passed off to them for any future development. 
 > Code repository along with current task tracker(git issues); development testing tools, Expo, will be given; Test user accounts credential will be given. Additionally, any libraries or database used will also be included in the whole package. 
 * How will you hand off these assets/artifacts?
 > Any code related material will passed along through GitHub; others will be discussed at a handoff meeting and a written document includes all detail information will also be given.
 * Does your partner have the technical capacity to manage/maintain/develop your product? How will that impact how you handoff the product?
 > We will be handing this project to the research development team of SickKids Hospital we've been working closing throughout this process which are equiped with experienced software engineers. They will definitly have the technical capacity to furthur develop our product. Therefore, our hand-off should be fairly easy. 


> *Note:* This is one of the most important aspects of the project. Please consult with your partner, your TA and the instructors on how to successfully execute this. 