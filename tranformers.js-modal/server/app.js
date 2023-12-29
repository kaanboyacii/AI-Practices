import http from 'http';
import querystring from 'querystring';
import url from 'url';

import { pipeline, env } from '@xenova/transformers';

class MyClassificationPipeline {
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

const server = http.createServer();
const hostname = '172.20.160.1';
const port = 3000;

server.on('request', async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const { text } = querystring.parse(parsedUrl.query);
  res.setHeader('Content-Type', 'application/json');
  let response;
  if (parsedUrl.pathname === '/classify' && text) {
    const classifier = await MyClassificationPipeline.getInstance();
    response = await classifier(text);
    res.statusCode = 200;
  } else {
    response = { 'error': 'Bad request' }
    res.statusCode = 400;
  }
  res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
