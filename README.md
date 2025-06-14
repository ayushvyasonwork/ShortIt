[ShortIt.postman_collection.json](https://github.com/user-attachments/files/20734483/ShortIt.postman_collection.json)# 🌐 URL Shortener API

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

here is the full postman_collection.json code for copying:
{
	"info": {
		"_postman_id": "eaa66ea1-695c-41bb-a93b-919da3344870",
		"name": "ShortIt",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "39248100"
	},
	"item": [
		{
			"name": "analyticsRoutes.js",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"originalUrl\": \"http://localhost:3000\",\r\n  \"customCode\": \"custom100\",               // Optional\r\n  \"expiry\": \"2025-07-13T12:50:06.630Z\",        // Optional\r\n  \"tags\": [\"marketing\", \"social\"]          // Optional\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{BASE_URL}}api/shorten",
					"host": [
						"{{BASE_URL}}api"
					],
					"path": [
						"shorten"
					]
				}
			},
			"response": []
		},
		{
			"name": "find tag",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{BASE_URL}}api/tags/marketing",
					"host": [
						"{{BASE_URL}}api"
					],
					"path": [
						"tags",
						"marketing"
					]
				}
			},
			"response": []
		},
		{
			"name": "all analytics",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userid\":\"684c87cb6fc2e9d6700bc305\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{BASE_URL}}api/analytics",
					"host": [
						"{{BASE_URL}}api"
					],
					"path": [
						"analytics"
					]
				}
			},
			"response": []
		},
		{
			"name": "redirect",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{BASE_URL}}custom11",
					"host": [
						"{{BASE_URL}}custom11"
					]
				}
			},
			"response": []
		},
		{
			"name": "login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"username\":\"ayush1234\",\r\n    \"password\":\"1234\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{BASE_URL}}api/login",
					"host": [
						"{{BASE_URL}}api"
					],
					"path": [
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "register",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "code analytics",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userid\":\"684c87cb6fc2e9d6700bc305\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{BASE_URL}}api/analytics/custom100",
					"host": [
						"{{BASE_URL}}api"
					],
					"path": [
						"analytics",
						"custom100"
					]
				}
			},
			"response": []
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": [
			{
				"key": "token",
				"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGM4N2NiNmZjMmU5ZDY3MDBiYzMwNSIsImlhdCI6MTc0OTg0NjA2MiwiZXhwIjoxNzUwNDUwODYyfQ.c6mrFuMjhMIxPWPUTp6_2t0cpe3r27amLw0wUP1f-fA",
				"type": "string"
			}
		]
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"packages": {},
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"packages": {},
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "BASE_URL",
			"value": "http://localhost:3000/",
			"type": "string"
		}
	]
}
   


**📄 License**
MIT License

