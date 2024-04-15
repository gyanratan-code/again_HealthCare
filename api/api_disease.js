async function getDiseaseInfo(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Zabihin/Symptom_to_Diagnosis",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
// getDiseaseInfo("I've been feeling feverish and have a sore throat. I've also been coughing and feeling tired.").then((res)=>{
// 	console.log(JSON.stringify(res))
// })
module.exports = {getDiseaseInfo}