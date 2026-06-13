# Min Swe Thein Portfolio

A local, GitHub Pages-ready portfolio website built with plain HTML, Tailwind CSS via CDN, and vanilla JavaScript.

## Structure

- `index.html` contains the page sections and empty render targets.
- `js/data.js` contains the profile, project, credential, tech stack, and blog data.
- `js/app.js` dynamically renders the project cards, filters, credentials, blog items, and links.
- `assets/styles.css` contains small custom styles that complement Tailwind.

## Update Projects

Edit the `projects` array inside `js/data.js`.

```js
{
  title: "New Project",
  tag: "Machine Learning",
  description: "Short project summary.",
  tech: ["Python", "Pandas"],
  liveDemo: "https://example.com",
  sourceCode: "https://github.com/username/repo"
}
```

The accepted filter categories are currently:

- `Machine Learning`
- `Data Visualization`
- `IoT & Hardware`

Add a new category to the `filters` array in `js/data.js` if needed.

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages

Push this folder to a GitHub repository and enable GitHub Pages from the repository settings. Use the root folder if this site is the whole repository.
