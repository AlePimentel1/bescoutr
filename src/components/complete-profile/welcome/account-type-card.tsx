import { Check, Hand } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    accountType: 'fan' | 'scout';
    selected: boolean;
    onClick: () => void;
}

const AccountTypeCard = ({ accountType, selected, onClick }: Props) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            <div className={`relative flex flex-col items-center justify-center w-[280px] h-auto md:w-[350px] md:h-[350px] p-4 bg-white/5 rounded-2xl cursor-pointer gap-4 ${selected ? 'outline outline-primary bg-primary/10' : ''}`} onClick={onClick}>
                <span className="flex flex-col items-center justify-center">
                    <span className={`absolute top-2 right-2 h-6 w-6 flex justify-center items-center bg-white/5 rounded-full ${selected ? 'border-primary border' : undefined}`}>
                        {selected && <Check className="text-primary" size={15} strokeWidth={3} />}
                    </span>
                    <span className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full ${accountType == 'fan' ? 'bg-blue-500' : 'bg-red-500'}`}>
                        {accountType === 'fan' ? (
                            <Hand className="text-white h-[20px] w-[20px] md:h-[32px] md:w-[32px]" />
                        ) : (
                            <Hand className="text-white h-[20px] w-[20px] md:h-[32px] md:w-[32px]" />
                        )}
                    </span>
                    <p className="text-white mt-2 font-semibold tracking-wide text-sm md:text-lg">{accountType === 'fan' ? 'Fan' : 'Scout'}</p>
                </span>
                <p className="text-gray-400 text-center text-xs break-words">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </motion.div>
    );
}

export default AccountTypeCard;
