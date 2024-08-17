const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    const win = BrowserWindow.getFocusedWindow();
            
    win.webContents.on('did-finish-load', () => {

        win.webContents.executeJavaScript(`
    const version = '0.1.0';

    document.querySelector('.socials .pull-right').innerHTML += \`
    <span class="footer-hr">|</span> <span class="footer-link">Modded version: Dyslexic Mode \${version}</span></div>
    \`;
    
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }


    function getCellAt (x, y) {
        return document.getElementById(\`cell_\${x}_\${y}\`);
    }

    function getAdjacentCellsAt (x, y) {
        return [
            getCellAt(x-1, y-1),
            getCellAt(x, y-1),
            getCellAt(x+1, y-1),

            getCellAt(x-1, y),
            getCellAt(x+1, y),

            getCellAt(x-1, y+1),
            getCellAt(x, y+1),
            getCellAt(x+1, y+1),
        ].filter(f => f);
    }

    function getCellCoordinates (cell) {
        return [Number(cell.getAttribute('data-x')), Number(cell.getAttribute('data-y'))]
    }

    function getCellValue (cell) {
        if (!cell) return;

        if (cell.classList.contains('hdd_type0')) return 0;
        if (cell.classList.contains('hdd_type1')) return 1;
        if (cell.classList.contains('hdd_type2')) return 2;
        if (cell.classList.contains('hdd_type3')) return 3;
        if (cell.classList.contains('hdd_type4')) return 4;
        if (cell.classList.contains('hdd_type5')) return 5;
        if (cell.classList.contains('hdd_type6')) return 6;
        if (cell.classList.contains('hdd_type7')) return 7;
        if (cell.classList.contains('hdd_type8')) return 8;

        return -1;
    }

    function isCellFlagged (cell) {
        if (!cell) return false;
        return cell.classList.contains('hdd_flag');
    }

    function isCellOpened (cell) {
        if (!cell) return false;
        return cell.classList.contains('hdd_opened');
    }

    function getCellMatchValueAt (x, y) {
        const adjacentCells = getAdjacentCellsAt(x, y);
        const targetCell = getCellAt(x, y);

        const adjacentFlags = adjacentCells.filter(f => isCellFlagged(f));
        const cellValue = getCellValue(targetCell);
        const flagsValue = adjacentFlags.length;

        if (flagsValue < cellValue) return -1;
        if (flagsValue > cellValue) return 1;
        return 0;
    }

    function getAllCells () {
        return document.querySelectorAll('.cell')
    }


    function highlightCellsByMatchValue () {
        getAllCells().forEach(cell => {
            if (!isCellOpened(cell) || getCellValue(cell) == 0) {
                cell.style.boxShadow = '';
                return;
            }

            const coords = getCellCoordinates(cell);
            const matchValue = getCellMatchValueAt(...coords);


            if (matchValue == 0) cell.style.boxShadow = '0 0 50px rgba(0, 200, 50, .1) inset'; // green to indicate match
            else if (matchValue == 1) cell.style.boxShadow = '0 0 50px rgba(200, 0, 50, .2) inset'; // red to indicate overflow
            else cell.style.boxShadow = '';
        });
    }

    waitForElm('#AreaBlock').then(areaBlock => {
        highlightCellsByMatchValue();
        areaBlock.addEventListener('mouseup', () => highlightCellsByMatchValue());
    });
      
        `);

    });
});