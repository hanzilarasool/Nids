# -*- coding: utf-8 -*-
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import json

# Configuration - MUST MATCH TRAINING SETUP
MODEL_NAME = 'random_forest_model1.pkl'
SCALER_NAME = 'scaler.pkl'
PCA_NAME = 'pca.pkl'

def load_artifacts():
    """Load model, scaler, and PCA with error handling"""
    try:
        dir_path = os.path.dirname(__file__)
        model = joblib.load(os.path.join(dir_path, MODEL_NAME))
        scaler = joblib.load(os.path.join(dir_path, SCALER_NAME))
        pca = joblib.load(os.path.join(dir_path, PCA_NAME))
        return model, scaler, pca
    except Exception as e:
        raise RuntimeError(f"Error loading artifacts: {str(e)}")

def predict_single(features):
    """Process features through scaler + PCA before prediction."""
    try:
        # Load artifacts
        model, scaler, pca = load_artifacts()
        
        # Validate input dimensions
        expected_features = scaler.n_features_in_
        if len(features) != expected_features:
            raise ValueError(f"Expected {expected_features} features, got {len(features)}")

        # Convert input to DataFrame for consistency
        feature_names = scaler.feature_names_in_
        features_df = pd.DataFrame([features], columns=feature_names)

        # Preprocess: Scale -> PCA
        scaled_features = scaler.transform(features_df)
        pca_features = pca.transform(scaled_features)

        # Get the model's actual class order
        model_classes = model.classes_

        # Make predictions
        prediction = model.predict(pca_features)[0]  # This is the predicted class label
        probabilities = model.predict_proba(pca_features)[0]  # Probabilities for each class

        # Visualization: Use the model's class labels for plotting
        plt.figure(figsize=(10, 6))
        bars = plt.bar(model_classes, probabilities, color='skyblue')
        plt.ylim(0, 1)
        plt.xlabel('Attack Types', fontsize=12)
        plt.ylabel('Probability', fontsize=12)
        plt.title('Intrusion Detection Probabilities', fontsize=14)
        plt.xticks(rotation=45, ha='right')

        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width() / 2.0, height,
                     f'{height:.2%}', ha='center', va='bottom', fontsize=9)

        # Save visualization
        vis_path = os.path.join(
            os.path.dirname(__file__),
            f"pred_{np.random.randint(1000)}.png"
        )
        plt.savefig(vis_path, bbox_inches='tight', dpi=100)
        plt.close()

        # Format response
        return {
            "prediction": prediction,
            "probabilities": {cls: float(prob) for cls, prob in zip(model_classes, probabilities)},
            "visualization": os.path.basename(vis_path),
        }

    except Exception as e:
        return {"error": str(e), "expected_features": scaler.n_features_in_}

if __name__ == "__main__":
    import sys
    try:
        input_features = json.loads(sys.argv[1])
        result = predict_single(input_features)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
