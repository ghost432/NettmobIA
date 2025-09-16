#!/usr/bin/env node

/**
 * Plesk Deployment Entry Point for Flowise
 * This file serves as the main entry point for Flowise when deployed on Plesk
 */

const { spawn } = require('child_process');
const path = require('path');

// Set the working directory to the server package
const serverPath = path.join(__dirname, 'packages', 'server', 'bin');

// Start Flowise server
const flowiseProcess = spawn('node', ['run', 'start'], {
    cwd: serverPath,
    stdio: 'inherit',
    env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
    }
});

flowiseProcess.on('error', (error) => {
    console.error('Error starting Flowise:', error);
    process.exit(1);
});

flowiseProcess.on('exit', (code) => {
    console.log(`Flowise process exited with code ${code}`);
    process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully');
    flowiseProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully');
    flowiseProcess.kill('SIGINT');
});
