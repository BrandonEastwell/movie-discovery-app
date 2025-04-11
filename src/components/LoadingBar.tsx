"use client"
import {usePathname, useSearchParams} from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {useEffect} from 'react';

NProgress.configure({ showSpinner: false, trickleSpeed: 100, speed: 500, easing: 'ease' })

export default function LoadingBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Start progress bar
        NProgress.start()

        // Complete the progress bar
        const timer = setTimeout(() => {
            NProgress.done()
        }, 300)

        return () => {
            clearTimeout(timer)
            NProgress.remove()
        }
    }, [pathname, searchParams])

    return null
}
