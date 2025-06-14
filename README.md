[ShortIt.postman_collection.json](https://github.com/user-attachments/files/20734483/ShortIt.postman_collection.json)
# 🌐 URL Shortener API

This is a full-stack URL shortener app that allows users to:
- Register/Login securely
- Shorten URLs with custom codes, expiry dates, and tags
- Track analytics (visits, devices, referrers, etc.)
- Filter URLs by tags

---

## 📦 Features

- JWT-based Authentication
- URL Shortening with customizable options
- URL Visit Analytics (device, referrer, timestamp)
- Tag-based Filtering

---

## 🚀 How to Run Locally

### 📌 Backend Setup (Node.js + Express + MongoDB)

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd <repo-folder>/backend
2. **Install dependencies**
    npm install
3. **Create .env file**
   PORT=3000
MONGO_URI=mongodb://localhost:27017/shortener
JWT_SECRET=your_jwt_secret_key
4. **Run backend**
   npm run dev
   or
   node server.js

## 💻 Frontend Setup (React + Vite)
1. **Go to the frontend directory:**
   cd ../frontend
2. **Install dependencies:**
   npm install
3. **Start the dev server:**
   npm run dev

## 📮 API Endpoints & Examples
**✅ Register User**
POST /api/register
Request:
{
  "username": "ayush1234",
  "password": "1234",
  "confirmPassword": "1234"
}
Response:
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "684c87cb6fc2e9d6700bc305",
    "username": "ayush1234"
  }
}

**🔑 Login**
POST /api/login
Request:
{
  "username": "ayush1234",
  "password": "1234"
}
Response:
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "684c87cb6fc2e9d6700bc305",
    "username": "ayush1234"
  }
}
**🔗 Shorten URL**
POST /api/shorten
Request:
{
  "originalUrl": "http://localhost:3000",
  "customCode": "custom100",
  "expiry": "2025-07-13T12:50:06.630Z",
  "tags": ["marketing", "social"]
}
Response:
{
  "message": "Short URL created successfully.",
  "shortUrl": "http://localhost:3000/custom100",
  "shortCode": "custom100"
}
## 📊 View Analytics (All URLs of User)
POST /api/analytics
Request:
{
  "userid": "684c87cb6fc2e9d6700bc305"
}
Response:
[
  {
    "originalUrl": "http://localhost:3000",
    "shortCode": "custom100",
    "totalVisits": 0,
    "uniqueVisitors": 0,
    "tags": ["marketing", "social"],
    "deviceTypeBreakdown": {},
    "referrers": [],
    "timeSeries": {}
  }
]

## 📁 Get URLs by Tag
GET /api/tags/:tag
Response:
{
  "count": 5,
  "urls": [
    {
      "shortCode": "custom100",
      "shortUrl": "http://localhost:3000/custom100",
      "originalUrl": "http://localhost:3000",
      "totalVisits": 1,
      "uniqueVisitors": 1,
      "tags": ["marketing", "social"]
    }
  ]
}

## 🔍 URL Redirection
GET /:shortCode
Redirects to original URL and tracks analytics.

## 📈 Per-URL Analytics
GET /api/analytics/:shortCode
Response:
{
  "originalUrl": "http://localhost:3000",
  "shortCode": "custom100",
  "totalVisits": 1,
  "uniqueVisitors": 1,
  "tags": ["marketing", "social"],
  "deviceTypeBreakdown": { "desktop": 1 },
  "referrers": [{ "referrer": "direct", "count": 1 }],
  "timeSeries": { "2025-06-13": 1 }
}

**👨‍💻 Tech Stack**
Backend: Node.js, Express, MongoDB, JWT
Frontend: React, Vite[Uploading ShortIt.postman_collection.json…]()

Dev Tools: Postman, VSCode, MongoDB Compass

**📬 Postman Collection**
1. Open Postman
2. Click on Import
3. Select Raw Text and paste the content from postman_collection.json
4. Alternatively, save exported JSON as postman_collection.json and import the file.

**📄 License**
MIT License

