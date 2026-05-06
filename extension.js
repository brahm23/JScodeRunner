const vscode = require('vscode');

function activate(context) {

    let disposable = vscode.commands.registerCommand(
        'jscode-runner.runJSFile',
        function () {

            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                vscode.window.showErrorMessage('No active file open');
                return;
            }

            const filePath = editor.document.fileName;

            if (!filePath.endsWith('.js')) {
                vscode.window.showErrorMessage('Please open a JavaScript file');
                return;
            }

            // Save file before running
            editor.document.save();

            // Create terminal
            const terminal = vscode.window.createTerminal('JS Code Runner');

            terminal.show();

            // Run JS file
            terminal.sendText(`node "${filePath}"`);
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};