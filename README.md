# About
This is a simple Artificial Healthcare app designed for submission in FrostHack 2024 by the team Rizzers.JS 2.0, We have tried to incorporate several features using AI inference API from HugingFace. This project currently has a working AI disease detector feature, and Appointment Booking Feature.
# Steps to run
1. Get a google Oauth client ID and secret and put in .env file and then put the ngrok static domain/localhost from which you want to send requests for authorization, follow the next two steps if you have used ngrok domain, otherwise go to step 4. Also set-up the .env file with all the cridentials necessary like, the required port and the mongoDB URI
2. First Set-up an ngrok.exe file in your folder which you can download from the link : https://ngrok.com/download
3. In the same directory as that of ```ngrok.exe``` file, open terminal and type the following command ```ngrok domain=YOUR_NGROK_DOMAIN 3000``` , here 3000 is the port of the backend server.
4. Now go to the Directory where the Repository was cloned to, and type the command ```npm i``` in the terminal, this will install all the dependencies and node modules folder will be created.
5. Now, to start the server, just type ```npm start```.
## Future Development
Due to time constraint, we could not correctly implement the Skin disease detection part, But it is there in the code. We may also switch to a better or custom trained model for the AI disease detection. Also, from the next time, we will focus more on the betterment of Visual FrontEnd side.

