import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
