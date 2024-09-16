import { InfinitySpin } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrap}>
      <InfinitySpin width="300" color="#00f2ff" />
    </div>
  );
};

export default Loader;
