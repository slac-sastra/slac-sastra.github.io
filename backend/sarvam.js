const axios = require("axios");

const SARVAM_API_KEY = "YOUR_SARVAM_API_KEY";

async function generateAIResponse(data) {
  const prompt = `
You are a legal aid assistant for SASTRA Legal Aid Clinic.

User Details:
Name: ${data.name}
Age: ${data.age}
Gender: ${data.gender}
Address: ${data.address}
Village: ${data.village}
Taluk: ${data.taluk}
District: ${data.district}
Phone: ${data.phone}

Issue:
${data.issue}

Tasks:
1. Give step-by-step legal guidance
2. Draft a petition to DLSA
3. Respond in same language (Tamil or English)
`;

  const response = await axios.post(
    "https://api.sarvam.ai/v1/chat/completions",
    {
      model: "sarvam-m",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${SARVAM_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const text = response.data.choices[0].message.content;

  return {
    response: text,
    petition: text
  };
}

module.exports = { generateAIResponse };
