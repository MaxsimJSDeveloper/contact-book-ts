import css from "./Creators.module.css";

const Creators = () => {
  return (
    <div className={css.creators}>
      <h3 className={css.title}>Creators</h3>
      <p className={css.text}>Developer: Holovko Maksym</p>
      <p className={css.text}>Designer: Pavlova Maria</p>
    </div>
  );
};

export default Creators;
