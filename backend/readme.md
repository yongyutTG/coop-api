coop-api backend
- npm init -y
- npm install express mssql dotenv cors
ข npm install express-rate-limit
- npm install --save-dev nodemon

backend/
├── src/
│   ├── modules/      
|       ├── member-full/   รวมทุก endpoin
│   │   │   ├── member-full.controller.js
│   │   │   ├── member-full.service.js
│   │   │   ├── member-full.repo.js
│   │   │   └── member-full.route.js
|   |   | 
│   │   ├── member/
│   │   │   ├── member.controller.js
│   │   │   ├── member.service.js
│   │   │   ├── member.repo.js
│   │   │   └── member.route.js
│   │   │
│   │   ├── loan/
│   │   │   ├── loan.controller.js
│   │   │   ├── loan.service.js
│   │   │   ├── loan.repo.js
│   │   │   └── loan.route.js
│   │   │
│   │   └── saving/
│   │       ├── saving.controller.js
│   │       ├── saving.service.js
│   │       ├── saving.repo.js
│   │       └── saving.route.js
│
│   ├── config/
│   │   └── db.js
│
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│
│   ├── utils/
│   │   └── logger.js
│
│   └── app.js
│
├── server.js
├── .env

api มีการกำหนด rate-limit  15 นาที ให้ req 1000 req
GET /api/members/038036/full  =รวมทั้งหมดทุก endpoin
แยก Endpoin
GET /api/members/038036
GET /api/members/038036/loans
GET /api/members/038036/savings
GET /api/members/038036/shr

โครงสร้างแบบ module-based architecture
ช่วยให้ระบบสามารถ scale, maintain และแยกความรับผิดชอบของแต่ละ layer ได้ชัดเจน
- Routes:
  จัดการ API endpoints และส่ง request ไปยัง controller
- Controllers:
  จัดการ request/response ระหว่าง client และ service
- Services:
  จัดการ business logic การคำนวณ และ workflow ของระบบ
- Repositories:
  จัดการการเข้าถึงฐานข้อมูลและ query ต่าง ๆ

Flow
Client
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
SQL Server


fornend
-
-