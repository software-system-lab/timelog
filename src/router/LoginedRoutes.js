import Header from '../components/_Header.vue'
import Board from '../components/Board.vue'
import History from '../components/History.vue'
import Team from '../components/Team.vue'
import TeamContent from '../components/Team/team_content.vue'
import CreateTeam from '../components/Team/create.vue'
import JoinTeam from '../components/Team/join.vue'
import TeamList from '../components/Team/team_list.vue'
import Setting from '../components/Setting.vue'
import HelloWorld from '../components/HelloWorld'

const LoginedRoutes = [{
    name: 'Board',
    path: "Board",
    components: {
      header: Header,
      default: Board
    }
  },
  {
    name: 'History',
    path: "History",
    components: {
      header: Header,
      default: History
    }
  },
  {
    name: "Team - team list",
    path: "teamlist",
    components: {
      header: Header,
      default: TeamList
    }
  },
  {
    name: 'Team',
    path: "/team",
    components: {
      header: Header,
      default: Team
    },
    redirect: {
      name: "Team - team list"
    },
    children: [{
        name: "Team - content",
        path: "content/:id",
        component: TeamContent
      },
      {
        name: "Team - create team",
        path: "create",
        component: CreateTeam
      },
      {
        name: "Team - join team",
        path: "join",
        component: JoinTeam
      }
    ]
  },
  {
    name: 'Setting',
    path: "Setting",
    components: {
      header: Header,
      default: Setting
    }
  },
];

export default LoginedRoutes;