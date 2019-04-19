const pages = [
  {
    pathname: "/getting-started",
    children: [
      {
        pathname: "/getting-started/about"
      },
      {
        pathname: "/getting-started/utilities",
        children: [
          {
            pathname: "/getting-started/utilities/linear-regression"
          }
        ]
      }
    ]
  },
  {
    pathname: "/my-devices",
    children: []
  },
  {
    pathname: "/remote-devices",
    children: []
  }
];

export default pages;
