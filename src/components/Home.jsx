import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import confetti from "canvas-confetti"; // Import confetti
import "../styles/home.css";
import huhImage from "../assets/huh.jpg";
import huhsound from "../assets/vine-boom-sound-effect(chosic.com).mp3";

function Home() {
  const cardRef = useRef(null);
  const audioRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // Floating hearts animation logic (Keep your existing code here)
    const interval = setInterval(() => {
      const card = cardRef.current;
      if (!card) return;
      const heartContainer = document.createElement("div");
      heartContainer.className = "floating-heart";
      heartContainer.style.left = Math.random() * 90 + "%";
      const size = Math.random() * 10 + 20;
      heartContainer.style.fontSize = size + "px";
      const duration = Math.random() * 4 + 6;
      heartContainer.style.animationDuration = duration + "s";
      card.appendChild(heartContainer);
      const root = createRoot(heartContainer);
      root.render(<FaHeart style={{ color: "rgba(232, 48, 162, 0.6)" }} />);
      setTimeout(() => {
        root.unmount();
        heartContainer.remove();
      }, duration * 1000);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false);
    }, 3000);
  };

  const handleYesClick = () => {
    // --- THE NICE EFFECT ---

    // 1. Fire Confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti coming from left and right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // 2. Change state to show the message
    setIsAccepted(true);
  };

  return (
    <div className="C1">
      <div className={`C2 ${isAccepted ? "success-mode" : ""}`} ref={cardRef}>
        {!isAccepted ? (
          <>
            <div className="question-h">Heyy Kashish,</div>
            <div className="question-s">
              I know ki ham valentine nhi mana rahe he, but i still want to ask
              you...
            </div>
            <div className="question-m">Will you be my VALENTINE ?</div>
            <div className="small-text">(No dabane ki koshish mat karna)</div>
            <div className="options">
              <button className="yesButton" onClick={handleYesClick}>
                YES!!!!
              </button>
              <button className="noButton" onClick={handleNoClick}>
                no..
              </button>
            </div>
          </>
        ) : (
          <div className="success-content">
            <div className="question-m">I LOVEEEEE YOUUUUU KISHUUU! ❤️</div>
            <div className="question-s">
              I know me tera kabhi kabhi thora mazak uda deta hu, but i am sure
              tujhe pata he ki bas tease karne ke liye karta hu.
            </div>
            <div className="question-s">
              But in reality, you have no idea ki tu kitni important part he
              meri life ka, jab bhi tu nhi hoti he na tab pehle to sukun milta
              he (kidding kidding) but fir yaad bhi aati he, truely you are the
              best gift i have ever gotten, and its not just about love yrr,
              even as a friend i admire you, your dedication, your honesty. I
              should let you know, ki jitna pyaar me pehle karta tha usse bhi
              zada karta hu abhi, you mean a lot too me.
            </div>
            <div
              className="question-s"
              style={{ marginTop: "20px", fontWeight: "bold" }}
            >
              Aur haaa, Happy Promise Day my Love! 💍
            </div>
            <div className="question-s">
              I promise ki kabhi bhi kisi bhi situation me tujhe akela nhi
              chodunga, bhale hi kuch bhi ho jaye.
            </div>
          </div>
        )}
      </div>

      <audio ref={audioRef} src={huhsound} />

      {showImage && (
        <div className="popup-image">
          <img src={huhImage} alt="popup" />
        </div>
      )}
    </div>
  );
}

export default Home;
