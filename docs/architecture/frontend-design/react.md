The frontend of this project is built with React, utilizing a component-based architecture for modularity and reusability. The main entry point is App.tsx, which serves as the root component and orchestrates the rendering of child components such as Header, Card, and others.

Routing is managed with React Router, allowing for seamless navigation between different simulation pages and views. Each route corresponds to a specific simulation or feature, and components are rendered dynamically based on the current URL. This structure enables a scalable and maintainable codebase, where new simulations or features can be added as separate components and routes.

Assets such as images are managed either through imports in the src directory or by referencing static files in the public folder. Styles are organized using CSS Modules for component-level encapsulation.

Overall, the project structure promotes clarity, scalability, and ease of navigation for both users and developers.