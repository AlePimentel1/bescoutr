import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
const EmptyList = () => {
    const dict = useTranslations("Chat.ChatList")
    return (
        <motion.div
            initial={{ y: "30px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 0.4, delay: 0.15 }}
            className="text-center text-gray-700 text-[15px] flex flex-col items-center gap-2"
        >
            <p>{dict("noChats")}</p>
        </motion.div>
    )
}

export default EmptyList