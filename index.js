import {WebContainer} from '@webcontainer/api'
import {files} from "./files"

const iframe = document.querySelector('iframe')
const textarea = document.querySelector('textarea')

let webcontainersInstance

async function installDependencies() {
    const installProcess = await webcontainersInstance.spawn('npm', ['install'])

    installProcess.output.pipeTo(new WritableStream({
        write(data) {
           console.log(data)
        }
    }))

    return installProcess.exit
}

async function startDevServer() {
    const serverProcess = await webcontainersInstance.spawn('npm', ['run', 'start'])

    serverProcess.output.pipeTo(new WritableStream({
          write(data) {
              console.log(data)
          }
      }))

    webcontainersInstance.on('server-ready', (port, url) => {
        console.log(port, url)
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

    webcontainersInstance = await WebContainer.boot()
    await webcontainersInstance.mount(files)

    await installDependencies()

    startDevServer()

    console.log('Window is loaded')
})
