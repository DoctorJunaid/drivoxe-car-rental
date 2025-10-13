import { ShoppingCart } from 'lucide-react';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const ShoppingCartButton = ({  onClick }) => {
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate("/cart")
    }
    const {cart} = useSelector((state)=> state.cart)
    const itemCount = cart?.length || 0;

    return (


        <button  style={{ animation: 'pulse-dramatic 3s infinite' }}
            type="button"
            onClick={onClickHandler}
            aria-label={`Shopping cart with ${itemCount} items`}

            className="fixed bottom-2 right-3 md:bottom-10 md:right-20 z-50 flex h-16 w-16 animate-pulse-dramatic cursor-pointer items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-400 transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-red-600 hover:shadow-red-500"
        >
            <ShoppingCart strokeWidth={2.5} color={"white"} size={30} />

            {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black border-2  shadow-xl shadow-black">
                    {itemCount}
                </span>
            )}
        </button>
    );
};

export default ShoppingCartButton;