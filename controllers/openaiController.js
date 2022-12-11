const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
	try {
		const response = await openai.createImage({
			prompt: 'Painting sleep red wolf with Leonardo da Vinci style.',
			n: 1,
			size: '512x512',
		});
		const imgUrl = response.data.data[0].url;
		res.status(200).json({
			success: true,
			data: imgUrl,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
	}
};

module.exports = { generateImage };
