var vscode = require("vscode");
var loremIpsum = require("./kwephyoIpsum");

function activate(context) {
  var commands = [
    vscode.commands.registerCommand("kwee-phyo-ipsum.line", generateLine),
    vscode.commands.registerCommand("kwee-phyo-ipsum.paragraph", generateParagraph),
    vscode.commands.registerCommand(
      "kwee-phyo-ipsum.multipleParagraphs",
      generateMultipleParagraphs
    ),
    vscode.commands.registerCommand(
      "kwee-phyo-ipsum.multipleLines",
      generateMultipleLines
    )
  ];

  commands.forEach(function(command) {
    context.subscriptions.push(command);
  });
}

function insertText(lorem) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(edit =>
    editor.selections.forEach(selection => {
      edit.delete(selection);
      edit.insert(selection.start, loremIpsum(lorem));
    })
  );
}

function generateLine() {
  insertText({
    count: 1,
    unit: "sentences",
    random: true
  });
}

function generateParagraph() {
  insertText({
    count: 1,
    unit: "paragraphs",
    random: true
  });
}

async function generateMultipleParagraphs() {
  const items = [];
  for (let i = 2; i <= 10; i++) {
    items.push(i.toString());
  }

  const count = await vscode.window.showQuickPick(items, {
    placeHolder: "How many paragraphs?"
  });
  if (!count) {
    return;
  }

  insertText({
    count: Number.parseInt(count),
    unit: "paragraphs"
  });
}

async function generateMultipleLines() {
  const items = [];
  for (let i = 2; i <= 10; i++) {
    items.push(i.toString());
  }

  const count = await vscode.window.showQuickPick(items, {
    placeHolder: "How many lines?"
  });
  if (!count) {
    return;
  }

  insertText({
    count: Number.parseInt(count),
    unit: "sentences"
  });
}

exports.activate = activate;
