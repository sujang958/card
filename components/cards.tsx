/* eslint-disable jsx-a11y/alt-text */
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { FC } from "react"
import { CardMainHash } from "../utils/cardHash"

const Cards: FC<{ cardName: string; isOpen: boolean }> = ({
  cardName,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="Card-Main"
          initial={{ opacity: 0, x: 1000, y: 500 }}
          animate={{ opacity: 0.95, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -1000, y: -500 }}
          // initial={{ opacity: 0, scale: 0.1 }}
          // animate={{ opacity: 0.9, scale: 0.7 }}
          // exit={{ opacity: 0, scale: 0.1, }}
          transition={{
            type: "spring",
            delay: 0,
            stiffness: 433,
            damping: 40,
            mass: 3.8,
          }}
          className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center z-0 master-gradient"
        >
          {CardMainHash[cardName] ? (
            <Image {...CardMainHash[cardName]} />
          ) : (
            <Image {...CardMainHash.discover} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cards
