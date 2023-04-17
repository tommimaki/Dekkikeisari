import { BsFillArrowUpCircleFill } from 'react-icons/bs';

function ScrollToTopArrow() {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className="fixed bottom-6 right-6 z-10  rounded-full bg-white shadow-md border-2 border-gray-300"
            onClick={handleClick}
        >
            <BsFillArrowUpCircleFill size={30} />
        </button>
    );
}

export default ScrollToTopArrow;
