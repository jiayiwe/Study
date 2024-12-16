import Header from "./components/Header";
import Home from "./pages/Home";
import { lazy, Suspense, memo } from "react"
import { Switch, Route } from "react-router-dom"
import Auth from "./auth";
import { connect } from "react-redux"

const Login = lazy(() => import("./pages/Login"))
const Regist = lazy(() => import("./pages/Regist"))

const ArticleNew = lazy(() => import("./pages/ArticleNew"))
const Setting = lazy(() => import("./pages/Setting"))
const Profile = lazy(() => import("./pages/Profile"))
const Article = lazy(() => import("./pages/Article"))
const ArticleEdit = lazy(() => import("./pages/ArticleEdit"))

const App = memo((props) => {
  return (
    <div>
      <Header />

      {/* 主体 */}
      <Suspense fallback={<p>loading....</p>}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />

          <Auth currentUser={props.currentUser}>
            <Switch>
              <Route path="/article/new" component={ArticleNew} exact />
              <Route path="/setting" component={Setting} />
              <Route path="/profile/:username" component={Profile} />

              <Route path="/article/:slug" component={Article} exact />
              <Route path="/article/edit/:slug" component={ArticleEdit} exact />
            </Switch>
          </Auth>
        </Switch>
      </Suspense>
    </div>
  );
})


const mapState = state => ({
  currentUser: state.user.login.currentUser
})


export default connect(mapState, null)(App);
