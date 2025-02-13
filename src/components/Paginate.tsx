import { Link } from "react-router-dom";
interface PaginateProps {
  pages: number;

  keyword?: string;
  isAdmin?: boolean;
}
export default function Paginate({
  pages,

  keyword = "",
  isAdmin = false,
}: PaginateProps) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    pages > 1 && (
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
            }
          ></Link>
        ))}
      </div>
    )
  );
}
