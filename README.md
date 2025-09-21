# Email Tone Generator

A simple full-stack application that takes an email and a tone as input and generates an appropriate response with the selected tone.

## Description

This project demonstrates basic full-stack development by creating a tool that helps users generate email responses in different tones. Users can input an email message, select from various tone options, and receive a contextually appropriate response. It's designed as a learning exercise to explore React frontend development and Spring Boot backend integration.

## Tech Stack

- **Frontend**: React
- **Backend**: Spring Boot
- **Communication**: RESTful API integration

## Features

- 📧 **Email Input**: Enter any email text that needs a response
- 🎭 **Tone Selection**: Choose from multiple tone options (Professional, Friendly, Formal, etc.)
- ⚡ **Response Generation**: Generate context-aware responses based on the selected tone
- 🔄 **Frontend/Backend Integration**: Seamless communication between React and Spring Boot

## Installation

### Prerequisites
- Node.js and npm installed
- Java 8+ installed
- Maven or Gradle (depending on your backend setup)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   # For Maven
   mvn clean install
   
   # For Gradle
   ./gradlew build
   ```

3. Run the Spring Boot application:
   ```bash
   # For Maven
   mvn spring-boot:run
   
   # For Gradle
   ./gradlew bootRun
   ```

The backend API will be available at `http://localhost:8080`

## Usage

1. **Launch the Application**
   - Start both the backend server and frontend development server
   - Open your browser and navigate to `http://localhost:3000`

2. **Generate Email Response**
   - Enter the email message you want to respond to in the text area
   - Select your desired tone from the dropdown menu (Professional, Friendly, Formal, etc.)
   - Click the "Generate" button

3. **View Results**
   - The generated response will appear below, tailored to your selected tone
   - Copy and use the response as needed

## Project Structure

```
email-tone-generator/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Spring Boot application
│   ├── src/
│   └── pom.xml (or build.gradle)
└── README.md
```

## API Endpoints

- `POST /api/mail/generate` - Generate email response based on input email and tone

## Disclaimer

This project was built purely for learning Spring Boot and React development. It is not production-ready or groundbreaking—just a hands-on exercise to practice full-stack development concepts. The focus is on understanding the integration between frontend and backend technologies rather than creating a sophisticated email generation system.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🚀
