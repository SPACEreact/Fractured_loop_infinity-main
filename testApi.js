const API_KEY = "AIzaSyBD5wS3hwL4zRiAs5tAaxfH8YNZ3efqT3U";
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

async function testApi() {
  console.log("Testing Gemini API...");
  try {
    console.log("Fetching available models...");
    const url = `${GEMINI_API_BASE_URL}/models?key=${API_KEY}`;
    console.log("URL:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error text:", errorText);
      return;
    }

    const data = await response.json();
    console.log("Success! Data received:");
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error("Error:", error);
  }
}

testApi();
