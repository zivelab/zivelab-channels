const pages = [
  {
    pathname: "/getting-started",
    title: "Getting Started",
    root: true,
    children: [
      {
        pathname: "/getting-started/about",
        title: "About"
      },
      {
        pathname: "/getting-started/utilities",
        title: "Utilities",
        children: [
          {
            pathname: "/getting-started/utilities/linear-regression",
            title: "Linear Regression"
          }
        ]
      }
    ]
  }
];

export default pages;
