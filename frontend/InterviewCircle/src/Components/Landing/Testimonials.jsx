import React from 'react';
import { FiStar } from "react-icons/fi";
import SectionHeading from './SectionHeading';

const Testimonials = () => {
  const items = [
    {
      name: "Sarah Jenkins",
      role: "Software Engineer at Google",
      joined: "Landed job in 3 weeks",
      text: "The technical AI caught flaws in my explanation of Big O notation that no human mock interviewer ever noticed.",
      avatar: "SJ"
    },
    {
      name: "Marcus Chen",
      role: "Product Manager at Meta",
      joined: "Improved interview score by 65%",
      text: "Behavioral practice with the STAR method module was a game changer. I felt so much more relaxed in the real thing.",
      avatar: "MC"
    },
    {
      name: "Elena Rodriguez",
      role: "UX Designer at Airbnb",
      joined: "3 Job offers in 1 month",
      text: "The real-time sentiment analysis helped me realize I was rushing my answers when nervous. Highly recommend!",
      avatar: "ER"
    }
  ];

  return (
    <section id="success" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Success Stories"
          subtitle="Join thousands of professionals who have leveled up their careers."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 flex flex-col"
            >
              <div className="flex gap-1 text-amber-400 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FiStar key={s} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-white text-lg italic mb-8 flex-grow">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
                  {t.avatar}
                </div>

                <div>
                  <h5 className="text-white font-bold">{t.name}</h5>

                  <p className="text-slate-500 text-xs uppercase font-bold tracking-tight mb-1">
                    {t.role}
                  </p>

                  <p className="text-emerald-400 text-xs font-medium">
                    {t.joined}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
