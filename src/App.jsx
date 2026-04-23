import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const DISPLAY_NAME = "وليد";
const SITE_PASSWORD = "waleed";
const ACQUAINTANCE_DATE = "2024-01-25T00:00:00";
const SPECIAL_DATE = "2025-08-09T00:00:00";

function TypingText({ text, speed = 35, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className={className}>{displayed}</p>;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "00:00";
  const total = Math.floor(value);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function App() {
  const musicRef = useRef(null);
  const voiceRef = useRef(null);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showLastWords, setShowLastWords] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const [musicProgress, setMusicProgress] = useState({
    current: 0,
    duration: 0,
  });

  const [voiceProgress, setVoiceProgress] = useState({
    current: 0,
    duration: 0,
  });

  const [counter, setCounter] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const content = useMemo(
    () => ({
      heroName: DISPLAY_NAME,
      heroSub:
        "مش كل الناس بتعدي في حياتنا عادي، فيه ناس بيكون لهم مكان مختلف من أول لحظة، وبيفضلوا مهمين مهما الوقت عدى.",
      heroText:
        "الصفحة دي معمولة مخصوص لوليد، فيها شوية تفاصيل وذكريات وكلام من القلب، معمولين بذوق علشان يفضلوا حاجة حلوة ترجع لها في أي وقت.",
      meetTitle: "يوم ما اتقابلنا",
      meetDate: "25 / 1 / 2024",
      secondDateTitle: "يوم الخطوبة",
      secondDate: "9 / 8 / 2025",
      timerTitle: "العداد من يوم ما اتقابلنا 25 / 1 / 2024",
      timerText:
        "فيه أيام بتعدي عادي، وفيه أيام بتفضل محفورة جوانا مهما السنين عدت... وده من الأيام اللي عمرها ما بتتنسى.",
      longMessage:
        "أنا عملت الصفحة دي علشانك إنت، علشان أجمع فيها شوية مشاعر وذكريات وكلام يستاهل يتقال. من وقت ما اتقابلنا، وإنت بقيت شخص ليه مكانة كبيرة ومختلفة، والوقت بدل ما يقلل ده، بالعكس خلّى المعنى أكبر وأوضح.",
      cuteText:
        "كل تفصيلة هنا معمولة بحب واهتمام، مخصوص لوليد، علشان تبقى حاجة شبهه وحلوة زيه.",
      finalText:
        "وفي النهاية، يمكن الأيام تسرقنا وتلهينا، لكن في ناس بيكون لهم مكان ثابت جوه القلب. والصفحة دي معمولـة علشان تفضل ذكرى حلوة، صادقة، ومن القلب فعلًا.",
      lastWords:
        "ولو هقول آخر كلام، فهو إنك مش شخص عابر أبدًا. إنت من الناس اللي وجودهم بيفرق، واللي ذكراهم بتفضل حلوة ومريحة، واللي مهما الوقت عدى مكانهم بيفضل محفوظ. وعلشان كده، كان لازم يبقى ليك شيء خاص، يشبه قيمتك عندي.",
      prayerText:
        "يارب دايمًا أشوفك مرتاح، مبسوط، وناجح في كل خطوة جاية. ويكتب لك ربنا الخير في كل حاجة، ويجعل أيامك كلها هدوء ورضا وفرحة تليق بقلبك.",
    }),
    []
  );

  const memoryCards = useMemo(
    () => [
      {
        id: 1,
        title: "أول مقابلة",
        image: "/1.jpg",
        date: "25 / 1 / 2024",
        text: "من يوم ما اتقابلنا، كان في إحساس مختلف كده... إحساس إن اللي جاي مش هيبقى عادي.",
      },
      {
        id: 2,
        title: "أول انطباع",
        image: "/2.jpg",
        date: "بداية الحكاية",
        text: "أول انطباع عنك كان مميز جدًا، وفضل ثابت جوايا مع الوقت من غير ما يتغير.",
      },
      {
        id: 3,
        title: "القرب",
        image: "/3.jpg",
        date: "تفصيلة حلوة",
        text: "فيه ناس بتقرب منهم وتحس براحة، وإنت كنت من الناس دي من غير أي مجهود.",
      },
      {
        id: 4,
        title: "الكلام",
        image: "/4.jpg",
        date: "بين السطور",
        text: "كلامك دايمًا له إحساس مختلف، بسيط لكنه بيوصل وبيفضل في القلب.",
      },
      {
        id: 5,
        title: "الحضور",
        image: "/5.jpg",
        date: "وجودك",
        text: "وجودك له طعم خاص، بيخلي أي لحظة أبسط وأحلى من غير ما تحتاج تعمل حاجة.",
      },
      {
        id: 6,
        title: "الاهتمام",
        image: "/6.jpg",
        date: "فرق كبير",
        text: "أجمل حاجة في بعض الناس هي اهتمامهم اللي بيبان في التفاصيل الصغيرة... وإنت من النوع ده.",
      },
      {
        id: 7,
        title: "الونس",
        image: "/7.jpg",
        date: "راحة",
        text: "في ناس وجودهم لوحده يهون اليوم، ويخلي كل حاجة ألطف... وإنت فعلًا كده.",
      },
      {
        id: 8,
        title: "الذكرى",
        image: "/8.jpg",
        date: "مع الوقت",
        text: "كل ما الوقت بيعدي، الذكرى بدل ما تضعف، بتحلو أكتر وتثبت أكتر.",
      },
      {
        id: 9,
        title: "الخطوبة",
        image: "/9.jpg",
        date: "9 / 8 / 2025",
        text: "وييجي يوم الخطوبة، اليوم اللي زوّد للذكرى معنى أكبر وفرحة أكبر وأجمل.",
      },
      {
        id: 10,
        title: "الفرحة",
        image: "/10.jpg",
        date: "لحظة مهمة",
        text: "فيه لحظات بتكون كبيرة قوي، وبتفضل محفورة جوانا مهما حصل بعديها.",
      },
      {
        id: 11,
        title: "الأمان",
        image: "/11.jpg",
        date: "إحساس",
        text: "أجمل إحساس هو لما تبقى مرتاح لحد، ومطمن له، وحاسس إن وجوده سند.",
      },
      {
        id: 12,
        title: "الحب",
        image: "/12.jpg",
        date: "مشاعر حقيقية",
        text: "الحب الحقيقي بيبان في التفاصيل، في الكلام، في الخوف، وفي الدعوة الحلوة من القلب.",
      },
      {
        id: 13,
        title: "مكانك",
        image: "/13.jpg",
        date: "ثابت",
        text: "مكانك مش بيتغير، ومهما حصل أو الوقت عدى، هتفضل ليك قيمة كبيرة جوايا.",
      },
      {
        id: 14,
        title: "التفاصيل",
        image: "/14.jpg",
        date: "من القلب",
        text: "كل تفصيلة هنا معمولـة علشان تعبر عن حاجة حقيقية، وعن مشاعر متقالتش كلها بالكلام.",
      },
      {
        id: 15,
        title: "النهاية الحلوة",
        image: "/15.jpg",
        date: "آخر لمسة",
        text: "وفي الآخر، أحب أقول إن الصفحة دي أقل حاجة ممكن تتعمل علشان شخص مهم زي وليد.",
      },
    ],
    []
  );

  const videoItems = useMemo(
    () => [
      {
        id: 1,
        title: "الفيديو الأول",
        src: "/video1.mp4",
        poster: "/14.jpg",
        text: "هنا تقدر تحط أول فيديو خاص بوليد في المسار /video1.mp4.",
      },
      {
        id: 2,
        title: "الفيديو الثاني",
        src: "/video2.mp4",
        poster: "/15.jpg",
        text: "وهنا تقدر تحط الفيديو الثاني الخاص بوليد في المسار /video2.mp4.",
      },
    ],
    []
  );

  const timelineItems = useMemo(
    () => [
      {
        title: "أول مقابلة",
        date: "25 / 1 / 2024",
        text: "اليوم اللي اتقابلنا فيه، ومنه بدأت أول حاجة حلوة في الحكاية كلها.",
      },
      {
        title: "أيام بينا",
        date: "بعدها بوقت",
        text: "ومع الأيام، الذكرى كبرت، والمشاعر بقت أوضح، والمعنى بقى أكبر.",
      },
      {
        title: "الخطوبة",
        date: "9 / 8 / 2025",
        text: "اليوم اللي كان مميز جدًا، واللي بقى علامة كبيرة وجميلة جوه القلب.",
      },
      {
        title: "النهارده",
        date: "دلوقتي",
        text: "ودلوقتي بقت كل الحكاية متجمعة هنا، في صفحة بسيطة لكن من القلب فعلًا.",
      },
    ],
    []
  );

  const facts = useMemo(
    () => [
      { title: "الاسم", value: DISPLAY_NAME },
      { title: "يوم ما اتقابلنا", value: "25 / 1 / 2024" },
      { title: "يوم الخطوبة", value: "9 / 8 / 2025" },
      { title: "عدد الصور", value: String(memoryCards.length) },
    ],
    [memoryCards.length]
  );

  const reasons = useMemo(
    () => [
      "وجودك",
      "كلامك",
      "حنيتك",
      "اهتمامك",
      "قربك",
      "طيبتك",
      "مكانتك",
      "حبك",
    ],
    []
  );

  const differentReasons = useMemo(
    () => [
      {
        title: "عندك حضور",
        text: "فيه ناس أول ما تدخل القلب بتثبت فيه، وإنت فعلًا من الناس دي.",
      },
      {
        title: "عندك طيبة",
        text: "طيبتك من الحاجات اللي تفرق جدًا، واللي تخلي اللي قدامك مرتاح من غير ما يحس.",
      },
      {
        title: "عندك أمان",
        text: "وجودك بيدي إحساس بالأمان والراحة، ودي نعمة كبيرة جدًا.",
      },
      {
        title: "عندك مكانة",
        text: "مكانك كبير ومش شبه أي حد، وده شيء واضح في كل حاجة بينا.",
      },
      {
        title: "عندك حب",
        text: "الحب اللي فيك حقيقي وباين، وده من أجمل الحاجات اللي تميزك.",
      },
      {
        title: "عندك أثر",
        text: "أثرك حلو، ووجودك بيسيب جوه القلب حاجة حلوة وصافية.",
      },
    ],
    []
  );

  const paragraphs = useMemo(
    () => [
      "فيه ناس لما تدخل حياتنا، بنحس إنهم اتعملوا علشان يبقوا جزء منها، مش مجرد وقت ويعدي.",
      "من يوم ما اتقابلنا، وكل حاجة كان ليها طعم مختلف، وكل ذكرى حتى لو بسيطة بقت ليها قيمة كبيرة.",
      "الخطوبة ما كانتش مجرد تاريخ وخلاص، دي كانت لحظة من أجمل اللحظات اللي تتعاش وتفضل محفورة جوانا.",
      "والصفحة دي معمولة علشان تفضل فاكرة، وتفضل شايلة مشاعر حقيقية، وكلام صادق، وذكرى ليها مكان كبير.",
    ],
    []
  );

  const scatteredMessages = useMemo(
    () => [
      "فيه ناس ربنا بيحطهم في حياتنا علشان يغيروها للأحلى.",
      "أجمل الذكريات هي اللي بتفضل حلوة مهما الوقت عدى.",
      "بعض الأشخاص بيبقوا راحة في وسط كل الزحمة.",
      "اللي من القلب، بيفضل في القلب.",
    ],
    []
  );

  const moments = useMemo(
    () => [
      "أول مقابلة عمرها ما بتتنسى",
      "الخطوبة كانت لحظة من العمر",
      "تفصيلة صغيرة لكن قيمتها كبيرة",
      "ذكرى معمولـة من القلب",
      "صفحة فيها مشاعر حقيقية",
      "حاجة تفضل حلوة مع الوقت",
    ],
    []
  );

  const selectedCard =
    selectedIndex !== null ? memoryCards[selectedIndex] : null;

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 2400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const startDate = new Date(ACQUAINTANCE_DATE);

    const updateCounter = () => {
      const now = new Date().getTime();
      const start = startDate.getTime();
      const difference = now - start;

      if (difference <= 0) {
        setCounter({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCounter({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const music = musicRef.current;
    if (!music) return;

    const playMusic = async () => {
      try {
        await music.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playMusic();
  }, [hasStarted]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setShowLastWords(false);
      }

      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") {
          setSelectedIndex((prev) =>
            prev === null
              ? 0
              : (prev - 1 + memoryCards.length) % memoryCards.length
          );
        }
        if (e.key === "ArrowLeft") {
          setSelectedIndex((prev) =>
            prev === null ? 0 : (prev + 1) % memoryCards.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, memoryCards.length]);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (enteredPassword === SITE_PASSWORD) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError(`كلمة السر غلط يا ${DISPLAY_NAME}`);
    }
  };

  const startExperience = () => {
    setHasStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleVoice = async () => {
    const audio = voiceRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsVoicePlaying(true);
      } catch {
        setIsVoicePlaying(false);
      }
    } else {
      audio.pause();
      setIsVoicePlaying(false);
    }
  };

  const openCard = (index) => setSelectedIndex(index);
  const closeCard = () => setSelectedIndex(null);

  const nextCard = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % memoryCards.length
    );
  };

  const prevCard = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + memoryCards.length) % memoryCards.length
    );
  };

  const musicPercent = musicProgress.duration
    ? (musicProgress.current / musicProgress.duration) * 100
    : 0;

  const voicePercent = voiceProgress.duration
    ? (voiceProgress.current / voiceProgress.duration) * 100
    : 0;

  if (showLoader) {
    return (
      <div className="loader-page" dir="rtl">
        <div className="loader-stars" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="loader-circle"></div>
        <h1>جارِ تجهيز الصفحة الخاصة بـ {DISPLAY_NAME}</h1>
        <p className="loader-subtitle">
          شوية ذكريات، شوية مشاعر، وحاجة معمولة من القلب
        </p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="password-page" dir="rtl">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>

        <div className="floating-hearts" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        <div className="password-card glass">
          <div className="password-top-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="password-image-overlay"></div>
          </div>

          <div className="lock-icon">🔐</div>
          <div className="cute-badge">نسخة خاصة جدًا</div>

          <h1>اكتب كلمة السر يا {DISPLAY_NAME}</h1>

          <p className="password-subtext">
            الصفحة دي معمولـة مخصوص ليك، فيها صور وفيديوهات وذكريات وكلام
            متجمعين بشكل حلو ومرتب، علشان تفضل حاجة مميزة ليك.
          </p>

          <form onSubmit={handleUnlock} className="password-form">
            <input
              type="password"
              placeholder="اكتب كلمة السر هنا"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <button type="submit">افتح الصفحة</button>
          </form>

          {error && <div className="error-text">{error}</div>}
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="cinematic-screen" dir="rtl">
        <div className="cinematic-bg"></div>
        <div className="cinematic-overlay"></div>

        <div className="cinematic-card glass">
          <span className="small-badge">نسخة خاصة</span>
          <h1>{DISPLAY_NAME}</h1>
          <TypingText
            text="فيه أشخاص وجودهم بيبقى حلو كفاية يخلي الذكرى تعيش لوحدها."
            className="cinematic-typing"
            speed={28}
          />
          <p>
            قبل ما تبدأ، خد نفس هادي...
            لأن اللي جاي مش مجرد صفحة،
            دي حاجة معمولة من القلب فعلًا.
          </p>
          <button className="cinematic-btn" onClick={startExperience}>
            ابدأ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" dir="rtl">
      <audio
        ref={musicRef}
        loop
        preload="auto"
        onTimeUpdate={() =>
          setMusicProgress({
            current: musicRef.current?.currentTime || 0,
            duration: musicRef.current?.duration || 0,
          })
        }
        onLoadedMetadata={() =>
          setMusicProgress({
            current: musicRef.current?.currentTime || 0,
            duration: musicRef.current?.duration || 0,
          })
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/love.mp3" type="audio/mpeg" />
      </audio>

      <audio
        ref={voiceRef}
        preload="auto"
        onTimeUpdate={() =>
          setVoiceProgress({
            current: voiceRef.current?.currentTime || 0,
            duration: voiceRef.current?.duration || 0,
          })
        }
        onLoadedMetadata={() =>
          setVoiceProgress({
            current: voiceRef.current?.currentTime || 0,
            duration: voiceRef.current?.duration || 0,
          })
        }
        onPlay={() => setIsVoicePlaying(true)}
        onPause={() => setIsVoicePlaying(false)}
      >
        <source src="/voice-message.mp3" type="audio/mpeg" />
      </audio>

      <div className="progress-line">
        <span style={{ width: `${scrollProgress}%` }}></span>
      </div>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div className="floating-hearts" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <main className="container">
        <section className="opening-note glass fade-up">
          <span className="opening-note-badge">بداية الصفحة</span>
          <h2>أهلاً يا {DISPLAY_NAME}</h2>
          <p>
            الصفحة دي معمولـة مخصوص ليك، علشان تجمع شوية ذكريات حلوة وكلام من
            القلب، وتفضل حاجة مميزة ليك طول الوقت.
          </p>
        </section>

        <section className="hero-banner glass fade-up">
          <div className="hero-banner-text">
            <span className="small-badge">نسخة مخصصة بالكامل</span>

            <h1>
              {content.heroName}
              <span>{content.heroSub}</span>
            </h1>

            <TypingText text={content.cuteText} className="typing-line" />
            <p>{content.heroText}</p>

            <div className="top-actions">
              <button className="btn btn-primary" onClick={toggleMusic}>
                {isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  document
                    .getElementById("gallerySection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                عرض الصور
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setShowLastWords(true)}
              >
                كلمة أخيرة
              </button>
            </div>
          </div>

          <div className="hero-banner-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="hero-banner-overlay"></div>
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[0]}</span>
        </div>

        <section className="stats-grid fade-up">
          <div className="stat-card glass">
            <strong>{counter.days}</strong>
            <span>يوم من أول مقابلة</span>
          </div>

          <div className="stat-card glass cute-counter-card">
            <div className="pulse-ring"></div>
            <strong>{counter.hours}</strong>
            <span>ساعة من الذكرى</span>
          </div>

          <div className="stat-card glass">
            <strong>{memoryCards.length}</strong>
            <span>صورة</span>
          </div>

          <div className="stat-card glass">
            <strong>{videoItems.length}</strong>
            <span>فيديو</span>
          </div>
        </section>

        <section className="cute-facts-grid fade-up">
          {facts.map((item, index) => (
            <div className="cute-fact-card glass" key={index}>
              <h4>{item.title}</h4>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="wish-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>التواريخ المميزة</h3>
              <p>أهم تاريخين موجودين جوه الصفحة</p>
            </div>
          </div>

          <div className="wish-grid">
            <div className="wish-card glass">
              <span>✦</span>
              <p>25 / 1 / 2024 — يوم ما اتقابلنا</p>
            </div>
            <div className="wish-card glass">
              <span>✦</span>
              <p>9 / 8 / 2025 — يوم الخطوبة</p>
            </div>
          </div>
        </section>

        <section className="full-cover-section glass fade-up">
          <div className="full-cover-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="full-cover-overlay"></div>
          </div>

          <div className="full-cover-content">
            <div className="scene-pill">{content.meetTitle}</div>
            <div className="scene-date">{content.meetDate}</div>
            <h2>{content.heroName}</h2>
            <h3>{content.heroSub}</h3>
            <p>{content.heroText}</p>
          </div>
        </section>

        <section className="huge-counter-section glass fade-up" id="counterSection">
          <span className="small-badge">العداد</span>
          <h2>{content.timerTitle}</h2>
          <p>{content.timerText}</p>

          <div className="huge-counter-grid">
            <div className="huge-counter-box animated-counter">
              <strong>{counter.days}</strong>
              <span>يوم</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.hours}</strong>
              <span>ساعة</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.minutes}</strong>
              <span>دقيقة</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.seconds}</strong>
              <span>ثانية</span>
            </div>
          </div>

          <div className="music-player-card">
            <div className="music-head">
              <div className="music-title-wrap">
                <div className={`disc ${isPlaying ? "spin" : ""}`}>🎵</div>
                <div>
                  <strong>الموسيقى</strong>
                  <small>مشغل مدمج داخل الصفحة</small>
                </div>
              </div>

              <button className="mini-play-btn" onClick={toggleMusic}>
                {isPlaying ? "إيقاف" : "تشغيل"}
              </button>
            </div>

            <div className="player-bar">
              <span style={{ width: `${musicPercent}%` }}></span>
            </div>

            <div className="player-time">
              <small>{formatTime(musicProgress.current)}</small>
              <small>{formatTime(musicProgress.duration)}</small>
            </div>
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[1]}</span>
        </div>

        <section className="voice-section glass fade-up">
          <div className="voice-left">
            <span className="small-badge">رسالة صوتية</span>
            <h2>اسمع الرسالة</h2>
            <p>
              وتقدر تضيف ملف صوتي في المسار{" "}
              <strong>/voice-message.mp3</strong>
              وهيظهر هنا بنفس الشكل.
            </p>
          </div>

          <div className="voice-player">
            <div className="voice-top">
              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <button className="voice-btn" onClick={toggleVoice}>
                {isVoicePlaying ? "إيقاف" : "تشغيل"}
              </button>
            </div>

            <div className="player-bar voice-bar">
              <span style={{ width: `${voicePercent}%` }}></span>
            </div>

            <div className="player-time">
              <small>{formatTime(voiceProgress.current)}</small>
              <small>{formatTime(voiceProgress.duration)}</small>
            </div>
          </div>
        </section>

        <section className="different-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>أجمل حاجات في وليد</h3>
              <p>حاجات تخلي مكانه كبير ومختلف</p>
            </div>
          </div>

          <div className="different-grid">
            {differentReasons.map((item, index) => (
              <div className="different-card glass" key={index}>
                <span className="different-number">0{index + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wide-message glass fade-up">
          <span className="small-badge">رسالة</span>
          <h2>كلام من القلب</h2>
          <p>{content.longMessage}</p>
        </section>

        <section className="extra-love-section fade-up">
          {paragraphs.map((paragraph, index) => (
            <div className="extra-love-card glass" key={index}>
              <h3>فقرة {index + 1}</h3>
              <p>{paragraph}</p>
            </div>
          ))}
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[2]}</span>
        </div>

        <section className="love-columns fade-up">
          <div className="love-column-card glass">
            <h3>أكثر حاجة بحبها فيك</h3>
            <ul>
              {reasons.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="love-column-card glass">
            <h3>لما ييجي اسم وليد</h3>
            <ul>
              <li>أفتكر أول مقابلة</li>
              <li>أفتكر إحساس الأمان</li>
              <li>أفتكر كلام حلو من القلب</li>
              <li>أفتكر يوم الخطوبة</li>
              <li>أفتكر مكانة كبيرة</li>
              <li>وأفتكر شخص غالي جدًا</li>
            </ul>
          </div>
        </section>

        <section className="timeline-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>الخط الزمني</h3>
              <p>ترتيب بسيط لأهم الذكريات</p>
            </div>
          </div>

          <div className="timeline-list">
            {timelineItems.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <small>{item.date}</small>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reels-section glass fade-up" id="gallerySection">
          <div className="section-head slider-head">
            <div>
              <h3>{memoryCards.length} صورة... وكل صورة وراها معنى</h3>
              <p>جاليري مرتب بشكل بسيط وحلو</p>
            </div>

            <div className="slider-buttons">
              <button
                className="slider-btn"
                onClick={() => {
                  const slider = document.getElementById("cardsSlider");
                  slider?.scrollBy({ left: 360, behavior: "smooth" });
                }}
              >
                ←
              </button>
              <button
                className="slider-btn"
                onClick={() => {
                  const slider = document.getElementById("cardsSlider");
                  slider?.scrollBy({ left: -360, behavior: "smooth" });
                }}
              >
                →
              </button>
            </div>
          </div>

          <div className="cards-slider" id="cardsSlider">
            {memoryCards.map((card, index) => (
              <button
                key={card.id}
                className="animated-text-card"
                onClick={() => openCard(index)}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="animated-card-image">
                  <img src={card.image} alt={card.title} />
                </div>

                <div className="animated-card-body">
                  <small>{card.date}</small>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="gallery-grid-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>المعرض</h3>
              <p>الصور بشكل أكبر وأوضح</p>
            </div>
          </div>

          <div className="big-gallery-grid">
            {memoryCards.map((item, index) => (
              <button
                key={item.id}
                className="big-gallery-card"
                onClick={() => openCard(index)}
              >
                <img src={item.image} alt={item.title} />
                <div className="big-gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="extra-love-section fade-up">
          {videoItems.map((video) => (
            <div className="extra-love-card glass" key={video.id}>
              <h3>{video.title}</h3>
              <video
                controls
                preload="metadata"
                poster={video.poster}
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  marginBottom: "14px",
                }}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <p>{video.text}</p>
            </div>
          ))}
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[3]}</span>
        </div>

        <section className="wish-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>معانيها أكبر من أي شكل</h3>
              <p>تفاصيل بسيطة لكن قيمتها كبيرة</p>
            </div>
          </div>

          <div className="wish-grid">
            {moments.map((item, index) => (
              <div className="wish-card glass" key={index}>
                <span>✦</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="big-quotes-section fade-up">
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>فيه ناس وجودهم لوحده يطمن القلب.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>اللي ليه مكانة بيفضل مكانه ثابت مهما الوقت عدى.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>أجمل الذكريات هي اللي بتكون طالعة من القلب فعلًا.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>بعض الأشخاص بيبقوا نعمة جميلة في الحياة.</p>
          </div>
        </section>

        <section className="prayer-section glass fade-up">
          <span className="small-badge">دعوة حلوة</span>
          <h2>أمنية من قلبي</h2>
          <p>{content.prayerText}</p>
        </section>

        <section className="extra-love-section fade-up">
          <div className="extra-love-card glass">
            <h3>التقدير</h3>
            <p>
              التقدير الحقيقي لازم يبان، حتى لو في حاجة بسيطة، المهم تكون طالعة من القلب.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>الذكرى</h3>
            <p>
              في ذكريات بتفضل جميلة مهما السنين عدت، لأنها اتعاشت بإحساس حقيقي.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>المعنى</h3>
            <p>
              أوقات أبسط الحاجات هي اللي بيكون لها أكبر معنى، خصوصًا لما تتعمل لشخص غالي.
            </p>
          </div>
        </section>

        <section className="final-cute-section glass fade-up">
          <span className="small-badge">الخاتمة</span>
          <h2>وفي الآخر</h2>
          <p>{content.finalText}</p>

          <div className="final-promise">
            <p>
              كل اللي هنا معمول بحب واهتمام، علشان يفضل عندك شيء حلو،
              يعبّر عن ذكرى غالية ومشاعر حقيقية.
            </p>
          </div>

          <div className="final-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowLastWords(true)}
            >
              عرض الكلمة الأخيرة
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              الرجوع للبداية
            </button>
          </div>
        </section>

        <button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </main>

      {selectedCard && (
        <div className="modal" onClick={closeCard}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeCard}>
              ×
            </button>

            <button className="modal-nav modal-prev" onClick={prevCard}>
              ‹
            </button>
            <button className="modal-nav modal-next" onClick={nextCard}>
              ›
            </button>

            <div className="modal-image">
              <img src={selectedCard.image} alt={selectedCard.title} />
            </div>

            <div className="modal-content">
              <span className="modal-chip">تفصيلة مختارة</span>
              <small>
                {selectedIndex + 1} / {memoryCards.length}
              </small>
              <h3>{selectedCard.title}</h3>
              <p>{selectedCard.text}</p>
            </div>
          </div>
        </div>
      )}

      {showLastWords && (
        <div
          className="last-words-overlay"
          onClick={() => setShowLastWords(false)}
        >
          <div
            className="last-words-card glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowLastWords(false)}
            >
              ×
            </button>
            <span className="small-badge">كلمة أخيرة</span>
            <h2>الخلاصة</h2>
            <p>{content.lastWords}</p>
          </div>
        </div>
      )}
    </div>
  );
}