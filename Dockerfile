# Step 1: Use the official Node.js image as a base
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /rag-chatbot

# Step 3: Copy package.json and package-lock.json (or yarn.lock if using yarn)
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files
COPY . .

# Step 6: Expose the port that the app will listen on (adjust if necessary)
EXPOSE 3000

# Step 7: Start the application in development mode
CMD ["npm", "run", "dev"]
