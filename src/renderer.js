const { ipcRenderer } = require("electron");

document.addEventListener('DOMContentLoaded', (e) => {
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

        // Add custom menu items
        menu.innerHTML = `
            <div id="custom-menu-copy" style="padding:4px;cursor:pointer;">Copy</div>
            <div id="custom-menu-paste" style="padding:4px;cursor:pointer;">Paste</div>
            <div id="custom-menu-item" style="padding:4px;cursor:pointer;">Custom Menu Item</div>
        `;

        menu.addEventListener('click', (e) => {
            if (e.target.id === 'custom-menu-copy') {
                document.execCommand('copy');
            } else if (e.target.id === 'custom-menu-paste') {
                document.execCommand('paste');
            } else if (e.target.id === 'custom-menu-item') {
                alert('Custom menu item clicked!');
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

    /**
     * @param {ON_PLAY_PictureInPicture}
     */
    window.addEventListener('beforeinput', () => {
        event.preventDefault();

        const pip = document.getElementById('picture-in-picture-window');

        // if(input.control && input.key.toLowerCase() === 'p') {
        //     window.open(pip)
        // } else {
        //     throw new Error('Error Activating picture in picture', err);
        // }
    })

    /**
     * @param {DETECT_LIGHT_DARK_MODE_BY_USER_PREFERENCE}
     */
    window.matchMedia('(prefers-color-mode: dark)').matches

    /**
     * @param {NETWORK_SECURITY_LOYALTY}
     */
    ipLock.addEventListener("click", (e) => {
        event.preventDefault();

        const networkToggler = document.createElement('network-toogler');
        networkToggler.style.position = 'fixed';
        networkToggler.style.top = `${e.clientY}px`;
        networkToggler.style.left = `${e.clientX}px`;
        networkToggler.style.background = '#fff';
        
        networkToggler.addEventListener('click', (e) => {
            if(e === false) {
                // Deactivate main process logic.
            } else {
                // Once we click the ip Lock/Unlock toggle: Activate main process logic.
                ipcRenderer.send('network-toggler')
            }
        })
    })

    const ipLock = Window.SyffAPI.IpLock();
    console.log(ipLock);

    /**
     * @param {GLOBAL_SEACH_INDEX - SEARCH BAR}
     * @description A Stack stores all global website url with their titles. Once a user inputs a url or websites name. The algorithm then cross references or matches the input value to the global index and calls axios to fetch the specified url path.
     * @architecture INPUT > STACK(Global Website index)> Cross-Reference-Check & Inpput match > Axios > Output
     */

    window.addEventListener('DOMContentLoaded', (e) => {
        /**
         * @param {COPYRIGHT}
         */
    })

    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");

    searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
    });
});