import {window, commands, workspace, ExtensionContext, StatusBarItem, StatusBarAlignment} from 'vscode'; // Import VS Code
import * as child_process from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
	// Register Commands
	commands.registerCommand('extension.openShell', () => openShell());
}

function openShell()
{
    let config = workspace.getConfiguration("openShell");
    let shellPath = config.get("shell") as string;
    let rootPath = workspace.rootPath != null ? workspace.rootPath : "C:\\";
    //let rootPath = "E:\\GitHub\\open-shell";

    let command = formatCommand(shellPath, rootPath);
    child_process.exec(command);
}

function formatCommand(shellPath: string, rootPath: string): string {
    return shellPath
        .replace('%path%', rootPath)
        .replace('%description%', 'ConsoleZ');
}