const gui = require("nw.gui");
const DiscordRPC = require('discord-rpc');
const DiscordIntegration = new DiscordRPC.Client({transport: "ipc"})
const clientId = '694977435522957353';
let gameWindow = null;
function createGameWindow() {
    gui.Window.open("https://miniroyale2.io", { "inject_js_start" : "app/load.js", "show" : false }, win => {
        gameWindow = win;
        gameWindow.enterFullscreen();
        gameWindow.on("enter-fullscreen", () => {
            gameWindow.show();
        });
    });
}
function initRPC() {
    gameWindow.window.console.log("Start Discord Integration");
    DiscordIntegration.login({clientId}).catch(console.error);
    DiscordIntegration.on("ready", () => {
        DiscordIntegration.setActivity({smallImageKey: "main"});
        gameWindow.window.console.log('Discord Integrated')
    });
}
setTimeout(initRPC, 3000)
createGameWindow();
let F5 = {
    key : "F5",
    active : function() {
        gameWindow.reload();
    }
},
F11 = {
    key : "F11",
    active :function() {
        gameWindow.toggleFullscreen();
    } 
}
let shortcutF5 = new gui.Shortcut(F5), shortcutF11 = new gui.Shortcut(F11);
gui.App.registerGlobalHotKey(shortcutF5);
gui.App.registerGlobalHotKey(shortcutF11);