function time() {
	const inputCountry = document.getElementById("country");
	const apiKey = "41156f4f336b47b6851ed1226165cd23";
	const country = inputCountry.value; // Remplacez par le pays

	fetch(
		`https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${country}`
	)
		.then((response) => response.json())
		.then((data) => {
			const localTime = new Date(data.datetime);
			console.log(
				`L'heure actuelle en ${country} est : ${localTime.toLocaleString()}`
			);
		})
		.catch((error) =>
			console.error(
				"Une erreur s'est produite lors de la récupération des données :",
				error
			)
		);
}
time();
