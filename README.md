## Getting Started

Install modules:

```
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

----


4. Server-side rendering allows search engine crawlers to easily navigate and extract information from the website as the HTML is already generated on the server-side, resulting in improved visibility and search engine rankings.
The HTML generated on the server-side, can be sent to the client immediately, resulting in a faster initial loading time as there is no need to wait for JavaScript to execute and generate the HTML document on the client-side.

6. Client-side rendering on a search input allows for instant feedback and real-time search suggestions, leading to faster and more efficient searches. It also reduces server load and allows for more advanced search features like autocomplete and instant search results. This type of rendering enhances the overall user experience by making the search process more interactive and responsive, resulting in a smoother and more enjoyable search experience.

7. For the state, I decided to go for the Context API since there is very little data to handle globaly. On a larger application with more data I would probably chose Redux.