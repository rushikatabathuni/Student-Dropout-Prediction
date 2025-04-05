from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from preprocess import preprocess_input

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")

@app.route('/predict', methods=['POST'])
def predict_single():
    try:
        data = request.get_json()  # Assuming you're sending JSON data
        print("Input data:", data)  # Log the raw input data
        df = preprocess_input(data)
        print("Processed data:", df)  # Log the processed data

        # Make prediction (assuming `model` is your trained model)
        prediction = model.predict(df)
        # print("Prediciton: "+prediction)

        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        print(f"Error: {e.__class__.__name__} - {e.__str__()}")
        return jsonify({"error": "Invalid input data"}), 400


@app.route('/predict-batch', methods=['POST'])
def predict_batch():
    if 'file' not in request.files:
        return jsonify({'error': 'CSV file not found'}), 400

    file = request.files['file']
    try:
        df = pd.read_csv(file)
        processed_df = preprocess_input(df)
        predictions = model.predict(processed_df)
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
