/* eslint-disable jsx-a11y/alt-text */
import { AnimatePresence, motion } from "framer-motion"
import type { NextPage } from "next"
import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from "react"
import Cards from "../components/cards"
import { CardLogoHash } from "../utils/cardHash"

const variants = {
  mastercard: { backgroundColor: "red" },
  closed: { backgroundColor: "#fff" },
}

const Home: NextPage = () => {
  const [firstNumber, setFirstNumber] = useState("")
  const [secondNumber, setSecondNumber] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [card, setCard] = useState<{ [key: string]: any }>({})
  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)
  const getCard = useCallback(async () => {
    try {
      const res = await fetch(
        `https://lookup.binlist.net/${firstNumber}${secondNumber}`
      )
      setCard({ ...(await res.json()) })
    } catch (e) {
      console.log(e)
      setCard((prev) => ({ ...prev, scheme: "unknown" }))
    }
  }, [firstNumber, secondNumber])
  useEffect(() => {
    if (firstNumber.length >= 4) secondInputRef.current?.focus()
  }, [firstNumber])
  useEffect(() => {
    if (secondNumber.length >= 4)
      if (firstNumber.length < 4) firstInputRef.current?.focus()
      else getCard()
  }, [secondNumber, firstNumber, getCard])
  useEffect(() => {
    console.log(card)
    if (card.scheme) {
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 2000)
    }
  }, [card])

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-screen bg-black bg-${
        isOpen ? card.scheme ?? "white" : "black"
      } text-white duration-500`}
    >
      <div className="hidden bg-mastercard bg-visa bg-discover bg-unknown"></div>
      <Cards cardName={card.scheme ?? "unknown"} isOpen={isOpen} />
      <div className="flex flex-col justify-between max-w-xl max-h-80 w-1/2 h-1/3 p-6 shadow-lg border-[2.21px] border-solid border-gray-600 rounded-lg z-50">
        <div className="flex flex-row items-start justify-between px-0.5">
          <div className="cursor-pointer" onClick={() => getCard()}>
            <Image
              src="/img/cards/card-chip.png"
              alt="Chip"
              width={34 * 2.9}
              height={24 * 2.9}
            />
          </div>
          <div className="cursor-poitner flex flex-col items-center justify-center">
            {card.scheme && CardLogoHash[card.scheme] ? (
              <Image {...CardLogoHash[card.scheme]} />
            ) : (
              <Image
                src="/img/cards/unknown.png"
                alt="Unknown"
                height={80}
                width={80}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2.5">
          <div className="flex flex-row space-x-4 font-[400] text-[2.4rem]">
            <input
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              ref={firstInputRef}
              type="text"
              pattern="\d*"
              maxLength={4}
              className="w-1/6 bg-transparent border-b border-slate-600 placeholder-slate-600 caret-slate-600 focus:outline-none"
              autoComplete="no"
              placeholder="1234"
            />
            <input
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              ref={secondInputRef}
              type="text"
              pattern="\d*"
              maxLength={4}
              className="w-1/6  bg-transparent border-b border-slate-600 placeholder-slate-600 caret-slate-600 focus:outline-none"
              autoComplete="no"
              placeholder="1234"
            />
            <input
              type="text"
              pattern="\d*"
              maxLength={4}
              className="w-1/6  bg-transparent border-b border-slate-600 placeholder-slate-600 caret-slate-600 focus:outline-none"
              autoComplete="no"
              placeholder="1234"
              value={Date.now().toString().substring(1, 5)}
              disabled
            />
            <input
              type="text"
              pattern="\d*"
              maxLength={4}
              className="w-1/6  bg-transparent border-b border-slate-600 placeholder-slate-600 caret-slate-600 focus:outline-none"
              autoComplete="no"
              placeholder="1234"
              value={Math.random().toString().split("0.")[1].substring(1, 5)}
              disabled
            />
          </div>
          <div className="cursor-default flex flex-row pl-0.5">
            <p className="text-2xl font-[700]">
              {card.brand ? card.brand : "Brand"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
