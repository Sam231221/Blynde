import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import CodeSnippet from "../code-snippet";
export const ShareProduct = ({ id }) => {
  return (
    <div>
      <h2 className="text-xl tracking-wide mb-2">Copy link</h2>
      <CodeSnippet code={`${import.meta.env.VITE_PUBLIC_URL}/product/${id}`} />

      <p className="text-xs mt-2 text-gray-400 mb-2">
        You can share the product with your friends
      </p>
      <div className="flex gap-2">
        <FacebookShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/product/${id}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/product/${id}`}
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>

        <TwitterShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/product/${id}`}
        >
          <XIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/product/${id}`}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};
