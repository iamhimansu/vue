export default class ArticleParser {
    constructor() {
        this.contents = null;
        this.renderedOutput = [];
        this.blockMaps =
            {
                paragraph: {
                    name: 'paragraph',
                    contentLocation: 'text',
                    render: (content) => {
                        return `<div class="mb-4 font-crimson text-gray-700 text-xl leading-8 font-normal">${content.text}</div>`;
                    }
                },
                code: {
                    name: 'code',
                    contentLocation: 'code',
                    render: (content) => {
                        return `<div class="relative bg-gray-100 min-h-200 font-inconsolata text-#41314e leading-6 text-sm border border-#f1f1f4 overflow-x-auto resize-y whitespace-pre p-4">${content.code}</div>`;
                    }
                },
                header: {
                    name: 'header',
                    contentLocation: 'text',
                    extraAttributes: ['level'],
                    render: (content) => {
                        return `<div class="py-3 px-0 mt-0 leading-5 outline-none">${content.text}</div>`;
                    }
                },
                nested: {
                    name: 'list',
                    contentLocation: 'items',
                    extraAttributes: [],
                    render: (content) => {
                        function generateNestedListHTML(item) {
                            const htmlArray = [];
                            htmlArray.push(`<li class="p-2">${item.content}`);

                            if (item.items.length > 0) {
                                htmlArray.push('<ul class=\'list-disc ml-4\'>');
                                item.items.forEach(subItem => {
                                    htmlArray.push(generateNestedListHTML(subItem));
                                });
                                htmlArray.push('</ul>');
                            }

                            htmlArray.push('</li>');
                            return htmlArray.join('');
                        }

                        return '<ul class="list-disc">' + generateNestedListHTML(content.items[0]) + '</ul>';
                    }
                }
            }
    }

    parse(contents) {
        try {
            this.contents = contents;
            /**
             * Iterate over the block contents
             */
            for (const block of this.contents.blocks) {
                if (typeof this.blockMaps[block.type] !== 'undefined') {
                    this.renderedOutput.push(this.blockMaps[block.type].render(block.data));
                }
            }
            return this.renderedOutput.join('');
        } catch (e) {
            console.log('Failed to parse contents: ', e);
            return '';
        }
    }
}