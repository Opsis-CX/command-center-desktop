const { app, BrowserWindow, shell } = require('electron')

const APP_URL = process.env.CC_URL || 'https://app.opsiscx.com'
let win = null

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    title: 'Command Center',
    backgroundColor: '#0b0b0f',
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  })
  win.loadURL(APP_URL)
  win.webContents.setWindowOpenHandler(({ url }) => {
    try { if (new URL(url).host === new URL(APP_URL).host) return { action: 'allow' } } catch (e) {}
    shell.openExternal(url)
    return { action: 'deny' }
  })
  win.on('closed', () => { win = null })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
