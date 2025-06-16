import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  "/java/",
  "/om/",
  // {
  //   text: "JAVA",
  //   icon: "skill-icons:java-light",
  //   prefix: "/java/",
  //   children: [
  //     {
  //       text: "基础",
  //       icon: "pen-to-square",
  //       prefix: "foundation/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
          
  //       ],
  //     },
  //     {
  //       text: "进阶",
  //       icon: "pen-to-square",
  //       prefix: "advanced/",
  //       children: [
  //         {
  //           text: "香蕉 1",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         {
  //           text: "香蕉 2",
  //           icon: "pen-to-square",
  //           link: "2",
  //         },
         
  //       ],
  //     },

  //   ],
  // },
  {
    text: "数据",
    icon: "skill-icons:mysql-light",
    prefix: "/data/",
    children:[
      {
        text: "MYSQL",
        icon: "skill-icons:mysql-light",
        prefix: "mysql/",
        link: "",
      },{
        text: "REDIS",
        icon: "skill-icons:redis-light",
        prefix: "redis/",
        link: ""
      }
    ]
  }
  // ,{
  //   text: "O&M",
  //   icon: "skill-icons:linux-light",
  //   prefix: "/om/",
  //   children:[
  //     {
  //       text: "LNUX",
  //       icon: "skill-icons:linux-light",
  //       prefix: "linux/",
  //       link: ""
  //     },{
  //       text: "docker",
  //       icon: "skill-icons:docker",
  //       prefix: "docker/",
  //       link: "Docker"
  //     },{
  //       text: "jenkins",
  //       icon: "skill-icons:jenkins-light",
  //       prefix: "jenkins/",
  //       link: ""
  //     },
  //   ]
  // }
  ,
  {
    text: "文档",
    icon: "line-md:document-list-twotone",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
