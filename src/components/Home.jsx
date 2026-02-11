import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import confetti from "canvas-confetti";
import "../styles/home.css";
import huhImage from "../assets/huh.jpg";
import huhsound from "../assets/vine-boom-sound-effect(chosic.com).mp3";

function Home() {
  const cardRef = useRef(null);
  const audioRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const card = cardRef.current;
      if (!card) return;
      const heartContainer = document.createElement("div");
      heartContainer.className = "floating-heart";
      heartContainer.style.left = Math.random() * 95 + "%"; // Slightly wider range
      const size = Math.random() * 10 + 15;
      heartContainer.style.fontSize = size + "px";
      const duration = Math.random() * 3 + 4; // Faster animation for better feel
      heartContainer.style.animationDuration = duration + "s";
      card.appendChild(heartContainer);
      const root = createRoot(heartContainer);
      root.render(<FaHeart style={{ color: "rgba(232, 48, 162, 0.4)" }} />);
      setTimeout(() => {
        root.unmount();
        heartContainer.remove();
      }, duration * 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset sound to start
      audioRef.current.play();
    }
    setShowImage(true);
    setTimeout(() => setShowImage(false), 2500);
  };

  const handleYesClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 2000,
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
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

    setIsAccepted(true);
  };

  return (
    <div className="C1">
      <div className={`C2 ${isAccepted ? "success-mode" : ""}`} ref={cardRef}>
        <div className="content-wrapper">
          {!isAccepted ? (
            <>
              <h2 className="question-h">Heyy Kashish,</h2>
              <p className="question-s">
                I know ki ham valentine nhi mana rahe he, but i still want to
                ask you...
              </p>
              <h1 className="question-m">Will you be my VALENTINE?</h1>
              <p className="small-text">(No dabane ki koshish mat karna)</p>
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
              <h1 className="question-m">I LOVEEEEE YOUUUUU KISHUUU! ❤️</h1>
              <div className="scroll-area">
                <p className="question-s">
                  I know me tera kabhi kabhi thora mazak uda deta hu, but i am
                  sure tujhe pata he ki bas tease karne ke liye karta hu.
                </p>
                <p className="question-s">
                  But in reality, you have no idea ki tu kitni important part he
                  meri life ka... truly you are the best gift i have ever
                  gotten. Even as a friend i admire you, your dedication, your
                  honesty. I love you more than ever.
                </p>
                <p className="question-s highlight">
                  Aur haaa, Happy Promise Day my Love! 💍
                </p>
                <p className="question-s">
                  I promise ki kabhi bhi kisi bhi situation me tujhe akela nhi
                  chodunga, bhale hi kuch bhi ho jaye.
                </p>
                <p className="question-s">
                  Love You again, and take care my cutie pie.
                </p>
              </div>
            </div>
          )}
        </div>
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
