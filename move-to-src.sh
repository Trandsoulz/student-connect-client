#!/bin/bash

# This script reorganizes the project structure by moving all source files into an src/ directory

echo "Starting file reorganization..."

# Create src directory structure if it doesn't exist
mkdir -p src/components/figma
mkdir -p src/components/ui
mkdir -p src/styles

# Copy component files to src/components/
echo "Copying component files..."
cp components/DashboardLayout.tsx src/components/ 2>/dev/null || true
cp components/FeedbackCard.tsx src/components/ 2>/dev/null || true
cp components/FeedbackDetails.tsx src/components/ 2>/dev/null || true
cp components/LandingPage.tsx src/components/ 2>/dev/null || true
cp components/LoginPage.tsx src/components/ 2>/dev/null || true
cp components/LogoutModal.tsx src/components/ 2>/dev/null || true
cp components/ManageFeedback.tsx src/components/ 2>/dev/null || true
cp components/MyFeedbacks.tsx src/components/ 2>/dev/null || true
cp components/RegisterPage.tsx src/components/ 2>/dev/null || true
cp components/StatsCard.tsx src/components/ 2>/dev/null || true
cp components/StudentDashboard.tsx src/components/ 2>/dev/null || true
cp components/SubmitFeedback.tsx src/components/ 2>/dev/null || true

# Copy figma component
echo "Copying figma components..."
cp components/figma/ImageWithFallback.tsx src/components/figma/ 2>/dev/null || true

# Copy all UI components
echo "Copying UI components..."
cp components/ui/*.tsx src/components/ui/ 2>/dev/null || true
cp components/ui/*.ts src/components/ui/ 2>/dev/null || true

# App.tsx and styles/globals.css are already created in src/

echo "✓ File reorganization complete!"
echo ""
echo "Next steps:"
echo "1. Delete old files:"
echo "   rm -rf App.tsx components/ styles/"
echo ""
echo "2. Update your entry point (e.g., main.tsx or index.tsx) to import from './src/App'"
echo "3. Update any configuration files that reference the old paths"
