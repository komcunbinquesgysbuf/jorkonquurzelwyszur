const {readdir, readFile, stat, writeFile} = require('fs/promises');
const {flatten} = require("lodash");
const findMarkdownFiles = path => readdir(path)
    .then(files => Promise.all(files.map(f => [path, f].join('/')).map(p => stat(p)
        .then(s => s.isFile() && p.match(/\.md$/) ? [p] : (s.isDirectory() ? findMarkdownFiles(p) : []))
    )))
    .then(arrays => arrays.flat())
;
const replaceAbsolutePathsinMarkdownFiles = basePath => findMarkdownFiles(basePath).then(files => Promise.all(
    files.map(file => readFile(file, {encoding: 'UTF-8'}).then(data =>
        data.match(/\/ckzmnri0c000ipj862t51ivd1\//) && writeFile(
            file,
            data.replace(
                /\/ckzmnri0c000ipj862t51ivd1\//g,
                '../'.repeat(file.replace(basePath, '.').split('/').length - 1) + 'images/'
            )
        )
    ))
));
replaceAbsolutePathsinMarkdownFiles(process.cwd() + '/src/pages');
