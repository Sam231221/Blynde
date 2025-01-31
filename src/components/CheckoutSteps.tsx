import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
      <div>
        {step1 ? (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-sky-400 uppercase tracking-wider"
              to="/login"
            >
              Login
            </Link>
            <FaLongArrowAltRight className="text-sky-400 " size={20} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-zinc-800 uppercase tracking-wider"
              disabled
            >
              Login
            </Link>
            <FaLongArrowAltRight className="text-zinc-800 " size={20} />
          </div>
        )}
      </div>

      <div>
        {step2 ? (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-sky-400 uppercase tracking-wider"
              to="/shipping"
            >
              Shipping
            </Link>
            <FaLongArrowAltRight className="text-sky-400 " size={20} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-zinc-800 uppercase tracking-wider"
              disabled
            >
              Shipping
            </Link>
            <FaLongArrowAltRight className="text-zinc-800 " size={20} />
          </div>
        )}
      </div>

      <div>
        {step3 ? (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-sky-400 uppercase tracking-wider"
              to="/payment"
            >
              Payment
            </Link>
            <FaLongArrowAltRight className="text-sky-400 " size={20} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-zinc-800 uppercase tracking-wider"
              disabled
            >
              Payment
            </Link>
            <FaLongArrowAltRight className="text-zinc-800 " size={20} />
          </div>
        )}
      </div>

      <div>
        {step4 ? (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-sky-400 uppercase tracking-wider"
              to="/placeorder"
            >
              Place Order
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className="font-medium text-zinc-800 uppercase tracking-wider"
              disabled
            >
              Place Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutSteps;
