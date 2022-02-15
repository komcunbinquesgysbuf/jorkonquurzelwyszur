const {defaults} = require("lodash");
const traverse = require("traverse");
const defaultPluginOptions = {
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
