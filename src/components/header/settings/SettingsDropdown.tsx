import {
    BookLock,
    BookText,
    CircleChevronDown,
    CircleHelp,
    Lock,
    LogOut,
    Mail,
    Shield,
    User
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"

export const SettingsDropdown = () => {
    const { data } = useSession()
    const { user } = data || {}
    const dict = useTranslations("Header.DropDown")
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className="flex flex-row gap-2 items-center hover:cursor-pointer">
                    <p className="text-xs text-neutral-500">{`@${user?.username}`}</p>
                    <CircleChevronDown size={14} color="#808080" />
                </span>
            </DropdownMenuTrigger>
            {/* ACCOUNT SETTINGS */}
            <DropdownMenuContent className="w-fit bg-opacity-15 bg-white backdrop-blur-xl rounded-xl border-none px-1 text-white">
                <DropdownMenuLabel className="text-xs">{dict("AccountSettings.title")}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <User className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('AccountSettings.EditProfile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <Shield className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('AccountSettings.Security')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                {/* HELP */}
                <DropdownMenuLabel className="text-xs">{dict("Help.title")}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <CircleHelp className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('Help.HelpCenter')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <Mail className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('Help.ContactUs')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                {/* LEGAL */}
                <DropdownMenuLabel className="text-xs">{dict("Legal.title")}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <Lock className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('Legal.PrivacySettings')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <BookLock className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('Legal.PrivacyPolicy')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white">
                        <BookText className="mr-2 h-4 w-4" />
                        <span className="text-xs">{dict('Legal.TermsAndConditions')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2.5 focus:bg-white focus:bg-opacity-20 focus:rounded-lg focus:text-white" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-xs">{dict('Logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
