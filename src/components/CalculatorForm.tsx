PS C:\Users\jbailey\yms_combined_calculator> npm run build

> yms_combined_calculator@0.1.0 build
> next build

   ▲ Next.js 15.2.4

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types  ...Failed to compile.

./src/components/CalculatorForm.tsx:56:18
Type error: Element implicitly has an 'any' type because expression of type '"Unit"' can't be used to index type 'ProductData'.
  Property 'Unit' does not exist on type 'ProductData'.

  54 |   const formatLabel = (product: ProductData) => {
  55 |     const size = product["Package Size"].toString().replace(/\.0$/, "");
> 56 |     const unit = product["Unit"].includes("gram") ? "g" : product["Unit"];
     |                  ^
  57 |     return `${product["Product Name"]} – ${size} ${unit} ${product["Package Type"]}`;
  58 |   };
  59 |
Next.js build worker exited with code: 1 and signal: null
PS C:\Users\jbailey\yms_combined_calculator>
PS C:\Users\jbailey\yms_combined_calculator> # 5. Deploy the build output to gh-pages
PS C:\Users\jbailey\yms_combined_calculator> npx gh-pages -d out -b gh-pages -f
Published