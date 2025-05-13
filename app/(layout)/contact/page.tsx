"use client";

import { sendEmail } from "@/app/actions/send-email";
import Footer from "@/components/sections/footer";
import Navigation from "@/components/ui/navigation";
import { acma } from "@/lib/fonts";
import { useScroll, useTransform, motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

const Contact = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const { scrollYProgress: scrollYProgressFooter } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const footerY = useTransform(scrollYProgressFooter, [0, 1], [-500, 0]);
  const footerTextXLeft = useTransform(scrollYProgressFooter, [0, 1], [50, 0]);
  const footerTextXRight = useTransform(
    scrollYProgressFooter,
    [0, 1],
    [-50, 0]
  );
  const footerTextDesc = useTransform(scrollYProgressFooter, [0, 1], [50, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Sending your message...",
    });

    try {
      const result = await sendEmail({ email, message });

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message,
        });
        // Clear form on success
        setEmail("");
        setMessage("");
      } else {
        setStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <main className="relative">
      <Navigation />
      <section className="min-h-screen py-[35vh] relative z-30 bg-background flex flex-col gap-24">
        <div className="w-full mx-auto max-w-5xl mb-4 flex justify-between items-center">
          <h1 className={`${acma.className} text-[12vh] leading-none`}>
            Drop a line
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl w-full mx-auto flex gap-32"
        >
          <div className="text-2xl flex-1">
            <div className="py-12 px-8 border-t border-neutral-800 flex flex-col gap-4 active:ring-0 hover:bg-neutral-900/10 transition-colors duration-300">
              <label htmlFor="email" className="text-2xl">
                What's your email?
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work@johndoe.com"
                className="bg-transparent outline-none text-xl"
                required
              />
            </div>
            <div className="py-12 px-8 border-t border-neutral-800 flex flex-col gap-4 active:ring-0 max-w-5xl w-full mx-auto hover:bg-neutral-900/10 transition-colors duration-300">
              <label htmlFor="message" className="text-2xl">
                Your message?
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Dhirly, we.."
                className="bg-transparent outline-none text-xl min-h-32 resize-y"
                required
              />
            </div>
            <div className="w-full flex justify-between items-center mt-4">
              {status.type && (
                <div
                  className={`flex items-center gap-2 text-base ${
                    status.type === "success"
                      ? "text-green-500"
                      : status.type === "error"
                        ? "text-red-500"
                        : "text-neutral-400"
                  }`}
                >
                  {status.type === "success" && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {status.type === "error" && <XCircle className="w-5 h-5" />}
                  {status.type === "loading" && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="rounded-full cursor-pointer border px-6 border-green-500/50 bg-green-500/50 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-200 py-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.type === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="min-w-40 flex flex-col gap-4">
            <p className="text-[#b5b5b5] text-sm">CONTACT DETAILS</p>
            <ul className="flex flex-col gap-2 text-lg">
              <li>dhirly.work@gmail.com</li>
              <li>+62 897 9299 519</li>
            </ul>
            <p className="text-[#b5b5b5] text-sm mt-6">LOCATION</p>
            <ul className="flex flex-col gap-2 text-lg">
              <li>West Bandung</li>
              <li>40562</li>
            </ul>
          </div>
        </form>
      </section>
      <Footer ref={footerRef}>
        <>
          <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center pt-8">
            <div className="mb-40 w-full leading-relaxed flex">
              <div className="flex-1" />
              <ul className="grid list-disc gap-x-8 grid-cols-2">
                <li className="hover:underline">
                  <a href="/?loader=axz">Index</a>
                </li>
                <li className="hover:underline">
                  <a href="/case">Work</a>
                </li>
                {/* <li className="hover:underline">
                  <a href="">About</a>
                </li> */}
                <li className="hover:underline">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="flex w-full justify-between">
              <motion.h1
                style={{ x: footerTextXLeft }}
                className={`${acma.className} text-[1300%]`}
              >
                REACH
              </motion.h1>
              <motion.h1
                style={{ x: footerTextXRight }}
                className={`${acma.className} text-[1300%]`}
              >
                OUT
              </motion.h1>
            </div>
            <motion.div
              style={{ y: footerTextDesc }}
              className="mt-12 max-w-96 text-center text-lg"
            >
              <p>Get in touch — we'll get back to you shortly.</p>
            </motion.div>
            <div className="relative mt-4 h-20">
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent to-neutral-600" />
            </div>
          </div>
        </>
      </Footer>
    </main>
  );
};

export default Contact;
