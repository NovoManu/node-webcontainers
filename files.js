export const files = {
  "index.js": {
    "file": {
      "contents": "import express from 'express';\nconst app = express();\nconst port = 3111;\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(port, () => {\n  console.log(`The application can be accessed at http://localhost:${port}, as it is now live.`);\n});\n"
    }
  },
  "package.json": {
    "file": {
      "contents": "{\n  \"name\": \"example-app\",\n  \"type\": \"module\",\n  \"dependencies\": {\n    \"express\": \"latest\",\n    \"nodemon\": \"latest\"\n  },\n  \"scripts\": {\n    \"start\": \"nodemon --watch './' index.js\"\n  }\n}\n"
    }
  }
}