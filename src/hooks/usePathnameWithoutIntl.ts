import { usePathname } from "next/navigation"

const usePathnameWithoutIntl = () => {
    const path = usePathname().replace(/^\/(en|es)/, '')
    if (path === '') {
        return '/'
    } else {
        return path
    }
}

export default usePathnameWithoutIntl