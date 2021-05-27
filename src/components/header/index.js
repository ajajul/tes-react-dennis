import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { USER_LOGOUT } from '../../variables/actionTypes';

const dispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch({ type: USER_LOGOUT, responseData: {} })
    }
}

const stateToProps = (state) => {
    return {
        token: state.user.token
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: 'auto',
    },
    title: {
        flexGrow: 1,
    },
}));

function Header(props) {
    const history = useHistory();
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    
    const Logout = () => {
        props.logOut();
    }

    React.useEffect(() => {
        if (props.token) {
            setAuth(true);
        } else {
            setAuth(false)
        }
    }, [props.token]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.menuButton}>
                    {!auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => history.push("/login")}
                                color="inherit"
                            >
                                Login
                            </IconButton>
                        </div>
                    )}
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => history.push("/jobs")}
                                color="inherit"
                            >
                                Jobs
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => Logout()}
                                color="inherit"
                            >
                                Logout
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default connect(stateToProps, dispatchToProps)(Header);