import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { cn } from "@/lib/utils";

const GetweeklyReport = ({ open }) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleGetReport = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus("loading");
        try {
            const response = await fetch("https://app.totalchaos.online/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ to: email }),
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => {
                    setStatus("idle");
                    setEmail("");
                }, 4000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <div className={cn(
            "mt-auto border-t border-white/5 transition-all duration-300 overflow-hidden",
            open ? "px-4 py-6 bg-indigo-500/5" : "px-0 py-4 flex flex-col items-center"
        )}>
            <div className={cn("flex items-center gap-2 mb-3", !open && "justify-center")}>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <FiMail size={16} />
                </div>
                {open && (
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap"
                    >
                        Weekly Report
                    </motion.span>
                )}
            </div>

            {open ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    <form onSubmit={handleGetReport} className="space-y-2">
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className={cn(
                                    "w-full bg-slate-950/50 border rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none transition-all placeholder:text-slate-600 shadow-inner",
                                    status === "error" ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-indigo-500/50"
                                )}
                                disabled={status === "loading" || status === "success"}
                            />

                            <AnimatePresence>
                                {status === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"
                                    >
                                        <FiCheck size={14} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success" || !email}
                            className={cn(
                                "w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg",
                                status === "loading" ? "bg-slate-800 text-slate-500 cursor-not-allowed" :
                                    status === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" :
                                        status === "error" ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" :
                                            "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                            )}
                        >
                            {status === "loading" ? (
                                <FiLoader className="animate-spin" size={12} />
                            ) : status === "success" ? (
                                "Sent Successfully"
                            ) : status === "error" ? (
                                "Failed to Send"
                            ) : (
                                "Generate Report"
                            )}
                        </button>
                    </form>

                    <p className="mt-3 text-[9px] text-slate-500 font-medium leading-tight px-1">
                        AI analysis will be delivered to your inbox weekly.
                    </p>
                </motion.div>
            ) : null}
        </div>
    );
};

export default GetweeklyReport;
