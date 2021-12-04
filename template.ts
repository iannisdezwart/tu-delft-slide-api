import { SlideInfo } from './api'
import { importGoogleFont, inlineSASS, inlineSVG } from 'page-compiler'

export const generateSlide = async (body: SlideInfo) => /* html */ `
${ await importGoogleFont('Playfair Display', [ { weight: 700 } ]) }
${ await importGoogleFont('Open Sans', [ { weight: 400 } ]) }
${ await inlineSASS('res/slide.sass') }

<div class="slide">
	<div class="left-bar">
		${ inlineSVG('res/tu-delft-logo-white.svg', { id: 'white-logo' }) }
	</div>

	<div class="slide-content">
		<div class="text-section">
			<h1>${ body.title }</h1>
			${ body.subtitle ? `<h2>${ body.subtitle }</h2>` : '' }
		</div>

		<div class="logo-section">
			${ inlineSVG('res/tu-delft-logo-colour.svg', { id: 'colour-logo' }) }
			<p>${ body.universitySubtitle }</p>
		</div>
	</div>
</div>
`