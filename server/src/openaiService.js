const axios = require("axios");

const apiKey = "sk-proj-JJgl2M7EH0HKIjcByJ72T3BlbkFJjQet70ro1VPYOQgNdvQK"; // Your API key

const getCategory = async (expense) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that categorizes expenses into one of the following categories: Food, Living, Transportation, Health & Self Care.",
          },
          {
            role: "user",
            content: `Expense: ${expense.description}`,
          },
        ],
        max_tokens: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const category = response.data.choices[0].message.content.trim();
    return category;
  } catch (error) {
    console.error("Error with OpenAI API", error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { getCategory };
