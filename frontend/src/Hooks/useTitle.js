import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - BookStore`
    }, [title])
}

export default useTitle;