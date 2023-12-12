const path = require('path')
const sassTrue = require('sass-true')
const fs = require('fs')

const getFiles = (dir: string, recurrsive: boolean = false): string[] => {
    let files: string[] = []

    // get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir)
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`
        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            if (recurrsive) files = files.concat(getFiles(name, recurrsive))
        } else {
            // If it is a file, push the full path to the files array
            files.push(name)
        }
    }
    return files
}

const basePath = path.relative(process.cwd(), __dirname)
const sassTestFiles = getFiles(path.join(basePath, 'scss'))

sassTestFiles
    .filter((s) => s.endsWith('.test.scss') || s.endsWith('.test.sass'))
    .map((module) => {
        // const baseName = path.basename(module)
        // const sassFile = path.join(basePath, 'scss', `${baseName}`)
        // console.log('---', module, baseName, sassFile)
        sassTrue.runSass({ describe, it }, module, { loadPaths: ['./scss', './node_modules/sass-wdk'] })
    })
