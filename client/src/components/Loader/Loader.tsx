import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.panLoader}>
      <div className={classes.loader}></div>
      <div className={classes.panContainer}>
        <div className={classes.pan}></div>
        <div className={classes.handle}></div>
      </div>
      <div className={classes.shadow}></div>
    </div>
  );
};

export default Loader;
