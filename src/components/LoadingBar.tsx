"use client"
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {useEffect} from 'react';

NProgress.configure({ showSpinner: false, trickleSpeed: 100, speed: 500, easing: 'ease' })

export default function LoadingBar() {

    useEffect(() => {
        // Start progress bar
        NProgress.start()

        // Complete the progress bar
        setTimeout(() => {
            NProgress.done()
        }, 300)
    }, [])

    return null
}
