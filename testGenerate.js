const API_KEY = "AIzaSyBD5wS3hwL4zRiAs5tAaxfH8YNZ3efqT3U";
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

async function testGenerate() {
  console.log("Testing Gemini generateContent API...");
  try {
    const url = `${GEMINI_API_BASE_URL}/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    console.log("URL:", url);

    const request = {
      contents: [{
        parts: [{ text: "Hello, can you respond with a simple greeting?" }]
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error text:", errorText);
      return;
    }

    const data = await response.json();
    console.log("Success! Response:");
    console.log(JSON.stringify(data, null, 2));

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      console.log("Generated text:", data.candidates[0].content.parts[0].text);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

testGenerate();
