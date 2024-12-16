import { Redirect } from "react-router-dom"

const Auth = props => {
    const { currentUser, children } = props

    if (currentUser) {
        return children
    }

    return <Redirect to="/login" />
}

export default Auth