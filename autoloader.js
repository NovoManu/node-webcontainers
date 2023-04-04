const fs = require('fs')

const INPUT = 'app'
const OUTPUT = 'files.js'
// List of files to include into webcontainers
const files = ['index.js', 'package.json']
const exportLine = 'export const files = '

const content = {}

files.forEach(file => {
    const buffer = fs.readFileSync(`./${INPUT}/${file}`)
    content[file] = {
        file: {
            contents: buffer.toString()
        }
    }
})

fs.writeFileSync(OUTPUT, `${exportLine}${JSON.stringify(content, null, 2)}`)
