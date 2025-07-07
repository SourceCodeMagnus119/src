// const information = document.getElementById('info');
// information.innerText = `This app is using chrome (v${version.chrome()})`
// console.log(information);

const yinYang = async() => {
    const response = await window.versions.ping();
    console.log(`This is the result of the two-way IPC massage from the renderer process: ${response}`)
}
yinYang();