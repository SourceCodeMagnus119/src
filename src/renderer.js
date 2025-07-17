// const information = document.getElementById('info');
// information.innerText = `This app is using chrome (v${version.chrome()})`
// console.log(information);

async function yinYang() {
    const response = await window.versions.ping();
    console.log(`This is the result of the two-way IPC massage from the renderer process: ${response}`)
}
yinYang();

/**
 * @param {RIGHT CLICK SUPPORT}
 */
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.style.background = '#fff';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '8px';
    menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    menu.style.zIndex = 1000;
    menu.innerHTML = '<div id="custom-menu-item">Custom Menu Item</div>';

    // Remove any existing custom menu
    document.querySelectorAll('.custom-context-menu').forEach(el => el.remove());
    menu.classList.add('custom-context-menu');

    menu.addEventListener('click', (e) => {
        if (e.target.id === 'custom-menu-item') {
            alert('Custom menu item clicked!');
        }
        if (e.target.id === 'Cut') {
            const selection = window.getSelection();
            if (selection && selection.toString()) {
                navigator.clipboard.writeText(selection.toString());
                const range = selection.getRangeAt(0);
                range.deleteContents();
                alert('Content Cut');
            }
        }
        if (e.target.id === 'Copy') {
            const selection = window.getSelection();
            if (selection && selection.toString()) {
                navigator.clipboard.writeText(selection.toString());
                alert('Content Copied');
            }
            if (e.target.id === 'Paste') {
                navigator.clipboard.readText().then(text => {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                        selection.deleteFromDocument();
                        selection.getRangeAt(0).insertNode(document.createTextNode(text));
                    }
                });
            }
        }
        menu.remove();
    });

    document.body.appendChild(menu);

    // Remove menu on next click
    document.addEventListener('click', function handler() {
        menu.remove();
        document.removeEventListener('click', handler);
    }, { once: true });
    console.log('Right click detected!');
});