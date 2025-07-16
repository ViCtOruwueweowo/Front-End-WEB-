import { useState, useEffect } from "react";
import styles from "./FullScreenLoader.module.css";

const messages = [
  "Procesando",
  "Solicitando petición",
  "Llamando al servidor",
  "Safe Kids en ejecución",
];

function FullScreenLoader() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 5500; // 8 segundos para llegar a 100%
    const intervalTime = totalDuration / 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newIndex = Math.min(
      messages.length - 1,
      Math.floor((progress / 100) * messages.length)
    );
    setMessageIndex(newIndex);
  }, [progress]);

  return (
    <div className={styles.overlay}>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={styles.text}>{messages[messageIndex]}</p>
    </div>
  );
}

export default FullScreenLoader;
