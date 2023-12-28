import { CircularProgress } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import { Layout } from "./components/feature/Layout";

function App() {
  return (
    <Suspense fallback={<CircularProgress isIndeterminate />}>
      <Routes>
        <Route path="/" element={<Layout/>}>
        {/* Home ROUTE */}
        <Route path={ROUTES.HOME} element={<HomeLazy/>}/>
        {/* LOGIN ROUTE */}
        <Route path={ROUTES.LOGIN} />
        {/* REGISTER ROUTE */}
        <Route path={ROUTES.REGISTER} />
        {/* CLIENT ROUTE */}
        <Route path={ROUTES.CLAIM_FORM} element={<ClaimFormLazy/>}/>
        {/* CLAIM LIST ROUTE */}
        <Route path={ROUTES.CLAIM_LIST} element={<HomeLazy />} />
        {/* CLAIM DETAIL ROUTE */}
        <Route path={ROUTES.CLAIM_DETAIL} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

const HomeLazy = lazy(() =>
  import("./pages/home").then((el) => ({ default: el.Home }))
);
const ClaimFormLazy = lazy(() =>
  import("./pages/claim-form").then((el) => ({ default: el.ClaimForm }))
);

