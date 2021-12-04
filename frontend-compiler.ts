import { compilePages, importGoogleFont, inlineJS, inlineSASS, PageShell } from 'page-compiler'

const main = async () => {
	const pageShell = new PageShell({
		head: /* html */ `
		${ await importGoogleFont('Open Sans', [
			{ weight: 400, italic: false },
			{ weight: 700, italic: false }
		]) }
		${ await inlineSASS('./frontend/sass/index.sass') }
		${ await inlineJS('./frontend/js/index.js') }
		`
	})

	compilePages([
		{
			html: pageShell.render('TU Delft Slide Generator', /* html */ `
			<h1>TU Delft Slide Generator</h1>
			<h2>Generates fancy slides</h2>

			<div class="input-container">
				<input type="text" placeholder="Title" id="title">
			</div>

			<div class="input-container">
				<input type="text" placeholder="Subtitle" id="subtitle">
			</div>

			<div class="input-container">
				<input type="text" placeholder="University subtitle" id="uni-subtitle">
			</div>

			<div class="input-container">
				<button onclick="submit()">Generate</button>
			</div>

			<div id="preview"></div>
			`, {
				author: 'Iannis de Zwart',
				description: 'TU Delft Slide Generator',
				keywords: [ 'TU Delft', 'Slide Generator' ]
			}),
			path: '/index.html',
		}
	])
}

main()