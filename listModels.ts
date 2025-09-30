const API_KEY = "AIzaSyBD5wS3hwL4zRiAs5tAaxfH8YNZ3efqT3U";
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

async function checkAvailableModels() {
  console.log("Starting checkAvailableModels...");
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
      throw new Error(`ListModels API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: any = await response.json();
    console.log("Data received:", JSON.stringify(data, null, 2));
    console.log("--- Available Models for your API Key ---");
    if (data.models && data.models.length > 0) {
      data.models.forEach((model: any) => {
        console.log(`Model Name: ${model.name}`);
        console.log(`  Description: ${model.description}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
        console.log(`  Input Token Limit: ${model.inputTokenLimit}`);
        console.log(`  Output Token Limit: ${model.outputTokenLimit}`);
        console.log('---');
      });
    } else {
      console.log("No models found. This might indicate an issue with your API key or project setup.");
    }
  } catch (error: any) {
    console.error("Error listing models:", error);
    if (error.message && error.message.includes("403")) {
      console.error("Access Denied. Check if the Generative Language API is enabled for your project and your API key has permissions.");
    }
  }
}

console.log("Calling checkAvailableModels...");
checkAvailableModels();
