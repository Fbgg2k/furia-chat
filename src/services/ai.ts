export async function getAIResponse(message: string): Promise<string> {
  console.log("url: http://localhost:3001/api/openai");
  console.log("message sent: ", message);

  try {
    const response = await fetch("http://localhost:3001/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),  
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json()

    if(data.error){
        console.error("AI response error: ", data.error);
        return `AI Error: ${data.error}`;
    }
    console.log("AI response: ", data.response);    
    return data.response;    
  } catch (error: any) {    
    console.error("Error getting AI response:", error);    
    return `Error: Could not get response from AI. Details: ${error.message}`;
  }
}
