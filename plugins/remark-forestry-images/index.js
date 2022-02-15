const {defaults} = require("lodash");
const visit = require("unist-util-visit");
const defaultPluginOptions = {
    virtual: 'ckzo0tv38000lpj86987r3w9h',
    physical: 'src/images',
};
module.exports = ({files, markdownNode, markdownAST}, pluginOptions) => {
    const {physical, virtual} = defaults(pluginOptions, defaultPluginOptions);
    const regex = new RegExp(`^/${virtual}/`, 'g');
    const basePath = process.cwd();
    visit(markdownAST, 'image', (node) => {
        if (typeof node.url === 'string' && node.url.match(regex))
            node.url = node.url.replace(
                regex,
                '../'.repeat(markdownNode.fileAbsolutePath.replace(basePath, '.').split('/').length - 2) + `${physical}/`
            );
    })
};
