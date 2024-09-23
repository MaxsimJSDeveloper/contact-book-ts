import css from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={css.box}>
      <svg aria-label="logo">
        <use href="../../img/symbol-defs.svg#icon-logo"></use>
      </svg>
      <p className={css.text}>contact book</p>
    </div>
  );
};

export default Logo;
