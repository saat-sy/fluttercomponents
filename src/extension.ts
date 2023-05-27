import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('fluttercomponents.helloWorld', () => {
			vscode.window.showInformationMessage('Hello World from FlutterComponents!');
		})
	);
}

export function deactivate() {}
