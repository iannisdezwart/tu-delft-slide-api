import { createAPI, readJSONBody } from '@iannisz/node-api-kit'
import { generateSlide } from './template'
import * as puppeteer from 'puppeteer'
import * as fs from 'fs'
import { randomBytes } from 'crypto'

export interface SlideInfo {
	title: string
	subtitle: string
	universitySubtitle: string
}

const PORT = +process.argv[2] || 3000

;(async () => {
const api = createAPI(PORT)

const browser = await puppeteer.launch({
	args: [ '--window-size=1920,1080', '--no-sandbox' ]
})

api.post('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	const id = randomBytes(16).toString('hex')
	const body = await readJSONBody(req) as SlideInfo
	console.log(`(${ id }) Slide request:`, body)

	if (body.title == null) {
		res.statusCode = 400
		res.end('Missing title')
		console.log(`(${ id }) Missing title`)
		return
	}

	if (body.universitySubtitle == null) {
		body.universitySubtitle = 'Delft University of Technology'
	}

	const html = await generateSlide(body)
	const page = await browser.newPage()
	console.log(`(${ id }) Opened page`)

	// @ts-ignore
	await page._client.send('Emulation.clearDeviceMetricsOverride')
	await page.setContent(html)
	console.log(`(${ id }) Set page content`)

	const path = `tmp/${ id }.png`

	if (!fs.existsSync('tmp')) {
		fs.mkdirSync('tmp')
	}

	await page.screenshot({ path })
	console.log(`(${ id }) Screenshot page`)

	await page.close()
	console.log(`(${ id }) Closed page`)

	fs.createReadStream(path).pipe(res)

	res.on('finish', () => {
		fs.unlinkSync(path)
		console.log(`(${ id }) Removed file`)
	})
})
})()