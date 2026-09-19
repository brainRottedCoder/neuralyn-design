import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useRef } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const QUOTE =
  "Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined! Neuralyn revolutionized how we handle financial insights using smart analytics."

const WORDS = QUOTE.split(" ")

function RevealWord({
  word,
  index,
  total,
  progress,
  reduceMotion,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
  reduceMotion: boolean | null
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.2, 1],
  )
  const color = useTransform(
    progress,
    [index / total, (index + 1) / total],
    ["hsl(0 0% 35%)", "hsl(0 0% 100%)"],
  )

  return (
    <motion.span
      className="mr-[0.3em]"
      style={
        reduceMotion
          ? { opacity: 1, color: "hsl(0 0% 100%)" }
          : { opacity, color }
      }
    >
      {word}
    </motion.span>
  )
}

export function Testimonial() {
  const containerRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  })

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="flex min-h-screen items-center px-8 py-24 md:px-28 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-10">
        <img
          src="/quote-symbol.png"
          alt=""
          width={56}
          height={40}
          className="h-10 w-14 object-contain"
        />

        <p className="flex flex-wrap text-4xl font-medium leading-[1.2] md:text-5xl">
          {WORDS.map((word, index) => (
            <RevealWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              total={WORDS.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
          <span className="ml-2 text-muted-foreground" aria-hidden="true">
            ”
          </span>
        </p>

        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-[3px] border-foreground">
            <AvatarImage
              src="/testimonial-avatar.png"
              alt="Brooklyn Simmons"
              className="object-cover"
            />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold leading-7 text-foreground">
              Brooklyn Simmons
            </p>
            <p className="text-sm font-normal leading-5 text-muted-foreground">
              Product Manager
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
