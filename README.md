# Apex Providers Platform

A comprehensive multi-tenant SaaS platform for Education, Healthcare, and Manufacturing verticals.

## 🎯 Overview

Apex Providers is a production-grade SaaS platform built in two phases:

- **Version 4.0**: Multi-tier administrative architecture for each vertical
- **Version 5.0**: Multi-tenant management with centralized super-admin system

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: NestJS + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT + RBAC
- **Monorepo**: Nx Workspace
- **Testing**: Jest + Playwright

### Project Structure

```
apex-providers/
├── apps/
│   ├── api/                    # NestJS backend API
│   ├── admin-super/            # Super Admin Dashboard (v5.0)
│   ├── admin-education/        # Education Admin Portal (v4.0)
│   ├── admin-healthcare/       # Healthcare Admin Portal (v4.0)
│   └── admin-manufacturing/    # Manufacturing Admin Portal (v4.0)
├── libs/
│   ├── ui-components/          # Shared UI component library
│   ├── shared-types/           # TypeScript type definitions
│   └── auth/                   # Authentication utilities
└── prisma/
    └── schema.prisma           # Database schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- PostgreSQL 14+
- npm 10.x

### Installation

1. **Clone and install dependencies**:
```bash
cd apex-providers
npm install
```

2. **Setup environment variables**:
```bash
cd apps/api
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

3. **Initialize database**:
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

4. **Start development servers**:
```bash
# Start API server (http://localhost:3000)
npx nx serve api

# Start Super Admin dashboard (http://localhost:4200)
npx nx serve admin-super

# Start Education Admin (http://localhost:4201)
npx nx serve admin-education

# Start Healthcare Admin (http://localhost:4202)
npx nx serve admin-healthcare

# Start Manufacturing Admin (http://localhost:4203)
npx nx serve admin-manufacturing
```

## 🎨 Design System

### Apex Brand Palette

| Name | Hex | Usage |
|------|-----|-------|
| Apex Deep Blue | `#0F2B5B` | Primary actions & navigation |
| Quantum Teal | `#00A3B5` | Secondary actions & highlights |
| Neutral White | `#FFFFFF` | Backgrounds |
| Charcoal Gray | `#2D3436` | Body text |
| Light Gray | `#F8F9FA` | Secondary backgrounds |

### Vertical-Specific Colors

**Education**: Authority Purple, Academic Gold, Student Green
**Healthcare**: Healthcare Red, Clinical White, Doctor Blue
**Manufacturing**: Industrial Gray, Production Blue, Quality Green

## 📊 Features

### Version 4.0 - Administrative Architecture

#### Education Vertical
- School Owner Portal
- Principal/Headmaster Dashboard
- Department Head Management
- Vice Principal (Student Affairs)
- Operations Manager Portal

#### Healthcare Vertical
- Hospital CEO Dashboard
- Medical Director Portal
- Department Chief Management
- Nursing Supervisor Dashboard
- Patient Care Administrator

#### Manufacturing Vertical
- Plant Manager Dashboard
- Production Manager Portal
- Quality Manager System
- Maintenance Manager Dashboard
- Shift Supervisor Portal

### Version 5.0 - Super Admin Platform

- **Organization Management**: Multi-tenant organization control
- **Billing & Subscriptions**: Stripe integration, plan management
- **Analytics & Reporting**: Platform-wide metrics and insights
- **Security & Compliance**: GDPR, HIPAA, SOC 2 compliance
- **Support & Customer Success**: Ticket management, health scoring

## 🔐 Role-Based Access Control

### Role Hierarchy

```
Super Admin (Platform Level)
└── Organization Owner
    └── Vertical Administrator
        └── Department Administrator
            └── Team Administrator
                └── End User
```

### Permissions

- **Super Admin**: Full platform access
- **Organization Owner**: Complete organization control
- **Vertical Admin**: Vertical-specific management
- **Department Admin**: Department-level oversight
- **Team Admin**: Team management
- **End User**: Limited access based on role

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

All API requests require JWT authentication:

```bash
POST /auth/login
POST /auth/register
GET /auth/me
```

### Organizations

```bash
GET    /organizations
POST   /organizations
GET    /organizations/:id
PATCH  /organizations/:id
DELETE /organizations/:id
```

### Education Vertical

```bash
GET    /education/students
POST   /education/students
GET    /education/teachers
POST   /education/teachers
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
nx test api

# Run e2e tests
nx e2e admin-super-e2e
```

## 🐳 Docker Deployment

```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📝 Database Schema

The platform uses a comprehensive Prisma schema with:

- **Core Models**: Organization, User, Subscription, Invoice
- **Education Models**: Student, Teacher, Course, Class, Grade
- **Healthcare Models**: Patient, Doctor, Appointment, MedicalRecord
- **Manufacturing Models**: Worker, Equipment, ProductionLine, QualityInspection

## 🔧 Development

### Code Generation

```bash
# Generate new module
npx nx g @nx/nest:module <module-name>

# Generate new React component
npx nx g @nx/react:component <component-name>
```

### Linting

```bash
# Lint all projects
nx run-many --target=lint --all

# Fix linting issues
nx run-many --target=lint --all --fix
```

## 📦 Build for Production

```bash
# Build all apps
nx run-many --target=build --all --configuration=production

# Build specific app
nx build api --configuration=production
nx build admin-super --configuration=production
```

## 🤝 Contributing

This is a proprietary project. Internal contributions follow the standard Git workflow:

1. Create feature branch
2. Make changes
3. Submit pull request
4. Code review
5. Merge to main

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For support, contact: support@apexproviders.com

---

Built with ❤️ by the Apex Providers Team
