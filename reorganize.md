# File Reorganization Plan

This document describes the reorganization to move all source files into a `src/` folder.

## Files to Reorganize:

### Main Files:
- `/App.tsx` → `/src/App.tsx` ✓ (Done)
- `/styles/globals.css` → `/src/styles/globals.css` ✓ (Done)

### Component Files (to move to /src/components/):
- AdminDashboard.tsx
- DashboardLayout.tsx
- FeedbackCard.tsx
- FeedbackDetails.tsx
- LandingPage.tsx
- LoginPage.tsx
- LogoutModal.tsx
- ManageFeedback.tsx
- MyFeedbacks.tsx
- RegisterPage.tsx
- StatsCard.tsx
- StudentDashboard.tsx
- SubmitFeedback.tsx

### Figma Components (to move to /src/components/figma/):
- ImageWithFallback.tsx

### UI Components (to move to /src/components/ui/):
All 47 UI component files need to be copied to /src/components/ui/

## Files to Keep at Root:
- package.json
- Attributions.md
- guidelines/ folder

## Status:
Currently copying component files...
