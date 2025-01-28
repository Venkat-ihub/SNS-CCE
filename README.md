# SNS-CCE

## 📌 Overview
The **SNS-CCE** project is a comprehensive platform designed for managing Continuous and Comprehensive Evaluation (CCE) in educational institutions. It facilitates student assessments, grading, and performance tracking through an intuitive dashboard.

## 🌟 Features
### 🎓 **Student Assessment & Evaluation**
- **Automated Grading System**: Calculates grades based on performance.
- **Customizable Evaluation Criteria**: Supports different grading structures.
- **Progress Tracking**: Provides detailed student performance reports.
- **Teacher & Admin Dashboard**: Manage evaluations efficiently.

### 🛠 **Technical Features**
- **Django Backend**: Handles evaluation logic and user management.
- **React Frontend**: Provides an intuitive and interactive UI.
- **MongoDB Integration**: Stores student data and performance records.
- **Authentication System**: Secure login with user roles (Admin, Teacher, Student).

## 🚀 Installation
### Prerequisites
Ensure you have the following installed on your system:
- Python (3.8+)
- Node.js (16+)
- MongoDB Atlas (or a local MongoDB instance)
- Virtual Environment (optional but recommended)

### Backend Setup (Django)
```bash
# Clone the repository
git clone https://github.com/Venkat-ihub/SNS-CCE.git
cd SNS-CCE/backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # For Linux/macOS
venv\Scripts\activate    # For Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env  # Update the .env file with your credentials

# Run migrations
python manage.py migrate

# Start the Django server
python manage.py runserver
```

### Frontend Setup (React)
```bash
cd ../frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

## 📊 Usage
1. **Login/Register** to access the CCE dashboard.
2. **Teachers & Admins**: Create and manage student evaluations.
3. **Students**: View grades, performance reports, and feedback.
4. **Generate Reports**: Download student assessment summaries.

## 🛠 Tech Stack
- **Backend**: Django, MongoDB Atlas
- **Frontend**: React, TailwindCSS
- **Authentication**: JWT, OAuth
- **Database**: MongoDB Atlas

## 📖 Roadmap
- [ ] Implement AI-based grading recommendations.
- [ ] Add support for multiple institutions.
- [ ] Improve data visualization and analytics.
- [ ] Integrate attendance tracking features.

## 🤝 Contributing
We welcome contributions! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
For any queries or collaborations, reach out via [GitHub Issues](https://github.com/Venkat-ihub/SNS-CCE/issues).
