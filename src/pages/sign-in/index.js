import React from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dispatchToProps = (dispatch) => {
    return {
        userLogin: (data) => dispatch(userLogin(data))
    }
}

const stateToProps = (state) => {
    return {
        token: state.user.token,
        error: state.user.error
    };
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initialForm = {
    email: '',
    password: '',
    error: '',
}

function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();
    const [signinForm, setSigninFormData] = React.useState(initialForm);

    const notify = (text) => toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const submitLogin = (e) => {
        e.preventDefault();
        if (signinForm.email === '') {
            setSigninFormData({ ...signinForm, error: 'Please input your email' });
            notify('Please input your email');
        } else if (signinForm.password === '') {
            setSigninFormData({ ...signinForm, error: 'Please input your password' });
            notify('Please input your password');
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(signinForm.email)) {
            setSigninFormData({ ...signinForm, error: 'Please input valid mail' });
            notify('Please input valid mail');
        } else {
            const data = {
                email: signinForm.email,
                password: signinForm.password
            }
            props.userLogin(data);
        }
    }

    const handleChange = (prop) => (event) => {
        setSigninFormData({ ...signinForm, [prop]: event.target.value });
    };

    React.useEffect(() => {
        if (props.token) {
            history.push("/jobs")
        }
    }, []);

    React.useEffect(() => {
        if (props.error) {
            setSigninFormData({ ...signinForm, error: props.error });
            notify(props.error);
        }
    }, [props.error]);

    React.useEffect(() => {
        if (props.token) {
            history.push("/jobs")
        }
    }, [props.token]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type='email'
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange('email')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange('password')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitLogin}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
}

export default connect(stateToProps, dispatchToProps)(SignIn);
