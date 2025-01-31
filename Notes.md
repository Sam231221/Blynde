### 1. React.lazy() needs default export to get work

### 2. Login Shipping Payment Placeholder Workfolow

ShippingScreen has only login and shipping link(only step 1 and step2) enabled
Similarly, PaymentScreen has Login, Shipping and Payment Link Enabled.
Action is an object that has 2 atttributes 'type' and 'payload'.

    FOR CHECKOUT USER MUST BE LOGGED IN.
    -----------------------------
    First we check if user is logged in
    if yes then redirect to /shipping directly.
    if no , first redirect to /login page

### 3. Effect of container mx-auto

```
<PageContainer>
  <div className="mt-14 container mx-auto flex flex-col md:flex-row ">
    <ProductSidebar
      handleCategoriesChange={handleCategoriesChange}
      handlePriceChange={handlePriceChange}
      handleSizeChange={handleSizeChange}
      handleColorChange={handleColorChange}
    />
    <ProductRightbar
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  </div>
</PageContainer>
```

In above try removing container mx-auto and adding it again. ull see huge difference
It seems container mx-auto fits it inner content and make it responsive against different medias

### 4. Python Django Dump Commands

```
python -Xutf8 manage.py dumpdata auth --format json --indent 4 --exclude admin.LogEntry --exclude sessions --exclude auth.permission --exclude contenttypes > auth.json
```

```
python -Xutf8 manage.py dumpdata MCourse --format json --indent 4 --exclude admin.LogEntry --exclude sessions --exclude auth.permission --exclude contenttypes > course.json
```

      if (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error fetching data";
        dispatch(setError(errorMessage)); // Update Redux state on error
      }
