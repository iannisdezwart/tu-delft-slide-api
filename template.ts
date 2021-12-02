import { SlideInfo } from './index'
import { inlineSVG } from 'page-compiler'

export const generateSlide = (body: SlideInfo) => /* html */ `
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
			${ inlineSVG('res/tu-delft-logo-colour', { id: 'colour-logo' }) }
			<p>${ body.universitySubtitle }</p>
		</div>
	</div>
</div>
`