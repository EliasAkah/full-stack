import Article from "./Article.jsx";
import Navigation from "./Navigation.jsx";

import { ModifyData } from "../store/Modifiy-Data.jsx";

export default function ProvideContext() {
  return (
    <ModifyData>
      <Navigation />
      <Article />
    </ModifyData>
  );
}
