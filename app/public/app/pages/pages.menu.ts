export const PAGES_MENU = [
    {
      path: 'pages',
      children: [
        {
          path: 'home',
          data: {
            menu: {
              title: '首页',
              icon: 'fa fa-home',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'publish',
          data: {
            menu: {
              title: '发布',
              icon: 'fa fa-edit',
              selected: false,
              expanded: false,
              order: 50,
            }
          }
        }
      ]
    }
  ];
  