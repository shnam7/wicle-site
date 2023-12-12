const path = require('path')
const sassTrue = require('sass-true')
const fs = require('fs')

function getFiles(dir, recurrsive = false) {
    let files = []

    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
        const name = `${dir}/${file}`
        if (fs.statSync(name).isDirectory()) {
            if (recurrsive) files = files.concat(getFiles(name, recurrsive))
        } else {
            files.push(name)
        }
    }
    return files
}

const basePath = path.relative(process.cwd(), __dirname)
const sassTestFiles = getFiles(path.join(basePath, 'scss'))

sassTestFiles
    .filter((s) => s.endsWith('.test.scss') || s.endsWith('.test.sass'))
    .map((sassFile) => {
        sassTrue.runSass({ describe, it }, sassFile, { loadPaths: ['./scss', './node_modules/sass-wdk'] })
    })
