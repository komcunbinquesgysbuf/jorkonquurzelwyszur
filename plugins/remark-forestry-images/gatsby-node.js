const {readdir, readFile, stat, writeFile} = require('fs/promises');
const {defaults} = require("lodash");
const traverse = require("traverse");
const defaultPluginOptions = {
    changeFiles: false,
    replaceIn: 'src/pages',
    virtual: 'ckzo0tv38000lpj86987r3w9h',
    physical: 'src/images',
};
exports.onCreateNode = ({node}, pluginOptions) => {
    const {physical, virtual} = defaults(pluginOptions, defaultPluginOptions);
    const regex = new RegExp(`^/${virtual}/`, 'g');
    const basePath = process.cwd();
    if (node.internal.type === `MarkdownRemark`) {
        traverse(node.frontmatter).forEach(function (value) {
            if (typeof value === 'string' && value.match(regex)) {
                this.update(
                    value.replace(
                        regex,
                        '../'.repeat(node.fileAbsolutePath.replace(basePath, '.').split('/').length - 2) + `${physical}/`
                    )
                );
            }
        });
    }
};
exports.onPreBootstrap = (_, pluginOptions) => {
    const {changeFiles, replaceIn, physical, virtual} = defaults(pluginOptions, defaultPluginOptions);
    const findMarkdownFiles = path => readdir(path)
        .then(files => Promise.all(files.map(f => [path, f].join('/')).map(p => stat(p)
            .then(s => s.isFile() && p.match(/\.md$/) ? [p] : (s.isDirectory() ? findMarkdownFiles(p) : []))
        )))
        .then(arrays => arrays.flat())
    ;
    const replaceAbsolutePathsinMarkdownFiles = (basePath, physical, virtual) => {
        const regex = new RegExp(`/${virtual}/`, 'g');
        return findMarkdownFiles(basePath).then(files => Promise.all(
            files.map(file => readFile(file, {encoding: 'UTF-8'}).then(data =>
                    data.match(regex)
                    && writeFile(
                        file,
                        data.replace(
                            regex,
                            '../'.repeat(file.replace(process.cwd(), '.').split('/').length - 2) + `${physical}/`
                        )
                    )
            ))
        ));
    };
    if (changeFiles) {
        return replaceAbsolutePathsinMarkdownFiles(`${process.cwd()}/${replaceIn}`, physical, virtual);
    }
};
