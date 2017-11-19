import {window, commands, workspace, StatusBarItem, StatusBarAlignment} from 'vscode'; // Import VS Code
import * as child_process from 'child_process';
var statusItem: StatusBarItem;

export function activate() {
     
    if (!statusItem)
    {
        let config = workspace.getConfiguration("openShell");
        let statusBarText = config.get("text") as string;

        statusItem = window.createStatusBarItem(StatusBarAlignment.Left);
        statusItem.text = statusBarText;
        statusItem.command = 'extension.openShell';
        statusItem.show();
    }

	commands.registerCommand('extension.openShell', () => openShell());
}

function openShell()
{
    let config = workspace.getConfiguration("openShell");
    let shellPath = config.get("shell") as string;
    let defaultDir = config.get("defaultDir") as string;
    let rootPath = workspace.rootPath != null ? workspace.rootPath : defaultDir;

    let command = formatCommand(shellPath, rootPath);
    child_process.exec(command);
}

export function deactivate() {

    // Clean up
    if (statusItem) {
        statusItem.dispose();
        statusItem = null;
    }
}

function formatCommand(shellPath: string, rootPath: string): string {
    return shellPath.replace('%path%', rootPath);
}