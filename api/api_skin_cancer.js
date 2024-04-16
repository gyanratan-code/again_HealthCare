const fs = require('node:fs')
async function getSkinInfo(filename) {
	const data = fs.readFileSync('./images/'+filename);
	const response = await fetch(
		"https://api-inference.huggingface.co/models/youngp5/skin-conditions",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}
// getSkinInfo("cats.jpg").then((response) => {
// 	console.log(JSON.stringify(response));
// });
module.exports = {getSkinInfo}