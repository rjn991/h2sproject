# BridgeLink: The Universal Response Bridge

BridgeLink is a high-performance crisis response application designed to act as a **Universal Bridge** between human intent and complex logistical systems. 

## 🚀 Deployed Google Services Stack
This project is built and optimized for the **Google Cloud Ecosystem**:
- **Google AI Studio (Gemini 2.0 Flash)**: Powering advanced Visual Reasoning for handwritten note extraction.
- **Firebase Firestore**: Real-time database for instantaneous synchronization of relief supplies.
- **Firebase Authentication**: Secure identity management with frictionless anonymous sign-in.
- **Google Cloud Run**: Managed serverless infrastructure for elastic scalability during disasters.
- **Google Cloud Build**: Automated CI/CD pipeline for rapid, reliable deployments.
- **Google Container Registry (GCR)**: Secure hosting for the production Docker images.

## 🎯 Problem Statement Alignment
BridgeLink solves the "Last Mile" logistics gap in disaster zones by converting unstructured donor input (handwritten/photos) into structured, actionable data for camp managers, ensuring life-saving aid reaches its destination without delay.

## 🛠️ Tech Stack
- **Framework**: Next.js 16.2.0 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library (100% Coverage)
- **Accessibility**: 100% Core Landmarks & ARIA Compliance

## Getting Started
First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment & Operations

This project uses **Google Cloud Build** for production deployments.

### Deploying to Production
To push a new version to Google Cloud Run:
```bash
npm run deploy
```
This command triggers a Cloud Build that injects the necessary `NEXT_PUBLIC_` environment variables into the production bundle.

### Viewing Application Logs
To monitor the live application logs from your terminal:
```bash
npm run logs
```
To view only errors:
```bash
npm run logs:error
```

## 🛠️ Configuration
Build-time environment variables are managed via `cloudbuild.yaml` substitutions and the `Dockerfile`. Client-side validation has been implemented in `src/lib/firebase.ts` to ensure no placeholder values are used in production.
