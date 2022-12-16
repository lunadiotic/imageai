function onSubmit(e) {
	e.preventDefault();

	const prompt = document.querySelector('#prompt').value;
	const size = document.querySelector('#size').value;

	if (prompt === '') {
		alert('please add some text or keyword!');
		return;
	}

	generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
	try {
		showSpinner();
		const res = await fetch('/openai/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt,
				size,
			}),
		});

		if (!res.ok) {
			hideSpinner();
			throw new Error('Image could not be generated');
		}

		const data = await res.json();
		console.log(data);

		hideSpinner();
	} catch (error) {
		document.querySelector('.msg').textContent = error;
	}
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
