# code-doc-generator

code-doc-generator is an npm package that automatically generates documentation from code comments. It supports multiple programming languages and generates documentation in various formats such as HTML, Markdown, or PDF.

## Installation

You can install code-doc-generator using npm:

```bash
npm install code-doc-generator

-------------------------------------------------

## Usages

const generateDocumentation = require('code-doc-generator');

// Specify the input directory containing your code files
const inputDir = 'path/to/your/code/files';

// Specify the output directory where you want the documentation to be saved
const outputDir = 'path/to/output/directory';

// Generate documentation
generateDocumentation(inputDir, outputDir);
