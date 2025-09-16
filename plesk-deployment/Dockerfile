# Dockerfile for Flowise on Plesk
# This creates a custom image optimized for Plesk deployment

FROM flowiseai/flowise:latest

# Set working directory
WORKDIR /usr/src/app

# Create necessary directories
RUN mkdir -p /root/.flowise/{uploads,logs}

# Set proper permissions
RUN chmod 755 /root/.flowise

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/v1/ping || exit 1

# Start command
CMD ["flowise", "start"]
