const information = document.getElementById('info');
information.innerText = `This app is using chrome (v${version.chrome()})`

const yinYang = async() => {
    const response = await window.versions.ping();
    console.log(response)
}

yinYang();