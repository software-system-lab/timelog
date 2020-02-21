import Sidemenu from '../components/sidemenu.vue'
import Board from '../components/Board/index.vue'
import History from '../components/History.vue'
import Team from '../components/Team.vue'
import TeamContent from '../components/Team/team_content.vue'
import CreateTeam from '../components/Team/create.vue'
import JoinTeam from '../components/Team/join.vue'
import TeamList from '../components/Team/team_list.vue'
import Setting from '../components/Setting.vue'
import Publish from '../components/publish/index.vue'

const LoginedRoutes = [
  {
    name: 'Board',
    path: 'board',
    components: {
      header: Sidemenu,
      default: Board
    }
  },
  {
    name: 'History',
    path: 'history',
    components: {
      header: Sidemenu,
      default: History
    }
  },
  {
    name: 'Team - team list',
    path: 'teamlist',
    components: {
      header: Sidemenu,
      default: TeamList
    }
  },
  {
    name: 'Team',
    path: '/team',
    components: {
      header: Sidemenu,
      default: Team
    },
    redirect: {
      name: 'Team - team list'
    },
    children: [
      {
        name: 'Team - content',
        path: 'content/:id',
        component: TeamContent
      },
      {
        name: 'Team - create team',
        path: 'create',
        component: CreateTeam
      },
      {
        name: 'Team - join team',
        path: 'join',
        component: JoinTeam
      }
    ]
  },
  {
    name: 'Setting',
    path: 'setting',
    components: {
      header: Sidemenu,
      default: Setting
    }
  },
  {
    name: 'Publish',
    path: 'publish',
    components: {
      header: Sidemenu,
      default: Publish
    }
  }
]

export default LoginedRoutes
