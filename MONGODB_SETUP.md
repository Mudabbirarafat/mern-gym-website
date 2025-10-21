# MongoDB Setup Options

## Option 1: Use MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `backend/config.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-website
   ```

## Option 2: Install MongoDB Locally

### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB will run on `mongodb://localhost:27017`
4. Your current config is already set for this!

### macOS:
```bash
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Option 3: Use Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Current Status

Your backend is running but MongoDB is not connected. The app will work for basic features but authentication and data persistence won't work without MongoDB.

## Quick Test

Visit `http://localhost:4000` to see the API status.
Visit `http://localhost:5173` to see the frontend.

## Next Steps

1. Choose one of the MongoDB options above
2. Update the `MONGODB_URI` in `backend/config.env` if needed
3. Restart the backend server
4. Test the application!
