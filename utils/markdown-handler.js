const marked = require('marked')
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);


function parseMarkdown(value){
  return dompurify.sanitize(marked.parse(value));
}

module.exports = parseMarkdown;