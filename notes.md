# Notes

**Traditional Routing**: Calling the component inside the page.tsx using imports
**Page Routing**: Inside the src there need to be a page directory inside that the about.jsx, signIn.jsx files can be used using Link
**App Routing (Folder based routing)**: Normally, what i use is an About folder inside that page.jsx, layout.jsx etc. for more dynamic approach

**Class Components**: Used before useEffect, useState for state management(this.props) and lifecycle methods(componentDidMount)  
**Functional Components**: Used now, normal state management that i use and side effects, for lifecycle methods using hooks(ES6)

### CSR(Client Side Rendering)
  - Dynamic content handled entirely on the client side
  - For single highly interactive page app where SEO is not a priority
  - CSR is used where getServerSideProps and getStaticProps are NOT used
  - depends entirely on the client device

### SSR(Server SIde Rendering)
  - Where the page content(pre-rendered HTML with data) is generated on the server for each request
  - For pages that require up-to-date data for each request(i.e - news, e-commerce site)
  - SSR is used when we use async function called getServerSideProps
  - Better SEO as the content is already available in the initial HTML
  - Can be a bit slower due to server-side processing on each request

### SSG(Static Site Generation)
  - Where the page content(pre-rendered HTML with or without data) is generated at build time 
  - For pages that are static like blogs, documentation or landing page.
  - SSG is used when async function called getStaticProps is used.
  - Better SEO and performance as the content is generated at build time(directly served to the user).
  - Best performance but the content doesn't change already rendered at the build time

### Dynamic Routing
  - It is used when we don't know segments names ahead of time(We use `[...slugs]` the triple dots are called ellipse)