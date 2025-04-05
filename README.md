# 🎓 Student Dropout Prediction Web Application

## 🧠 Overview

This project is a full-stack web application that predicts student dropout outcomes using machine learning. The app allows users to enter relevant academic and demographic information to determine whether a student is likely to **graduate**, or **drop out**. This project uses a Random Forest Classifier model to predict student dropout risk based on various academic and demographic factors.


---

## 🛠️ Tech Stack

- **Frontend**: React + Chakra UI  
- **Backend**: Flask (Python)  
- **Machine Learning**: Scikit-learn (Random Forest)  
- **Data Processing**: Pandas  

---

## 🤖 Model Details

We use a **Random Forest Classifier** trained on educational data. Random Forest is chosen for its:
- High accuracy on structured/tabular data
- Robustness to overfitting
- Ability to handle missing values and mixed feature types
- Easy interpretability with feature importance

---

## 📝 Input Features

The model expects the following 10 input features:

| Feature                               | Description |
|---------------------------------------|-------------|
| `Curricular_units_1st_sem_approved`   | Number of courses approved in the 1st semester |
| `Age_at_enrollment`                   | Age when the student enrolled |
| `Admission_grade`                     | Grade received during admission |
| `Curricular_units_1st_sem_evaluations` | Number of evaluations in the 1st semester |
| `Previous_qualification_grade`        | Grade from previous qualification |
| `Tuition_fees_up_to_date`             | 1 = Yes, 0 = No |
| `Application_order`                   | Order in which the student applied |
| `Curricular_units_1st_sem_enrolled`   | Number of enrolled subjects in 1st semester |
| `Gender`                              | 0 = Male, 1 = Female |
| `Mothers_qualification`               | Coded educational level of the student's mother (1–44) |

---

## 🖥️ Frontend (React + Chakra UI)

- Clean and intuitive user interface
- Input form with validations and dropdown menus for categorical fields
- Displays prediction with color-coded feedback:
  - 🟢 Green = Enrolled / Graduate
  - 🔴 Red = Dropout

---

## 🔙 Backend (Flask + Random Forest)

The Flask backend handles:
- Receiving JSON input
- Preprocessing and type conversions
- Feeding data to the model
- Returning prediction as JSON

### `/predict` API Endpoint

- **Method**: `POST`  
- **Request Body**: JSON containing the 10 required features  
- **Response**:
  ```json
  {
    "prediction": 0
  }
  ```

Where:
- `0` = Dropout 
- `1` = Non Dropout  

---

## 📦 Project Structure

```
student-dropout-predictor/
├── backend/
│   ├── app.py             # Flask app
│   ├── model.pkl          # Trained Random Forest model
│   ├── requirements.txt   # Python dependencies
│   └── preprocessing.py   
│
├── frontend/
│   ├── Predict.jsx         # React prediction form
│   └── other components   # UI components
│
└── README.md              # Project documentation
```

---


### Setup
1. **Clone the Repository**:
`git clone https://github.com/rushikatabathuni/Student-Dropout-Prediction.git`

2. **Install Dependencies**:
- **Front-end**:
  ```
  cd frontend
  npm install
  ```
- **Back-end**:
  ```
  cd backend
  pip install -r requirements.txt
  ```

3. **Run the Application**:
- **Front-end**:
  ```
  npm start
  ```
- **Back-end**:
  ```
  python app.py
  ```

4. **Access the Application**:

    Go to root Directory
 
    ```
    npm run dev
    ```

- React runs at: `http://localhost:3000`
- Flask API runs at: `http://127.0.0.1:5000`

---



## 📊 Prediction Flow

1. User fills out the form in the React frontend.
2. Data is sent to the Flask API at `/predict` or `/predict-batch` 
3. Flask preprocesses the input and applies the trained model.
4. Result is returned to the frontend and shown to the user with color-coded output.

---

## 📚 Output Classes

| Prediction | Meaning   |
|------------|-----------|
| `0`        | Dropout   |
| `1`        | Graduate  |

---

## Author:

[LinkedIn - K. Rushi](https://www.linkedin.com/in/rushi-katabathuni-3851072b7/)

