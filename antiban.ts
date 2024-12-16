
import axios from 'axios';

// Replace these values with your Heroku app details
const herokuAppName = ''; //App Name  //   VERY
const herokuApiKey = ''; // Api Key   //   IMPORTANT

// Set the desired run duration in minutes
const runDurationMinutes = 60; // 1 hour

// Set the desired sleep duration in minutes
const sleepDurationMinutes = 720; // 12 hours

const herokuApiUrl = `https://api.heroku.com/apps/${herokuAppName}/dynos`;

async function startApp() {
  try {
    const response = await axios.post(
      herokuApiUrl,
      {
        'attach': true,
        'env': {},
        'formation': 'web',
        'headers': { 'Accept': 'application/vnd.heroku+json; version=3' },
        'force_no_remote': true
      },
      {
        headers: {
          'Accept': 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${herokuApiKey}`
        }
      }
    );
    console.log('App started successfully');
  } catch (error) {
    console.error('Error starting app:', error);
  }
}

async function stopApp() {
  try {
    const response = await axios.delete(herokuApiUrl, {
      headers: {
        'Accept': 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${herokuApiKey}`
      }
    });
    console.log('App stopped successfully');
  } catch (error) {
    console.error('Error stopping app:', error);
  }
}

async function runAndSleep() {
  await startApp();

  setTimeout(async () => {
    await stopApp();

    console.log(`App will sleep for ${sleepDurationMinutes} minutes`);

    setTimeout(runAndSleep, sleepDurationMinutes * 60 * 1000);
  }, runDurationMinutes * 60 * 1000);
}

runAndSleep();