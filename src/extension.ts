import * as vscode from 'vscode';
import { ComponentPanel } from './ComponentPanel';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('fluttercomponents.createComponent', () => {
			ComponentPanel.createOrShow(context.extensionUri);
		})
	);
}

export function deactivate() {}
