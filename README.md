# My Nest.js App in Firebase Function

This is a Nest.js app embedded in a Firebase Function that utilizes Firebase Admin for server-side operations.

## Installation

1. Clone the repository and navigate to the project directory.
2. Make sure that you have the funtions and public folders. Also make sure you have the firebase configuration files and the package.json file.
3. Install Node 18 (make sure is that version and not another!)
4. Install firebase tools with this command on terminal:

```bash
$ npm install -g firebase-tools
$ npm install -g firebase-functions@latest firebase-admin@latest firebase@latest
```

\*\* With linux you must do it with sudo prefix.

5. Log in into your firebase account (using google) with this command:

```bash
$ firebase login
```

Press yes to allow permissions.

6. Install all the dependencies using npm, make sure you are standing in functions folder (Gym-Bro-Api/functions/):

```bash
$ npm install
```

7. Add firebase project to the firebase CLI. You must being logged in so firebase can locate the projects you have access for. Use this command standing on the root project:

```bash
$ firebase use --add
```

and select the gym-bro project (you must requiere access to the project, see contact info)

9. If you have windows OS, install Java and make sure that the Path configuration has it's bin files.

## Running firebase locally:

Running firebase emulators will allow you to run all the nest js app into the firebase functions, so you can use all the firebase services as the main infrastructure for this project.

Go to ../functions on terminal, and type:

```bash
$ npm run dev
```

This will start the firebase:emulators with all the services included in the firebase project like firestore, authentication, storage, and so...

\*\* In Windows You must allow permission for windows. You'll see many Java windows opening. Do not close them.

You should see this kind of message on terminal if everything go rigth:

![1](readme_images/1.png)

![2](readme_images/2.png)

\*Note: The ports numbers may be differents if you configure them differently in your firebase.json file.

## Testing nest locally:

With postman or any other software like that, you can test the "Hello World from Nest Js" so you can see if the Nest js app was successfully embebbed into the firebase project"

Request a GET to http://localhost:5001/gymbro-27bb2/us-central1/api
