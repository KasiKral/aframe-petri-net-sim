import Parse from 'parse';

Parse.initialize(
  'cSOIlNjwImXcHvlVpxaX9HpMNPhzuWNTrRmTd9u5',
  'MJq3UPgflx63VWYz3QfdE94VmOsfZ19ul1MyZBJR'
); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

// Create a new User
export async function createParseSession(sessionId, sessionStart, sessionEnd) {
  // Creates a new Parse "Session" object, which is created by default in your Parse app
  let session = new Parse.Object('Session');
  // Set the input values to the new "Session" object
  session.set('sessionId', sessionId);
  session.set('sessionStart', sessionStart);
  session.set('sessionEnd', sessionEnd);
  try {
    // Call the save method, which returns the saved object if successful
    session = await session.save();
    if (session !== null) {
      // Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
      console.log(
        `New object created with success! ObjectId: ${
          session.id
        }, ${session.get('sessionId')}`
      );
    }
  } catch (error) {
    console.log(`Error error: ${error.message}`);
  }
}

export async function createParseFiringAttempt(
  sessionId,
  transition,
  successful,
  time,
  firingId
) {
  // Creates a new Parse "FiringAttempst" object, which is created by default in your Parse app
  let attempt = new Parse.Object('FiringAttempst');
  // Set the input values to the new "Session" object
  attempt.set('sessionId', sessionId);
  attempt.set('transition', transition);
  attempt.set('successful', successful);
  attempt.set('time', time);
  attempt.set('firingId', firingId);
  try {
    // Call the save method, which returns the saved object if successful
    attempt = await attempt.save();
    if (attempt !== null) {
      // Notify the success by getting the attributes from the "FiringAttempst" object, by using the get method (the id attribute needs to be accessed directly, though)
      console.log(
        `New object created with success! ObjectId: ${
          attempt.id
        }, ${attempt.get('sessionId')}`
      );
    }
  } catch (error) {
    console.log(`Error error: ${error.message}`);
  }
}
