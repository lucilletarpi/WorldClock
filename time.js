function time() {
	const background = document.querySelector(".background");

	const selectResult = document.getElementById("result");
	const inputCountry = document.getElementById("country");

	const apiKey = "41156f4f336b47b6851ed1226165cd23";
	// Retrieves the country entered by the user
	const country = inputCountry.value.toLowerCase();

	// Erase old search
	selectResult.innerHTML = "";

	// Retrieve response
	const parseResponse = (response) => response.json();

	const loader = document.getElementById("loader");
	loader.classList.remove("hide-loader");

	fetch(
		`https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${country}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Oops! Merci de réssayer");
			} else return parseResponse(response);
		})
		.then((data) => {
			loader.classList.add("hide-loader");
			if (country === data.requested_location) {
				const localTime = new Date(data.datetime);
				const showResult = document.createElement("p");
				showResult.className = "timeResult";
				showResult.id = `${country}`;
				showResult.innerHTML = `${country} ${localTime.toLocaleString()}`;
				selectResult.appendChild(showResult);
				background.id = data.timezone_abbreviation;
			} else {
				const showResult = document.createElement("p");
				showResult.className = "errorResult";
				showResult.innerHTML = "Oops! On ne connait pas ce pays";
				selectResult.appendChild(showResult);
				background.id = "noCountry";
			}
		})
		.catch(() => {
			const showResult = document.createElement("p");
			showResult.className = "errorResult";
			showResult.innerHTML = "Oops! Merci de réssayer";
			selectResult.appendChild(showResult);
		});
}
time();
