import { createAPI, readJSONBody } from '@iannisz/node-api-kit'
import { generateSlide } from './template'

export interface SlideInfo {
	title: string
	subtitle: string
	universitySubtitle: string
}

const PORT = +process.argv[2] || 3000

const api = createAPI(PORT)

api.post('/', async (req, res) => {
	const body = await readJSONBody(req) as SlideInfo

	if (body.title == null) {
		res.statusCode = 400
		res.end('Missing title')
		return
	}

	if (body.universitySubtitle == null) {
		body.universitySubtitle = 'Delft University of Technology'
	}

	res.end(generateSlide(body))
})