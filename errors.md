Warning: React has detected a change in the order of Hooks called by RecentProductsContainer. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks:

```
export default function RecentProductsContainer() {
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useRecentProducts();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  useEffect(() => {
    if (data) {
      dispatch(setRecentProducts(data));
    }
  }, [data, dispatch]);

  ...
```
