from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle
import warnings
from feature import FeatureExtraction
from flask_cors import CORS
from dotenv import load_dotenv
import threat_intel
import reasoning

load_dotenv()
warnings.filterwarnings('ignore')

# Load ML model
with open("pickle/new_model.pkl", "rb") as file:
    gbc = pickle.load(file)

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form["url"]

        intel = threat_intel.evaluate(url)
        if intel["verdict"] == "phishing":
            explanation = reasoning.explain(url, "phishing", 0.0, [0] * 30, intel)
            return render_template('index.html', xx=0.0, url=url, explanation=explanation)

        obj = FeatureExtraction(url)
        feature_list = obj.getFeaturesList()
        x = np.array(feature_list).reshape(1, 30)

        y_pred = gbc.predict(x)[0]
        y_pro_phishing = gbc.predict_proba(x)[0, 0]
        y_pro_safe = gbc.predict_proba(x)[0, 1]

        if intel["verdict"] == "trusted":
            y_pro_safe = max(y_pro_safe, 0.9)

        result = "phishing" if y_pro_safe < 0.5 else "safe"
        explanation = reasoning.explain(url, result, y_pro_safe, feature_list, intel)
        return render_template('index.html', xx=round(y_pro_safe, 2), url=url, explanation=explanation)

    return render_template("index.html", xx=-1)

def _risk_level(safe_score):
    if safe_score >= 0.75:
        return "safe"
    if safe_score >= 0.5:
        return "suspicious"
    return "dangerous"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "Missing 'url' parameter"}), 400

    try:
        intel = threat_intel.evaluate(url)
        if intel["verdict"] == "phishing":
            explanation = reasoning.explain(url, "phishing", 0.0, [0] * 30, intel)
            return jsonify({
                "prediction": "phishing",
                "probabilities": {"safe": 0.0, "phishing": 1.0},
                "risk_level": _risk_level(0.0),
                "source": "threat_intel",
                "reasons": intel["reasons"],
                "explanation": explanation,
                "features": dict(zip(reasoning.FEATURE_NAMES, [0] * 30)),
                "domain_age_days": intel["domain_age_days"],
            })

        obj = FeatureExtraction(url)
        feature_list = obj.getFeaturesList()
        features = np.array(feature_list).reshape(1, 30)
        prediction = gbc.predict(features)[0]
        proba = gbc.predict_proba(features)[0]

        safe_score = float(proba[1])
        if intel["verdict"] == "trusted":
            safe_score = max(safe_score, 0.9)

        result = "phishing" if safe_score < 0.5 else "safe"
        explanation = reasoning.explain(url, result, safe_score, feature_list, intel)
        return jsonify({
            "prediction": result,
            "probabilities": {
                "safe": safe_score,
                "phishing": 1 - safe_score
            },
            "risk_level": _risk_level(safe_score),
            "source": "ml_model",
            "domain_age_days": intel["domain_age_days"],
            "explanation": explanation,
            "features": dict(zip(reasoning.FEATURE_NAMES, feature_list)),
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
