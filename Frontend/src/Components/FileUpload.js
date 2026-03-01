import './FileUpload.css'
import React, { useRef, useState } from 'react'

const FileUpload = ({ onPredict, onFileUpload, onCancelImage, onSample, isPredicting }) => {
    <div className={isPredicting ? "scannerOverlay activeScan" : "scannerOverlay"}>
  <div className="scannerLine"></div>
  <div className="scannerGlow"></div>
</div>



    const inputRef = useRef()
    const videoRef = useRef()
    const canvasRef = useRef()
    const [cameraOpen, setCameraOpen] = useState(false)

  const openCamera = async () => {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Camera not supported in this browser.");
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user", // laptop webcam
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play(); // IMPORTANT
        }

        setCameraOpen(true);

    } catch (err) {
        console.error("Camera Error:", err);
        alert(`Camera error: ${err.name}`);
    }
};

    const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
        alert("Camera not initialized.");
        return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // 🚨 CRITICAL FIX: Check if stream exists
    if (!video.srcObject) {
        alert("Camera stream not available. Please open the camera first.");
        return;
    }

    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        if (!blob) {
            alert("Failed to capture image.");
            return;
        }

        const file = new File([blob], "captured.jpg", { type: "image/jpeg" });

        const fakeEvent = {
            target: {
                files: [file]
            }
        };

        onFileUpload(fakeEvent);
    }, 'image/jpeg');

    // 🚨 SAFE STREAM STOP (No more null crash)
    const stream = video.srcObject;
    if (stream && stream.getTracks) {
        stream.getTracks().forEach(track => track.stop());
    }

    video.srcObject = null;
    setCameraOpen(false);
};
    return(
    <div>
        <div className="wrapper">
            <div className="formContainer">

                <h1 className="title">🌿 AI Plant Disease Detector</h1>

                <div className="imageContainer">
                    <div className="imageHolder">
                        <button id="cancel-btn" onClick={onCancelImage}>
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="imageWrapper">
                            <img id="imageid" src="" alt="No file Uploaded" />

                            {isPredicting && (
                                <div className="scannerOverlay">
                                    <div className="scannerLine"></div>
                                    <div className="scannerGlow"></div>
                                </div>
                            )}
                            <span id="imagespan">
                                <i className="fas fa-cloud-upload-alt"></i> Image Preview
                            </span>
                        </div>
                    </div>
                </div>

                {cameraOpen && (
                    <div className="cameraBox">
                        <video ref={videoRef} autoPlay playsInline muted className="cameraVideo" />
                        <button onClick={capturePhoto} disabled={!cameraOpen}>
  📸 Capture Photo
</button>
                        <canvas ref={canvasRef} style={{display:"none"}} />
                    </div>
                )}

                <div className="buttonContainer">
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={onFileUpload}
                      hidden="hidden"
                    />

                    <button id="custom-button" onClick={() => inputRef.current.click()}>
                        <i className="fas fa-upload"></i> Upload Image
                    </button>

                    <button onClick={openCamera}>
                        <i className="fas fa-camera"></i> Open Camera
                    </button>

                    <button onClick={onSample}>
                        <i className="fas fa-image"></i> Try Sample
                    </button>

                    <button className="predictBtn" onClick={onPredict}>
                        🔍 Predict Disease
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FileUpload;