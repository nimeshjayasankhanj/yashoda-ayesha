"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function WeddingInvitation() {
  const weddingDate = new Date("2026-09-10T18:00:00");

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = weddingDate.getTime() - Date.now();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "", attendance: "" });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleEnter = () => {
    const audio = audioRef.current;
    setShowSplash(false);

    if (!audio) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: "", phone: "", attendance: "" };
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!attendance) newErrors.attendance = "Please select an option";

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.attendance) {
      return;
    }

    const whatsappNumber = "94702622626";
    const text = [
      `RSVP - Yashoda & Ayesha's Wedding`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Attendance: ${attendance}`,
      message.trim() ? `Message: ${message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAddToCalendar = () => {
    const formatGCalDate = (date: Date) =>
      date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");

    const eventStart = new Date("2026-09-10T10:00:00");
    const eventEnd = new Date("2026-09-10T22:00:00");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Yashoda & Ayesha's Wedding",
      dates: `${formatGCalDate(eventStart)}/${formatGCalDate(eventEnd)}`,
      details:
        "Join us as we celebrate our wedding! Poruwa Ceremony, lunch, and celebrations to follow.",
      location: "Dutch Gate Hotel, Aluthgama, Sri Lanka",
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-[#f2f4ec] text-[#3f2d2d]" >
      <audio ref={audioRef} src="/jayamangala-gatha-pirith.mp3" loop />

      {showSplash && (
        <div className="fixed inset-0 z-[100] bg-[#4b5320] flex flex-col items-center justify-center px-6 text-center">
          <p className="text-white/70 text-xs tracking-[4px] uppercase mb-4">
            Wedding Invitation
          </p>
          <h1 className="text-white text-3xl font-serif tracking-[4px]">
            Yashoda
          </h1>
          <div className="w-10 h-px bg-white/40 my-4" />
          <h1 className="text-white text-3xl font-serif tracking-[4px]">
            Ayesha
          </h1>

          <button
            onClick={handleEnter}
            className="mt-10 bg-white text-[#4b5320] px-8 py-3 rounded-full uppercase tracking-[3px] text-xs font-semibold shadow-lg"
          >
            Enter Invitation
          </button>
        </div>
      )}

      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-[#4b5320] text-white shadow-lg flex items-center justify-center"
      >
        {isPlaying ? (
          // pause icon
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="3" height="12" />
            <rect x="10" y="2" width="3" height="12" />
          </svg>
        ) : (
          // play icon
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2l11 6-11 6V2z" />
          </svg>
        )}
      </button>

      {/* HERO */}
      <section className="max-w-md mx-auto px-4 pt-6">
        <div className="bg-white border-4 border-white shadow-lg p-4">
          <div className="border border-[#ead7db] p-4">
            <Image alt="couple" src={"/img.png"} width={2000} height={2000} />

            <div className="text-center py-8">
              <p className="font-serif text-3xl text-gray-500">
                Wedding Invitation
              </p>

              <h1 className="text-2xl tracking-[8px] mt-6 font-serif">
                Yashoda
              </h1>

              <div className="w-12 h-px bg-gray-400 mx-auto my-4" />

              <h1 className="text-2xl tracking-[8px] font-serif">
                Ayesha
              </h1>

              <div className="w-12 h-px bg-gray-400 mx-auto my-6" />

              <p className="text-sm tracking-[3px] uppercase">
                September 10, 2026
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-[#4b5320] mt-12 py-10">
        <div className="max-w-md mx-auto px-4">
          <p className="text-center text-white text-xs tracking-[4px] uppercase mb-6">
            Countdown To Our Big Day
          </p>

          <div className="grid grid-cols-4 gap-3">
            {[
              countdown.days,
              countdown.hours,
              countdown.minutes,
              countdown.seconds,
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#8a9a5b] rounded-lg py-4 text-center text-white"
              >
                <div className="text-2xl font-bold">
                  {String(value).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-md mx-auto px-6 py-20">
        <h2 className="text-center text-5xl font-serif mt-4" style={{ color: "#4b5320" }}>
          Our Story
        </h2>

        <p className="text-center leading-8 text-gray-700 mt-10">
          "A few years ago, our journey began with a simple hello. Through laughter, memories, and countless cherished moments, our love grew stronger each day, leading us to this beautiful moment , where two hearts become one and a new chapter begins....."
        </p>

        <div className="grid grid-cols-1 gap-4 mt-12">
          <Image alt="couple" src={"/card-1.jpg"} width={3000} height={3000} className="rounded-[30px] h-52 object-cover shadow-lg" />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-md mx-auto px-4 py-12">
        <h2 className="text-center text-5xl font-serif mt-4 mb-12" style={{ color: "#4b5320" }}>
          Wedding Timeline
        </h2>

        <div className="space-y-5">
          {[
            {
              time: "09:40 AM",
              title: "Poruwa Ceremony",
              desc: "We would be honored by your presence as we exchange our vows upon the Poruwa, embracing the rich heritage and blessings of this cherished tradition.",
            },
            {
              time: "12:15 PM",
              title: "Lunch",
              desc: "Your presence is the greatest gift of all. We invite you to join us for lunch and celebrate the beginning of our new journey together.",
            },
            {
              time: "02:00 PM",
              title: "The Dance Floor",
              desc: "Join us on the dance floor as we celebrate love, laughter, and new beginnings. Let's dance, rejoice, and make beautiful memories together!",
            },
            {
              time: "04:20 PM",
              title: "Grand Exit",
              desc: "Join us for as we conclude our beautiful celebration, sharing laughter, love, and unforgettable memories together.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-5"
            >
              <p className="text-xs uppercase tracking-[2px] text-gray-400">
                {item.time}
              </p>

              <h3 className="font-serif text-2xl mt-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT IMAGE */}
      <section className="max-w-md mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-[30px] shadow-lg">
          {/* <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="w-full h-64 object-cover"
          /> */}
          <Image alt="couple" src={"/img-2.png"} width={3000} height={3000} className="w-full h-64 object-cover" />
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="max-w-md mx-auto px-4">
        <div className="bg-white border shadow-md p-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl mt-4" style={{ color: "#4b5320" }}>
              Wedding Ceremony
            </h2>

            <div className="mt-8 space-y-3">
              <p className="font-semibold" style={{ color: "#4b5320" }}>
                Dutch Gate Hotel
              </p>

              <p>September 10, 2026</p>

              <p>10:00 AM Onwards</p>

              <p>Aluthgama, Sri Lanka</p>
            </div>

            <button
              onClick={() =>
                window.location.assign(
                  "https://www.google.com/maps/search/?api=1&query=6.4297767,80.0023093"
                )
              }
              className="w-full mt-8 bg-[#4b5320] text-white py-3 rounded-lg"
            >
              View Location
            </button>

            <button
              onClick={handleAddToCalendar}
              className="w-full mt-3 border border-gray-300 py-3 rounded-lg"
            >
              Add To Calendar
            </button>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="max-w-md mx-auto px-6 py-20">
        <p className="uppercase tracking-[4px] text-center text-xs text-gray-500">
          We Are Waiting
        </p>

        <h2 className="font-serif text-center text-5xl mt-4" style={{ color: "#4b5320" }}>
          Please Confirm
        </h2>

        <form
          onSubmit={handleRSVPSubmit}
          className="mt-12 space-y-6  rounded-2xl p-6"
        >
          <div>
            <input
              type="text"
              placeholder="Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-transparent border-b py-3 outline-none ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full bg-transparent border-b py-3 outline-none ${errors.phone ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <p className="text-sm">
              Will you save the date and celebrate with us?
            </p>

            <div className="mt-4 space-y-3">
              {[
                "Yes, we'll be there.",
                "Unfortunately, we can't make it.",
              ].map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 w-full text-sm py-3 px-4 rounded-lg border cursor-pointer transition-colors ${attendance === option
                    ? "border-[#4b5320] bg-[#4b5320]/5"
                    : "border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={option}
                    checked={attendance === option}
                    onChange={() => setAttendance(option)}
                    className="w-4 h-4 accent-[#4b5320]"
                  />
                  {option}
                </label>
              ))}
            </div>

            {errors.attendance && (
              <p className="text-red-500 text-xs mt-2">
                {errors.attendance}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#4b5320] text-white py-4 uppercase tracking-wider"
          >
            Confirm Via WhatsApp
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#4b5320] py-12">
        <h2 className="text-center text-white text-4xl font-serif">
          Yashoda & Ayesha
        </h2>
      </footer>
    </main>
  );
}