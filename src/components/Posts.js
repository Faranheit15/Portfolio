// Source: https://github.com/sanfrancesco/create-react-app-blog/blob/master/source/index.js
// Jekyl style blog

import "github-markdown-css";

const Posts = () => {
  var webpackRequireContext = require.context(
    "!markdown-with-front-matter-loader!../posts",
    false,
    /\.md$/
  );

  return webpackRequireContext
    .keys()
    .sort()
    .reverse()
    .reduce((memo, fileName) => {
      const frontMatterMarkdown = webpackRequireContext(fileName);
      // eslint-disable-next-line
      fileName = fileName.match(/\.\/([^\.]+)\.*/)[1];
      let tokenizedFilename = fileName.match(/^(\d{4}-\d{2}-\d{2})(.*)/);
      if (!tokenizedFilename && !tokenizedFilename[1])
        throw new Error("no ^YYYY-MM-DD date in blog filename");

      const date = tokenizedFilename[1];
      const name = tokenizedFilename[0];

      return memo.set(name, Object.assign({ date: date }, frontMatterMarkdown));
    }, new Map());
};

export default Posts;