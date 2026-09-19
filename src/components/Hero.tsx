import { ChevronDown } from "lucide-react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"

import { Button } from "@/components/ui/button"

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services", hasMenu: true },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact us" },
] as const

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <header className="relative z-20">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-8 py-4 md:px-28"
        >
          <div className="flex items-center gap-12 md:gap-20">
            <a href="#home" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              <span className="text-xl font-bold tracking-tight">Neuralyn</span>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                  {"hasMenu" in link && link.hasMenu ? (
                    <ChevronDown className="size-4" aria-hidden="true" />
                  ) : null}
                </a>
              ))}
            </div>
          </div>

          <Button
            type="button"
            className="h-auto shrink-0 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Sign In
          </Button>
        </nav>
      </header>

      <motion.div
        className="relative z-10 mt-16 flex flex-col items-center px-4 text-center md:mt-20"
        style={
          reduceMotion
            ? undefined
            : { y: textY, opacity: textOpacity }
        }
      >
        <motion.div
          className="liquid-glass mb-6 flex items-center gap-2 rounded-lg px-3 py-2"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <span className="rounded-md bg-foreground px-2 py-0.5 text-sm font-medium text-background">
            New
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Say Hello to Corewave v3.2
          </span>
        </motion.div>

        <motion.h1
          className="mb-3 text-5xl font-medium leading-tight tracking-[-2px] md:text-7xl md:leading-[1.15]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Insights.
          <br />
          One Clear{" "}
          <span className="font-serif font-normal italic">Overview</span>.
        </motion.h1>

        <motion.p
          className="mb-8 text-lg font-normal leading-6 opacity-90"
          style={{ color: "hsl(var(--hero-subtitle))" }}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Neuralyn helps teams track metrics, goals,
          <br />
          and progress with precision.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <Button
            asChild
            className="h-auto rounded-full bg-foreground px-8 py-3.5 text-base font-medium text-background hover:opacity-90"
          >
            <a href="#reviews">Get Started for Free</a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative w-screen"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          aspectRatio: "16 / 9",
        }}
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduceMotion ? undefined : { y: dashboardY }}
        >
          <img
            src="/hero-dashboard.png"
            alt="Neuralyn analytics dashboard showing revenue, users, and goal progress"
            className="w-[90%] max-w-5xl rounded-2xl"
            style={{ mixBlendMode: "luminosity" }}
          />
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-30 h-40 w-full bg-gradient-to-t from-background to-transparent"
      />
    </section>
  )
}
