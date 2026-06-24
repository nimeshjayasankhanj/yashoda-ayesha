"use client";

import { useEffect, useState } from "react";

export default function WeddingInvitation() {
  const weddingDate = new Date("2026-08-10T18:00:00");

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8eef0] via-[#f6e9ec] to-[#efd8df] text-[#3f2d2d]">
      {/* HERO */}
      <section className="max-w-md mx-auto px-4 pt-6">
        <div className="bg-white border-4 border-white shadow-lg p-4">
          <div className="border border-[#ead7db] p-4">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
              alt="couple"
              className="w-full h-[280px] object-cover rounded"
            />

            <div className="text-center py-8">
              <p className="italic text-gray-500">
                Wedding Invitation
              </p>

              <h1 className="text-4xl tracking-[8px] mt-6 font-serif">
                Yashoda
              </h1>

              <div className="w-12 h-px bg-gray-400 mx-auto my-4" />

              <h1 className="text-4xl tracking-[8px] font-serif">
                Ayesha
              </h1>

              <div className="w-12 h-px bg-gray-400 mx-auto my-6" />

              <p className="text-xs tracking-[3px] uppercase">
                August 10, 2026
              </p>

              <p className="text-xs mt-2 tracking-[3px] uppercase">
                Colombo, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-[#2f1818] mt-12 py-10">
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
                className="bg-[#4a2b2b] rounded-lg py-4 text-center text-white"
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
        <p className="text-center text-xs tracking-[5px] uppercase text-gray-500">
          Our Story
        </p>

        <h2 className="text-center text-5xl font-serif mt-4">
          Our Story
        </h2>

        <p className="text-center leading-8 text-gray-700 mt-10">
          Together with our families, we invite you
          to celebrate our joyful union and share
          this unforgettable moment with us.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-12">
          <img
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
            alt=""
            className="rounded-[30px] h-52 object-cover shadow-lg"
          />

          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
            alt=""
            className="rounded-[30px] h-52 object-cover shadow-lg"
          />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-md mx-auto px-4 py-12">
        <p className="text-center uppercase tracking-[5px] text-xs text-gray-500">
          Our Big Day
        </p>

        <h2 className="text-center text-5xl font-serif mt-4 mb-12">
          Wedding Timeline
        </h2>

        <div className="space-y-5">
          {[
            {
              time: "04:00 PM",
              title: "The Ceremony",
              desc: "Exchange vows and celebrate our union.",
            },
            {
              time: "05:30 PM",
              title: "Cocktail Hour",
              desc: "Refreshments and photographs.",
            },
            {
              time: "07:00 PM",
              title: "Grand Dinner",
              desc: "Dinner and wedding speeches.",
            },
            {
              time: "09:00 PM",
              title: "The Party",
              desc: "Music, dancing and celebration.",
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
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="max-w-md mx-auto px-4">
        <div className="bg-white border shadow-md p-8">
          <div className="text-center">
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Join Us
            </p>

            <h2 className="font-serif text-4xl mt-4">
              Wedding Ceremony
            </h2>

            <div className="mt-8 space-y-3">
              <p className="font-semibold">
                Grand Colombo Hotel
              </p>

              <p>August 10, 2026</p>

              <p>6:00 PM Onwards</p>

              <p>Colombo, Sri Lanka</p>
            </div>

            <button className="w-full mt-8 bg-[#5a3737] text-white py-3 rounded-lg">
              View Location
            </button>

            <button className="w-full mt-3 border border-gray-300 py-3 rounded-lg">
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

        <h2 className="font-serif text-center text-5xl mt-4">
          Please Confirm
        </h2>

        <form className="mt-12 space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-transparent border-b border-gray-300 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full bg-transparent border-b border-gray-300 py-3 outline-none"
          />

          <textarea
            rows={3}
            placeholder="Message For The Couple"
            className="w-full bg-transparent border-b border-gray-300 py-3 outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-[#c89c9c] hover:bg-[#b98989] text-white py-4 uppercase tracking-wider"
          >
            Confirm Via WhatsApp
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2f1818] py-12">
        <h2 className="text-center text-white text-4xl font-serif">
          Yashoda & Ayesha
        </h2>
      </footer>
    </main>
  );
}