import {WebContainer} from '@webcontainer/api'
import {files} from "./files"
import {Terminal} from "xterm"
import 'xterm/css/xterm.css'

const iframe = document.querySelector('iframe')
const textarea = document.querySelector('textarea')
const terminalElement = document.querySelector('.terminal')

let webcontainersInstance

async function installDependencies(terminal) {
    const installProcess = await webcontainersInstance.spawn('npm', ['install'])

    installProcess.output.pipeTo(new WritableStream({
        write(data) {
            terminal.write(data)
        }
    }))

    return installProcess.exit
}

async function startDevServer(terminal) {
    const serverProcess = await webcontainersInstance.spawn('npm', ['run', 'start'])

    serverProcess.output.pipeTo(new WritableStream({
        write(data) {
            terminal.write(data)
        }
    }))

    webcontainersInstance.on('server-ready', (port, url) => {
        iframe.src = url
    })
}

async function writeIndexJS(file, content) {
    await webcontainersInstance.fs.writeFile(`/${file}`, content)
}

window.addEventListener('load', async () => {
    textarea.value = files['index.js'].file.contents

    textarea.addEventListener('input', (e) => {
        writeIndexJS('index.js', e.currentTarget.value)
    })

    const terminal = new Terminal({
        convertEol: true,
    })
    terminal.open(terminalElement)

    webcontainersInstance = await WebContainer.boot()
    await webcontainersInstance.mount(files)

    await installDependencies(terminal)

    startDevServer(terminal)

    console.log('Window is loaded')
})
