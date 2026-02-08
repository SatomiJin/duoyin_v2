import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
}

const useIntersectionObserver = (options?: UseIntersectionObserverOptions) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const { triggerOnce = true, ...observerOptions } = options || {};

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;

            // Chỉ update khi thực sự cần thiết để tránh re-render không cần thiết
            if (entry.isIntersecting) {
                // Nếu chưa trigger hoặc triggerOnce = false
                if (!hasTriggeredRef.current || !triggerOnce) {
                    setIsVisible(true);
                    hasTriggeredRef.current = true;

                    // Nếu triggerOnce = true, disconnect observer sau khi trigger
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                }
            } else if (!triggerOnce && isVisible) {
                // Chỉ set false khi triggerOnce = false
                setIsVisible(false);
            }
        }, {
            threshold: 0.2, // Giảm từ 0.5 xuống 0.2 để trigger sớm hơn
            rootMargin: '0px 0px -50px 0px', // Tránh vùng trùng lấn ở bottom
            ...observerOptions
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [options?.triggerOnce, isVisible]);

    return { containerRef, isVisible };
};

export default useIntersectionObserver;
