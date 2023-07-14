import * as _vscode from "vscode";

declare global {
	const webVscode: {
		postMessage: ({
			type: string,
			value: any
		}) => void;
	}
}