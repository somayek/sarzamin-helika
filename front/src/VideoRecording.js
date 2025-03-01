import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoRecording = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const navigate = useNavigate();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorderRef.current.start();
    setRecording(true);

    setTimeout(() => {
      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    }, 30000); // Stop recording after 30 seconds
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleNext = () => {
    // Navigate to the photo capture page
    navigate("/photo-capture");
  };

  const handleRecordAgain = () => {
    setVideoURL(null);
    startRecording();
  };

  return (
    <div className="video-recording">
      <h2>ضبط ویدیو</h2>
      <p>        
      لطفاً صفحه اول مدارک شناسایی عکس دار خود را باز نموده و مقابل دوربین جمله زیر را به وضوح بیان کنید:
      </p>
      <blockquote>
        "اینجانب (نام و نام خانوادگی) درخواست گذرنامه ایرانی دارم.
         همچنین من شرایط و ضوابط خدمات سرزمین را خوانده و قبول دارم."
      </blockquote>
      <p>
      در ادامه، مدارک شناسایی خود را به دوربین نزدیک کرده و اطمینان حاصل کنید که نوشته‌ها به وضوح قابل خواندن باشند        
      </p>

      {!videoURL ? (
        <div>
          <video ref={videoRef} autoPlay muted style={{ width: "100%" }} />
          <div>
            {recording ? (
              <div>
                <p>در حال ضبط... (حداکثر ۳۰ ثانیه)</p>
                <button onClick={stopRecording}>توقف ضبط</button>
              </div>
            ) : (
              <button onClick={startRecording}>شروع ضبط</button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3>پیش‌نمایش ویدیو</h3>
          <video src={videoURL} controls style={{ width: "100%" }} />
          <button onClick={handleRecordAgain}>ضبط مجدد</button>
          <button onClick={handleNext}>ادامه</button>
        </div>
      )}
    </div>
  );
};

export default VideoRecording;