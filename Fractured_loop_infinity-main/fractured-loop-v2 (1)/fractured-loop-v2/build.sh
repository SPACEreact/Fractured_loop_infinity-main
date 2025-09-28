#!/bin/bash

# Set up error catching and logging
echo "Starting build process..."

# Install dependencies with proper error handling
echo "Installing dependencies..."
npm install || { echo "Error: npm install failed. Check dependencies."; exit 1; }

# Check Node.js version compatibility
echo "Verifying Node.js version..."
NODE_VERSION=$(node -v)
if [[ "$NODE_VERSION" < "v16" ]]; then
  echo "Error: Node.js version is incompatible. Expected >=v16. Found: $NODE_VERSION"
  exit 1
fi

# Run the build command and catch errors
echo "Running build script..."
npm run build || { echo "Error: npm run build failed. Check build script."; exit 1; }

# Success message
echo "Build completed successfully."
