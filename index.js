import {WebContainer} from '@webcontainer/api'
import {files} from "./files"

const iframe = document.querySelector('iframe')
const textarea = document.querySelector('textarea')

let webcontainersInstance

window.addEventListener('load', async () => {
    textarea.value = files['index.js'].file.contents

    console.log('Window is loaded')
})
