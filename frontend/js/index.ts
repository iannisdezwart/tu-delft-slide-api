const show = (blob: Blob) => {
	const img = document.createElement('img')
	const preview = document.querySelector('#preview')

	img.src = URL.createObjectURL(blob)

	preview.innerHTML = ''
	preview.appendChild(img)
	preview.insertAdjacentHTML('beforeend', /* html */ `
	<div class="input-container">
		<button onclick="download('${ img.src }')">Download</button>
	</div>
	`)
}

const download = (url: string) => {
	const a = document.createElement('a')

	a.href = url
	a.download = 'slide.png'

	document.body.appendChild(a)

	a.click()
	a.remove()
}

const submit = async () => {
	const title = document.querySelector<HTMLInputElement>('#title').value
	const subtitle = document.querySelector<HTMLInputElement>('#subtitle').value
	let universitySubtitle = document.querySelector<HTMLInputElement>('#uni-subtitle').value

	if (title == '') {
		alert('Please enter a title')
		return
	}

	if (universitySubtitle == '') {
		universitySubtitle = null
	}

	const res = await fetch('https://slidesapi.iannis.io/', {
		method: 'POST',
		body: JSON.stringify({ title, subtitle, universitySubtitle })
	})

	const data = await res.blob()

	show(data)
}