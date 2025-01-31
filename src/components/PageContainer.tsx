import Footer from "./Footer";
import Header from "./Header";

function PageContainer({ children }) {
  return (
    <div className="relative ">
      <Header />
      {children}

      <Footer />
    </div>
  );
}

export default PageContainer;
