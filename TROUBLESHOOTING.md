# Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Application not rendering properly on server

**Symptoms:** Works locally but not on server, blank page or broken assets

**Solutions:**
- Check that the PORT environment variable is consistent (8517)
- Verify nginx is proxying to the correct port (127.0.0.1:8517)
- Check container logs: `sudo docker logs gieu-website`
- Verify container is running: `sudo docker ps`

### 2. Container fails to start

**Check these:**
```bash
# Check container status
sudo docker ps -a

# Check container logs
sudo docker logs gieu-website

# Check docker-compose logs
sudo docker-compose logs

# Test manual container run
sudo docker run -it --rm -p 8517:8517 -e PORT=8517 <image_id> /bin/sh
```

### 3. Port binding issues

**Verify:**
- .env file exists and has PORT=8517
- No other service is using port 8517: `sudo netstat -tlnp | grep 8517`
- Docker container is exposing the right port

### 4. Nginx proxy issues

**Check:**
- Nginx config is pointing to correct port (8517)
- Nginx config is properly symlinked: `sudo ln -s /etc/nginx/sites-available/gieu.github.io /etc/nginx/sites-enabled/`
- Nginx syntax is valid: `sudo nginx -t`
- Reload nginx: `sudo systemctl reload nginx`

### 5. Asset loading issues

**Solutions:**
- Check that the `site` URL in astro.config.mjs matches your domain
- Verify static assets are being served correctly
- Check browser network tab for failed requests

## Useful Commands

```bash
# Check application health
curl -I http://localhost:8517

# Check from inside container
sudo docker exec gieu-website curl -I http://localhost:8517

# Check nginx access logs
sudo tail -f /var/log/nginx/access.log

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart everything
sudo docker-compose down
sudo docker-compose up --build -d
sudo systemctl reload nginx
```
