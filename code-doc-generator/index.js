// index.js
const fs = require('fs');
const path = require('path');
const commentParser = require('comment-parser');
const MarkdownIt = require('markdown-it');
const markdownPdf = require('markdown-pdf');

// Function to generate documentation from code comments
function generateDocumentation(inputDir, outputDir) {
    // Read files from input directory
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading input directory:', err);
            return;
        }

        // Process each file
        files.forEach(file => {
            const filePath = path.join(inputDir, file);

            // Parse comments from file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                // Extract documentation from comments
                const comments = commentParser(data);

                // Convert comments to Markdown format
                const markdown = comments.map(comment => commentToMarkdown(comment)).join('\n');

                // Write Markdown documentation to output directory
                const markdownFilePath = path.join(outputDir, `${file}.md`);
                fs.writeFile(markdownFilePath, markdown, 'utf8', err => {
                    if (err) {
                        console.error('Error writing Markdown file:', err);
                        return;
                    }

                    console.log(`Documentation generated: ${markdownFilePath}`);

                    // Convert Markdown to PDF
                    const pdfFilePath = path.join(outputDir, `${file}.pdf`);
                    markdownPdf().from(markdownFilePath).to(pdfFilePath, () => {
                        console.log(`PDF documentation generated: ${pdfFilePath}`);
                    });
                });
            });
        });
    });
}

// Function to convert comment object to Markdown format
function commentToMarkdown(comment) {
    const md = new MarkdownIt();
    let markdown = '';

    markdown += `## ${comment.tags[0].name}\n\n`; // Use first tag as heading

    // Add description
    markdown += `${comment.description}\n\n`;

    // Add tags
    comment.tags.forEach(tag => {
        markdown += `**${tag.tag}**: ${tag.name}\n\n`;
    });

    return md.render(markdown);
}

module.exports = generateDocumentation;
