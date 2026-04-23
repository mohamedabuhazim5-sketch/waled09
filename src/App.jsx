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
        "مش كل الناس بتعدي بنفس الشكل... فيه ناس بيكون لهم حضور واضح، وقيمة ثابتة، وأثر يبان من غير أي مجهود.",
      heroText:
        "المكان ده معمول مخصوص لوليد، مش لمجرد إنه يتشاف وخلاص، لكن عشان يجمع شوية تفاصيل ليها معنى، ويطلع في شكل هادي، مرتب، وفيه تقدير حقيقي يليق بيه.",
      meetTitle: "من أول تاريخ مميز",
      meetDate: "25 / 1 / 2024",
      secondDateTitle: "التاريخ التاني المميز",
      secondDate: "9 / 8 / 2025",
      timerTitle: "العداد من 25 / 1 / 2024",
      timerText:
        "فيه تواريخ بتعدي عادي، وفيه تواريخ بيفضل ليها معنى خاص مهما الوقت عدى... والتاريخ ده واحد من التواريخ اللي لها قيمة واضحة.",
      longMessage:
        "أنا مش بكتب الكلام ده لمجرد المجاملة، لكن لأن في ناس فعلًا تستحق التقدير، وتستحق إن الواحد يقف عند وجودها شوية. ووليد من الناس اللي وجودهم ما كانش عادي، ومكانتهم ما كانتش عابرة، وأثرهم يفضل واضح حتى مع مرور الوقت.",
      cuteText:
        "صفحة معمولة بذوق واهتمام... وتفاصيلها بسيطة، لكن معناها كبير ومخصصة بالكامل لوليد.",
      finalText:
        "يمكن الأيام تتغير، ويمكن الوقت ياخد كل واحد في طريق، لكن برضه فيه أشخاص بيفضل لهم مكان واضح مهما الوقت عدى. والصفحة دي معمولة عشان تفضل ذكرى محترمة، مختلفة، وليها معنى فعلًا.",
      lastWords:
        "ولو في آخر كلام ممكن يتقال، فهو إن بعض الناس ما بيكونوش مجرد معرفة عادية... لكن بيبقوا قيمة، وذكرى، وأثر يفضل موجود حتى بعد ما الوقت يعدي. ووليد من الناس اللي مكانهم بيتحفظ، ويتقدر، وما بيتنساش بسهولة.",
      prayerText:
        "أتمنى لك راحة بال، وتوفيق في كل خطوة، ونجاح يليق بيك، وأيام أهدى وأحسن. وربنا يكتب لك الخير دايمًا، ويفتح لك كل باب فيه راحة، وقيمة، وطمأنينة.",
    }),
    []
  );

  const memoryCards = useMemo(
    () => [
      {
        id: 1,
        title: "البداية",
        image: "/1.jpg",
        date: "تفصيلة أولى",
        text: "من أول لحظة، كان واضح إن وليد مش شخص عادي، وإن له طابع خاص يبان من غير أي مجهود.",
      },
      {
        id: 2,
        title: "الأسلوب",
        image: "/2.jpg",
        date: "تفصيلة مميزة",
        text: "أسلوب وليد من الحاجات اللي تفرق فعلًا، لأن مش أي حد بيكون له حضوره وطريقته الخاصة.",
      },
      {
        id: 3,
        title: "الحضور",
        image: "/3.jpg",
        date: "أثر واضح",
        text: "وجود وليد في أي مكان بيكون له بصمة، وبيخلي التفاصيل أهدى وأرتب بشكل يبان.",
      },
      {
        id: 4,
        title: "الكلام",
        image: "/4.jpg",
        date: "هدوء وثبات",
        text: "في الكلام هدوء وثبات، ودي من الحاجات اللي بتدي للشخص قيمة واضحة ومحترمة.",
      },
      {
        id: 5,
        title: "النظرة",
        image: "/5.jpg",
        date: "تفصيلة قوية",
        text: "أوقات نظرة واحدة بتقول كثير، وفيه حضور بيتفهم من غير ما يحتاج شرح طويل.",
      },
      {
        id: 6,
        title: "الهيبة",
        image: "/6.jpg",
        date: "ثقل واضح",
        text: "في فرق بين حد موجود وخلاص، وحد وجوده له وزن وقيمة... ووليد من النوع ده.",
      },
      {
        id: 7,
        title: "المكانة",
        image: "/7.jpg",
        date: "قدر خاص",
        text: "مش كل الناس ليها نفس المكانة، وفيه أشخاص بيبقى ليهم قدر ثابت ومحفوظ.",
      },
      {
        id: 8,
        title: "الذكرى",
        image: "/8.jpg",
        date: "مع الوقت",
        text: "مرور الوقت مش دايمًا بيقلل من قيمة الناس، أوقات بالعكس بيأكدها أكتر.",
      },
      {
        id: 9,
        title: "التقدير",
        image: "/9.jpg",
        date: "يبقى موجود",
        text: "وفي الآخر، التقدير الحقيقي بيفضل له مكان، والصفحة دي جزء من التقدير ده.",
      },
      {
        id: 10,
        title: "الهدوء",
        image: "/10.jpg",
        date: "راحة واضحة",
        text: "فيه هدوء في الحضور يدي راحة لأي مكان، ودي من الحاجات اللي تميز وليد.",
      },
      {
        id: 11,
        title: "الثبات",
        image: "/11.jpg",
        date: "صفة قوية",
        text: "الثبات من الصفات اللي بتدي للشخص قيمة حقيقية، ودي حاجة واضحة جدًا هنا.",
      },
      {
        id: 12,
        title: "التميز",
        image: "/12.jpg",
        date: "شكل مختلف",
        text: "فيه ناس بتتشابه، لكن فيه ناس بيكون لهم طابع مختلف يفضل ثابت في الذاكرة.",
      },
      {
        id: 13,
        title: "الاحترام",
        image: "/13.jpg",
        date: "مكان محفوظ",
        text: "الاحترام الحقيقي بيتبني من الشخصية، ووجود وليد بيفرضه بشكل طبيعي.",
      },
      {
        id: 14,
        title: "التفاصيل",
        image: "/14.jpg",
        date: "فرق واضح",
        text: "التفاصيل الصغيرة أوقات هي أكتر شيء بيظهر قيمة الشخص، وهنا الفرق واضح جدًا.",
      },
      {
        id: 15,
        title: "الخاتمة",
        image: "/15.jpg",
        date: "آخر لمسة",
        text: "وأخيرًا، تبقى الذكرى المرتبة أحسن من ألف كلام، خصوصًا لما تكون معمولة مخصوص لوليد.",
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
        text: "هنا تحط أول فيديو خاص بوليد في المسار /video1.mp4.",
      },
      {
        id: 2,
        title: "الفيديو الثاني",
        src: "/video2.mp4",
        poster: "/15.jpg",
        text: "وهنا تحط ثاني فيديو خاص بوليد في المسار /video2.mp4.",
      },
    ],
    []
  );

  const timelineItems = useMemo(
    () => [
      {
        title: "أول تاريخ مميز",
        date: "25 / 1 / 2024",
        text: "التاريخ اللي يبدأ منه العداد، واللي منه تبدأ الحكاية داخل الصفحة.",
      },
      {
        title: "مرور الوقت",
        date: "بعدها بفترة",
        text: "مع الوقت، بعض الصفات بتبان أكثر، وبعض الناس قيمتهم بتثبت أكثر.",
      },
      {
        title: "التاريخ الثاني",
        date: "9 / 8 / 2025",
        text: "تاريخ مميز ثاني محفوظ داخل الصفحة كجزء أساسي من الذكرى.",
      },
      {
        title: "النهارده",
        date: "دلوقتي",
        text: "النهارده الفكرة كلها إن في ذكرى تستحق تتعمل بشكل محترم ومميز لوليد.",
      },
    ],
    []
  );

  const facts = useMemo(
    () => [
      { title: "الاسم", value: DISPLAY_NAME },
      { title: "تاريخ العداد", value: "25 / 1 / 2024" },
      { title: "التاريخ الثاني", value: "9 / 8 / 2025" },
      { title: "عدد الصور", value: String(memoryCards.length) },
    ],
    [memoryCards.length]
  );

  const reasons = useMemo(
    () => [
      "حضورك",
      "أسلوبك",
      "ثباتك",
      "هدوءك",
      "شخصيتك",
      "تفاصيلك",
      "مكانتك",
      "احترامك",
    ],
    []
  );

  const differentReasons = useMemo(
    () => [
      {
        title: "لك حضور",
        text: "مش أي حد لما يدخل مكان يتلاحظ، لكن حضور وليد من النوع اللي يبان لوحده.",
      },
      {
        title: "لك أسلوب",
        text: "طريقة الكلام والتصرف ليها طابع خاص، وده من أول الحاجات اللي تفرق.",
      },
      {
        title: "لك ثبات",
        text: "الثبات من الصفات اللي بتدي قيمة كبيرة لأي شخص، ودي حاجة واضحة جدًا.",
      },
      {
        title: "لك مكانة",
        text: "فيه ناس ليها قدر من غير ما تتكلم كثير، ووليد من النوع ده.",
      },
      {
        title: "لك احترام",
        text: "الاحترام الحقيقي بيتبني من الشخصية، ووجود وليد بيفرضه بشكل طبيعي.",
      },
      {
        title: "لك أثر",
        text: "فيه ناس بتيجي وتعدي، وفيه ناس بيفضل لهم أثر واضح... ووليد من الناس دي.",
      },
    ],
    []
  );

  const paragraphs = useMemo(
    () => [
      "بعض الناس ما بيتنسوش بسهولة، مش بس لأنهم كانوا موجودين، لكن لأن وجودهم كان له معنى حقيقي.",
      "فيه فرق كبير بين شخص عادي وشخص له طابع يفضل واضح حتى بعد مرور الوقت، ووليد من الناس اللي ليهم الطابع ده.",
      "التفاصيل الصغيرة أوقات هي أكتر حاجة بتفرق، وطريقة الكلام، والحضور، والثبات، كلهم بيبنوا صورة محترمة ومميزة.",
      "الفكرة من الصفحة دي مش كلام وخلاص، الفكرة إنها تبقى ذكرى مرتبة، فيها تقدير واضح، وتوصل الإحساس بشكل بسيط لكن صادق.",
    ],
    []
  );

  const scatteredMessages = useMemo(
    () => [
      "فيه ناس مكانهم بيفضل ثابت.",
      "الاحترام الحقيقي عمره ما بيضيع.",
      "القيمة بتبان في التفاصيل.",
      "فيه حضور بيفرض نفسه بهدوء.",
    ],
    []
  );

  const moments = useMemo(
    () => [
      "ذكرى تستحق تتعمل بشكل مختلف",
      "تفصيلة صغيرة لكن معناها كبير",
      "هدية مش تقليدية",
      "حاجة تفضل مع الوقت",
      "صفحة فيها معنى وتقدير",
      "ذكرى معمولة بذوق واهتمام",
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
      setError(`كلمة السر غير صحيحة يا ${DISPLAY_NAME}`);
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
          تفاصيل مرتبة، تصميم أنيق، وذكرى معمولة بشكل مختلف
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
          <div className="cute-badge">نسخة خاصة ومميزة</div>

          <h1>ادخل كلمة السر يا {DISPLAY_NAME}</h1>

          <p className="password-subtext">
            الصفحة دي معمولة بشكل خاص لوليد، فيها صور، فيديوهات، تفاصيل،
            وكلام متجمعين في نسخة مرتبة ومحترمة معمولـة مخصوص علشان تفضل ذكرى ليها قيمة.
          </p>

          <form onSubmit={handleUnlock} className="password-form">
            <input
              type="password"
              placeholder="اكتب كلمة السر هنا"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <button type="submit">فتح الصفحة</button>
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
            text="بعض الأشخاص مش محتاجين كلام كثير... يكفي إن مكانتهم واضحة."
            className="cinematic-typing"
            speed={28}
          />
          <p>
            قبل ما تبدأ، خد لحظة هدوء...
            لأن اللي جاي مش مجرد صفحة،
            لكنه ترتيب مختلف لذكرى تستحق.
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
            الصفحة دي معمولة مخصوص لوليد عشان تجمع شوية تفاصيل ليها قيمة،
            وتطلع في شكل هادي، مرتب، ومختلف عن أي حاجة عادية.
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
            <span>يوم من البداية</span>
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
              <p>تاريخان أساسيان محفوظان داخل الصفحة</p>
            </div>
          </div>

          <div className="wish-grid">
            <div className="wish-card glass">
              <span>✦</span>
              <p>25 / 1 / 2024 — بداية العداد</p>
            </div>
            <div className="wish-card glass">
              <span>✦</span>
              <p>9 / 8 / 2025 — التاريخ الثاني المميز</p>
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
            <h2>استمع للتسجيل</h2>
            <p>
              ويمكنك إضافة ملف صوتي في المسار{" "}
              <strong>/voice-message.mp3</strong>
              ليظهر هنا بنفس الشكل.
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
              <h3>أشياء تميز وليد</h3>
              <p>صفات واضحة تدي للشخص قيمته الحقيقية</p>
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
          <h2>كلام يستحق يتقال</h2>
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
            <h3>أكثر ما يميز وليد</h3>
            <ul>
              {reasons.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="love-column-card glass">
            <h3>لما ييجي اسم وليد</h3>
            <ul>
              <li>أفتكر حضور واضح</li>
              <li>أفتكر شخصية مختلفة</li>
              <li>أفتكر أسلوب له قيمة</li>
              <li>أفتكر تفاصيل مميزة</li>
              <li>أفتكر مكانة ثابتة</li>
              <li>وأفتكر تقدير يستحق يفضل</li>
            </ul>
          </div>
        </section>

        <section className="timeline-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>الخط الزمني</h3>
              <p>ترتيب بسيط لذكرى لها معنى</p>
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
              <h3>{memoryCards.length} صورة... وكل واحدة لها معنى</h3>
              <p>جاليري مرتب بشكل واضح ومميز</p>
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
              <h3>أفكار المعنى فيها أكبر من الشكل</h3>
              <p>تفاصيل بسيطة لكن تبقى مميزة</p>
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
            <p>بعض الأشخاص لا يحتاجون إلى كثير من الظهور... يكفي أن لهم أثرًا واضحًا.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>الاحترام الحقيقي لا يضيع، والمكانة الواضحة لا تحتاج شرحًا.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>هناك أسماء تبقى محفوظة، لأنها ببساطة كانت مختلفة.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>القيمة لا تُقال كثيرًا... لكنها تظهر في التفاصيل.</p>
          </div>
        </section>

        <section className="prayer-section glass fade-up">
          <span className="small-badge">دعوة طيبة</span>
          <h2>أمنية صادقة</h2>
          <p>{content.prayerText}</p>
        </section>

        <section className="extra-love-section fade-up">
          <div className="extra-love-card glass">
            <h3>التقدير</h3>
            <p>
              الفكرة هنا إن التقدير الحقيقي يستحق يبان، حتى لو في صورة بسيطة ومرتبة.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>الاختلاف</h3>
            <p>
              النسخة دي معمولة بشكل مختلف عن المعتاد، عشان تطلع في النهاية حاجة مميزة فعلًا.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>القيمة</h3>
            <p>
              بعض الحاجات بتعدي بسرعة، لكن بعض الذكريات بتفضل محتفظة بقيمتها مهما الوقت عدى.
            </p>
          </div>
        </section>

        <section className="final-cute-section glass fade-up">
          <span className="small-badge">الخاتمة</span>
          <h2>وفي النهاية</h2>
          <p>{content.finalText}</p>

          <div className="final-promise">
            <p>
              الفكرة كلها إن يبقى في شيء متعمل بذوق، ومرتب بشكل واضح،
              ويحفظ الذكرى بطريقة مختلفة عن أي حاجة معتادة.
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