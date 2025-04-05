import pandas as pd

# List of required columns
REQUIRED_COLUMNS = [
    'Curricular_units_1st_sem_approved',
    'Age_at_enrollment',
    'Admission_grade',
    'Curricular_units_1st_sem_evaluations',
    'Previous_qualification_grade',
    'Tuition_fees_up_to_date',
    'Application_order',
    'Curricular_units_1st_sem_enrolled',
    'Gender',
    'Mothers_qualification',
]

def preprocess_input(data):
    """Ensures input DataFrame has correct types and column order."""
    # Convert dictionary input to DataFrame if necessary
    df = pd.DataFrame([data]) if isinstance(data, dict) else data.copy()

    # Log input data for debugging
    print("Input data:\n", df.head())

    # Ensure the correct column order and keep only required columns
    try:
        df = df[REQUIRED_COLUMNS]
    except KeyError as e:
        missing_columns = set(REQUIRED_COLUMNS) - set(df.columns)
        raise ValueError(f"Missing required columns: {missing_columns}")

    # Convert all columns to integers where possible, handling errors gracefully
    for col in REQUIRED_COLUMNS:
        try:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)
        except Exception as e:
            raise ValueError(f"Error converting column {col} to integer: {e}")

    # Log processed data for debugging
    print("Processed data:\n", df.head())

    return df
