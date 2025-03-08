import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import './PhotoCapture.css'; // Import the CSS file

const PhotoCapture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setLoading(false);
    };
    loadModels();
  }, []);

  const waitForOpenCV = () => {
    return new Promise((resolve) => {
      const checkOpenCV = () => {
        if (window.cv && window.cv.imread) {
          resolve();
        } else {
          setTimeout(checkOpenCV, 100);
        }
      };
      checkOpenCV();
    });
  };

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);

    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      if (detections.length === 0) {
        alert("No face detected in the picture. Please try again.");
        return;
      }
      if (detections.length > 0) {
        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Canvas element not found");
          return;
        }
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        // Wait for OpenCV to be loaded
        await waitForOpenCV();

        // Enhance the photo using OpenCV.js
        const src = window.cv.imread(img);
        const dst = new window.cv.Mat();
        window.cv.cvtColor(src, dst, window.cv.COLOR_RGBA2GRAY, 0);
        window.cv.imshow('canvasOutput', dst);
        src.delete();
        dst.delete();
      }
    };
  };

  const handleNext = () => {
    // Handle the next step, e.g., upload the photo or navigate to another page
    navigate("/next-step");
  };

  return (
    <div className="photo-capture">
      <h2>گرفتن عکس</h2>
      <p>لطفا عکس خود را بگیرید و مطمئن شوید که مطابق با استانداردهای گذرنامه است.</p>
      <p>شرایط عکس گذرنامه:</p>
      <ul>
        <li>ابعاد: 45mm x 35mm</li>
        <li>صورت باید در مرکز عکس باشد و 70-80% از عکس را پوشش دهد</li>
        <li>پس‌زمینه سفید یا روشن</li>
        <li>حالت چهره خنثی با دهان بسته</li>
        <li>چشم‌ها باز و به وضوح قابل مشاهده</li>
        <li>سر به طور مستقیم به جلو و نه کج یا چرخیده</li>
        <li>بدون عینک رنگی یا عینک آفتابی</li>
        <li>بدون کلاه یا پوشش سر، مگر به دلایل مذهبی یا پزشکی، صورت باید کاملاً قابل مشاهده باشد</li>
        <li>بدون هدفون، دستگاه‌های هندزفری بی‌سیم یا لوازم جانبی که صورت را پوشش می‌دهند</li>
      </ul>
      {loading ? (
        <p>در حال بارگذاری مدل‌ها...</p>
      ) : (
        <div className="webcam-container">
          {!photo ? (
            <div className="webcam-wrapper">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={350}
                height={450}
                videoConstraints={{
                  width: 350,
                  height: 450,
                  facingMode: "user",
                }}
              />
              <img src="/face-outline-guide.svg" alt="Face Outline Guide" className="face-outline-guide" />
              <button onClick={capturePhoto}>گرفتن عکس</button>
            </div>
          ) : (
            <div>
              <h3>پیش‌نمایش عکس</h3>
              <img src={photo} alt="Captured" style={{ width: "100%" }} />
              <canvas id="canvasOutput" ref={canvasRef} style={{ display: "none" }} />
              <button onClick={() => setPhoto(null)}>عکس مجدد</button>
              <button onClick={handleNext}>ادامه</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoCapture;