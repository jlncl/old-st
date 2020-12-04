import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    span: {
      animation: '$loading 1s infinite ease-in',
    },
    '@keyframes loading': {
      '0%': {},
      '100%': {
        color: 'white',
        transform: `translateY(0)`,
      },
      '50%': {
        color: '#c3989e',
        transform: `translateY(20%)`,
      }
    },
  }),
);

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.span} style={{animationDelay: '0.1s'}}>L</span>
      <span className={classes.span} style={{animationDelay: '0.2s'}}>O</span>
      <span className={classes.span} style={{animationDelay: '0.3s'}}>A</span>
      <span className={classes.span} style={{animationDelay: '0.4s'}}>D</span>
      <span className={classes.span} style={{animationDelay: '0.5s'}}>I</span>
      <span className={classes.span} style={{animationDelay: '0.6s'}}>N</span>
      <span className={classes.span} style={{animationDelay: '0.7s'}}>G</span>
      <span className={classes.span} style={{animationDelay: '0.8s'}}>.</span>
      <span className={classes.span} style={{animationDelay: '0.9s'}}>.</span>
      <span className={classes.span} style={{animationDelay: '1.0s'}}>.</span>
    </div>
  );
};

export default Loader;