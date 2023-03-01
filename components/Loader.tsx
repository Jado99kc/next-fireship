import { NextPage } from "next";
interface LoaderProps {
  show: boolean;
}
const Loader: NextPage<LoaderProps> = ({ show }) => {
  return show ? <div className="loader"></div> : null;
};
export default Loader;
