const axios = require('axios');

exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: response.data.choices[0].message.content })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error connecting to OpenAI API'
        };
    }
};
