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
export const ShareProduct = ({ slug }: { slug: string }) => {
  return (
    <div>
      <h2 className="text-xl tracking-wide mb-2">Copy link</h2>
      <CodeSnippet
        code={`${import.meta.env.VITE_PUBLIC_URL}/products/${slug}`}
      />

      <p className="text-xs mt-2 text-gray-400 mb-2">
        You can share the product with your friends
      </p>
      <div className="flex gap-2">
        <FacebookShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/products/${slug}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/products/${slug}`}
          appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>

        <TwitterShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/products/${slug}`}
        >
          <XIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`${import.meta.env.VITE_PUBLIC_URL}/products/${slug}`}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};
