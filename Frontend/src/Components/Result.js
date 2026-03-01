import './Result.css';
import jsPDF from 'jspdf';

const Result = ({Prediction, Confidence}) =>  {

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("AI Plant Disease Diagnosis Report", 20, 20);

        doc.setFontSize(14);
        doc.text(`Disease: ${Prediction}`, 20, 40);
        doc.text(`Confidence: ${Confidence}`, 20, 50);

        doc.text("Recommended Treatment:", 20, 70);
        doc.text("- Use appropriate fungicide", 25, 80);
        doc.text("- Apply organic neem oil spray", 25, 90);
        doc.text("- Maintain plant hygiene", 25, 100);

        doc.save("plant_diagnosis_report.pdf");
    }

    return (
    <div className="resultContainer">
        <div className="diagnosisCard">
            <h1 className="mainDiagnosis">🌿 Disease Diagnosis</h1>

            <div className="diseaseSection">
                <h2 className="diseaseName">{Prediction}</h2>
                <h3 className="confidenceText">Confidence: {Confidence}</h3>

                <div className="confidenceBar">
                    <div
                        className="confidenceFill"
                        style={{width: Confidence}}
                    ></div>
                </div>
            </div>

            <div className="treatmentGrid">

                <div className="treatmentBox">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                      alt="medicine"
                      className="treatmentIcon"
                    />
                    <h3>Medicine</h3>
                    <p>Consult agricultural expert & use fungicide</p>
                </div>

                <div className="treatmentBox">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2909/2909763.png"
                      alt="supplement"
                      className="treatmentIcon"
                    />
                    <h3>Supplements</h3>
                    <p>Use balanced fertilizer & micronutrients</p>
                </div>

                <div className="treatmentBox">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
                      alt="prevention"
                      className="treatmentIcon"
                    />
                    <h3>Prevention</h3>
                    <p>Maintain hygiene, proper spacing & irrigation</p>
                </div>

            </div>

            <button className="pdfButton" onClick={downloadPDF}>
                📄 Download PDF Report
            </button>
        </div>
    </div>
    )
}

export default Result;