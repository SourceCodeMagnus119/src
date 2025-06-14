const information = document.getElementById('info');
information.innerText = `This app is using chrome (v${version.chrome()})`
// console.log(information);

// Send a test message to the main process from the renderer process.
const yinYang = async() => {
    const response = await window.versions.ping();
    console.log(response)
}

yinYang();